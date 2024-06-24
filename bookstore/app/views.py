import json
from django.shortcuts import render, redirect
from django.http import response, HttpResponse, JsonResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
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
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token


class UserRegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data["username"])
            user.set_password(request.data["password"])
            user.save()
            token = Token.objects.create(user=user)
            return Response({"token": token.key, "user": serializer.data})
        return Response(serializer.errors, status=status.HTTP_200_OK)


class UserLoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        user = get_object_or_404(User, username=request.data["username"])
        if not user.check_password(request.data["password"]):
            return Response("missing user", status=status.HTTP_404_NOT_FOUND)
        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(user)
        return Response({"token": token.key, "user": serializer.data})


class UserView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    queryset = models.User.objects.all()
    serializer_class = UserSerializer


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def test_token(self):
    return Response({"passed!!"})


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()


class BookView(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
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
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    queryset = models.Rating.objects.all()
    serializer_class = RatingSerializer


class ShippininformationView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    queryset = models.Shippininformation.objects.all()
    serializer_class = ShippininformationSerializer


class OrderView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
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
    authentication_classes = (TokenAuthentication,)
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
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    queryset = models.UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            user = models.User.objects.get(id=pk)
            if user:
                profile = models.UserProfile.objects.get(user=user)
                if profile:
                    serializer = UserProfileSerializer(profile)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(
                        {"message": "there is no profile for this user"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
        except User.DoesNotExist:
            return Response(
                {"message": "user NOT found"},
                status=status.HTTP_404_NOT_FOUND,
            )
