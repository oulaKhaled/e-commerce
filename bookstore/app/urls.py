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
)

router = routers.DefaultRouter()
router.register(r"users", UserView)
router.register(r"userProfile", UserProfileView)
router.register(r"book", BookView)
router.register(r"orderBook", OrderBookView)
router.register(r"orders", OrderView)
router.register(r"rating", RatingView)
router.register(r"shippinginformation", ShippininformationView)


urlpatterns = [
    path("", include(router.urls)),
]
