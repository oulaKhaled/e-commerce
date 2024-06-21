import json
from django.shortcuts import render, redirect
from django.http import response, HttpResponse, JsonResponse
from django.contrib.auth.forms import UserCreationForm

from django.contrib.auth import login, authenticate, logout
from . import models
from rest_framework import viewsets
from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    OrderBookSerializer,
    OrderSerializer,
    BookSerializer,
    RatingSerializer,
    ShippininformationSerializer,
    UserRegisterSerializer,
    UserLoginSerializer,
)
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import get_token
from rest_framework.decorators import action
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication


class UserRegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, requset):
        serializer = UserRegisterSerializer(data=requset.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(serializer.validated_data)
            if user:
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


def validate_username(data):
    username = data["username"].strip()
    if not username:
        raise ValidationError("choose another username")
    return True


def validate_password(data):
    password = data["password"].strip()
    if not password:
        raise ValidationError("a password is needed")
    return True


def csrf_token(request):
    token = get_token(request)
    return JsonResponse({"csrftoken": token})


class UserLoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        assert validate_username(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    # authentication_classes = (SessionAuthentication,)

    def get(self, requset):
        serializer = UserSerializer(requset.user)
        print("request.user", requset.user)
        return Response({"user": serializer.data}, status=status.HTTP_202_ACCEPTED)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            logout(request)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class BookView(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)

    # authentication_classes = (SessionAuthentication,)

    queryset = models.Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=True, methods=["POST"])
    def rate_book(self, request, pk=None):
        if "stars" in request.data:
            book = models.Book.objects.get(id=pk)
            stars = request.data["stars"]
            user = request.user  # token is connected to this user
            print("user", request.user.id)
            user = models.User.objects.get(id=user.id)
            print("User:  ", user)
            try:
                rating = models.Rating.objects.get(user=user, book=book.id)
                rating.stars = stars
                rating.save()
                serializer = RatingSerializer(rating, many=False)
                response = {"massege": "Rating updated", "result": serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                rating = models.Rating.objects.create(user=user, book=book, stars=stars)
                serializer = RatingSerializer(rating, many=False)
                response = {"massege": "Rating created", "result": serializer.data}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {"massege": "you need to provide stars"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class RatingView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    queryset = models.Rating.objects.all()
    serializer_class = RatingSerializer


class ShippininformationView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    queryset = models.Shippininformation.objects.all()
    serializer_class = ShippininformationSerializer


class OrderView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    queryset = models.Order.objects.all()
    serializer_class = OrderSerializer

    def list(self, request, *args, **kwargs):
        data = request.user.id
        user = models.User.objects.get(id=data)
        try:
            order = models.Order.objects.get(user=user, complete=False)
            print("list method 333 : order", order)

            if order:
                serializer = OrderSerializer(order)
                print("list method 333 : serializer Order ", serializer.data)

                ordered_book = models.OrderBook.objects.filter(order=order)
                try:
                    if ordered_book:
                        orderedBook_serilizer = OrderBookSerializer(
                            ordered_book, many=True
                        )
                        return Response(
                            [serializer.data, orderedBook_serilizer.data],
                            status=status.HTTP_200_OK,
                        )
                except models.OrderBook.DoesNotExist:
                    return Response(
                        {"message": "There is no Ordered Book Found t o this Order"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
                return Response(serializer.data, status=status.HTTP_200_OK)
        except models.Order.DoesNotExist:
            return Response({"order not found"}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request, *args, **kwargs):
        data = self.request.user.id
        try:
            user = models.User.objects.get(id=data)
            print("we got the user :", user)
            try:
                order = models.Order.objects.get(user=user, complete=False)
                print("we got the order :", order)
                if order:
                    return Response(
                        {"message": "There is already uncompleted Order for this user"},
                        status=status.HTTP_405_METHOD_NOT_ALLOWED,
                    )
            except models.Order.DoesNotExist:
                print("there is no order")
                new_order = models.Order.objects.create(user=user, complete=False)
                serializer = OrderSerializer(new_order)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except models.User.DoesNotExist:
            return Response(
                {"message": "There is no User "}, status=status.HTTP_404_NOT_FOUND
            )


class OrderBookView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    queryset = models.OrderBook.objects.all()
    serializer_class = OrderBookSerializer

    def create(self, request, *args, **kwargs):
        order = request.data["order"]
        mybook = request.data["book"]
        Book = models.Book.objects.get(id=mybook)
        if Book:
            try:
                getBook = models.OrderBook.objects.get(book=Book, order=order)
                getBook.quantity += 1
                getBook.save()
                return Response(
                    {"message": "just increase quantity"}, status=status.HTTP_200_OK
                )
            except models.OrderBook.DoesNotExist:
                print("new Order Book is created ")
                return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        book = self.get_object()
        if book.quantity > 1:
            book.quantity -= 1
            book.save()
            return Response(
                {"message": "just decrease quantity"}, status=status.HTTP_200_OK
            )
        else:
            return super().destroy(self, request, *args, **kwargs)


class UserProfileView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    queryset = models.UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    # customize get Method
    @action(methods=["GET"], detail=False)
    def get_user_profile(self, request):
        user = models.User.objects.get(id=request.user.id)
        profile = models.UserProfile.objects.get(user=user)
        if profile:
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "there is no profile for this user "},
                status=status.HTTP_404_NOT_FOUND,
            )
