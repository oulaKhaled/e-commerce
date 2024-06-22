from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from django.contrib.auth import get_user_model, authenticate
from .models import Book, UserProfile, Order, OrderBook, Shippininformation, Rating
from django.core.exceptions import ValidationError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user_obj = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        user_obj.username = validated_data["username"]

        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.Serializer):
    def check_user(self, clean_data):
        user = authenticate(
            username=clean_data["username"], password=clean_data["password"]
        )
        if not user:
            raise ValidationError("user not found")
        return user


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = [
            "id",
            "content",
            "title",
            "author",
            "price",
            "quantity",
            "image",
            "category",
            "no_of_ratings",
            "avg_rating",
        ]


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            "id",
            "user",
            "username",
            "email",
            "Address",
        ]


class ShippininformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shippininformation
        fields = "__all__"


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ["user", "book", "stars"]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id",
            "user",
            "order_date",
            "complete",
            "get_cart_total",
            "get_cart_items",
        ]


class OrderBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderBook
        fields = [
            "id",
            "book",
            "quantity",
            "order",
            "get_total",
            "get_title",
            "added_date",
            "get_image",
        ]
