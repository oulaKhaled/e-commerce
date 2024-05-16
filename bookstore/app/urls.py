from . import views
from django.urls import re_path, path, include

urlpatterns = [
    path("", views.store, name="store"),
    path("auth/", views.loginUser, name="login"),
    path("register/", views.registerUser, name="register"),
    path("logout/", views.logoutUser, name="logout"),
    path("checkout/", views.checkout, name="checkout"),
    path("cart/", views.cart, name="cart"),
    path("book/", views.BookView, name="book"),
]
