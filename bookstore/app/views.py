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
)


class UserView(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = UserSerializer


class BookView(viewsets.ModelViewSet):
    queryset = models.Book.objects.all()
    serializer_class = BookSerializer


class RatingView(viewsets.ModelViewSet):
    queryset = models.Rating.objects.all()
    serializer_class = RatingSerializer


class ShippininformationView(viewsets.ModelViewSet):
    queryset = models.Shippininformation.objects.all()
    serializer_class = ShippininformationSerializer


class OrderView(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class = OrderSerializer


class OrderBookView(viewsets.ModelViewSet):
    queryset = models.OrderBook.objects.all()
    serializer_class = OrderBookSerializer


class UserProfileView(viewsets.ModelViewSet):
    queryset = models.UserProfile.objects.all()
    serializer_class = UserProfileSerializer
