import json
from django.shortcuts import render, redirect
from django.http import response, HttpResponse, JsonResponse
from django.contrib.auth.forms import UserCreationForm
from . import forms
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
    authentication_classes = (SessionAuthentication,)

    def get(self, requset):
        serializer = UserSerializer(requset.user)
        return Response({"user": serializer.data}, status=status.HTTP_202_ACCEPTED)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class BookView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    queryset = models.Book.objects.all()
    serializer_class = BookSerializer


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

    @action(methods=["GET"], detail=False)
    def order_by_user(self, request):
        user = models.User.objects.get(id=request.user.id)
        order = models.Order.objects.get(user=user)
        if order.complete == False:
            order_serializer = OrderSerializer(order)
            order_book = models.OrderBook.objects.filter(order=order)
            # print("order_serializer : ", order_serializer.data)
            print("order_book : ", order_book)
            if order_book:
                serializer = OrderBookSerializer(order_book, many=True)
                return Response(
                    [serializer.data, order_serializer.data], status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"message": "no Ordered Books yet"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            return Response(
                {"message": "no Orders yet"}, status=status.HTTP_404_NOT_FOUND
            )


class OrderBookView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    queryset = models.OrderBook.objects.all()
    serializer_class = OrderBookSerializer


class UserProfileView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    queryset = models.UserProfile.objects.all()
    serializer_class = UserProfileSerializer
