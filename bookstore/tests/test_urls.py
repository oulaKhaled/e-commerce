from django import urls
from django.contrib.auth import get_user_model
import pytest
from app.views import (
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
from app.models import User
from django.urls import reverse, resolve
from rest_framework import status


@pytest.mark.parametrize(
    "url_name, view_class",
    [
        ("users", UserView),
        ("register", UserRegisterView),
        ("login", UserLoginView),
        ("logout", UserLogout),
    ],
)
def test_non_router_urls(url_name, view_class):
    url = reverse(url_name)
    assert resolve(url).func.view_class == view_class


@pytest.mark.parametrize(
    "prefix, view_class",
    [
        ("userProfile", UserProfileView),
        ("book", BookView),
        ("orderBook", OrderBookView),
        ("orders", OrderView),
        ("rating", RatingView),
        ("shippinginformation", ShippininformationView),
    ],
)
def test_router_urls(prefix, view_class):
    list_url = reverse(f"{prefix}-list")
    detail_url = reverse(f"{prefix}-detail", kwargs={"pk": 1})

    assert resolve(list_url).func.cls == view_class
    assert resolve(detail_url).func.cls == view_class
