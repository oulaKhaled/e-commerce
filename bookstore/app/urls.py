from . import views
from django.urls import re_path, path, include

urlpatterns = [
    path("", views.store, name="store"),
    path("auth/", views.loginUser, name="login"),
    path("register/", views.registerUser, name="register"),
    path("logout/", views.logoutUser, name="logout"),
]
