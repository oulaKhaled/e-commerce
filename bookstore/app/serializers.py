from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

from .models import Book, UserProfile, Order, OrderBook, Shippininformation, Rating


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class ShippininformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shippininformation
        fields = "__all__"


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class OrderBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderBook
        fields = "__all__"
