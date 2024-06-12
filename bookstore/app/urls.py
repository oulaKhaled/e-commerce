from . import views
from django.urls import re_path, path, include
from rest_framework import routers
from .views import (
    UserView,
    UserProfileView,
    BookView,
    OrderBookView,
    OrderView,
    RatingView,
    ShippininformationView,
    UserRegisterView,
    UserLoginView,
    UserLogout,
)
from bookstore import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r"userProfile", UserProfileView, basename="userProfile")
router.register(r"book", BookView, basename="book")
router.register(r"orderBook", OrderBookView, basename="orderBook")
router.register(r"orders", OrderView, basename="orders")
router.register(r"rating", RatingView, basename="rating")
router.register(
    r"shippinginformation", ShippininformationView, basename="shippinginformation"
)

urlpatterns = [
    path("", include(router.urls)),
    path("users/", UserView.as_view(), name="users"),
    path("register/", UserRegisterView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", UserLogout.as_view(), name="logout"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
