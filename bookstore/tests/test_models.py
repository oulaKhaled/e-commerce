import pytest
from django.db.models import Avg
from app.models import Book, Rating, User, Order, OrderBook
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse, resolve
from test_views import (
    create_test_book,
    create_test_user,
    user_data,
    user_data_register,
    order_book_data,
)


@pytest.mark.django_db
def test_no_of_ratings(create_test_book, create_test_user):

    # Initially, there should be no ratings
    assert create_test_book.no_of_ratings() == 0
    user1 = User.objects.create(username="testuser1", password="testpassword1")
    user2 = User.objects.create(username="testuser2", password="testpassword2")

    # Add some ratings
    Rating.objects.create(user=user1, book=create_test_book, stars=5)
    Rating.objects.create(user=user2, book=create_test_book, stars=3)

    # Now there should be 2 ratings
    assert create_test_book.no_of_ratings() == 2


@pytest.mark.django_db
def test_avg_rating(create_test_book):

    user1 = User.objects.create(username="testuser1", password="testpassword1")
    user2 = User.objects.create(username="testuser2", password="testpassword2")

    # Add some ratings
    Rating.objects.create(user=user1, book=create_test_book, stars=5)
    Rating.objects.create(user=user2, book=create_test_book, stars=3)

    # Calculate the expected average rating
    expected_avg = Rating.objects.filter(book=create_test_book).aggregate(Avg("stars"))[
        "stars__avg"
    ]
    expected_avg = round(expected_avg, 2)

    # Now the average rating should be the calculated value
    assert create_test_book.avg_rating() == expected_avg


@pytest.mark.django_db
def test_cannot_create_userprofile(client, create_test_user):
    client = APIClient()

    # userProfile = UserProfile.objects.create()
    data = {
        "user": create_test_user,
        "username": "test",
        "email": "test@example.com",
        "Address": "test",
    }
    response = client.post(reverse("userProfile-list"), data)
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_get_total(create_test_user, create_test_book):

    order = Order.objects.create(user=create_test_user, complete=False)
    order_book = OrderBook.objects.create(
        book=create_test_book, quantity=2, order=order
    )

    # Test the get_total property
    assert order_book.get_total == 20  # 100 * 2


@pytest.mark.django_db
def test_get_title(create_test_user, create_test_book):

    order = Order.objects.create(user=create_test_user, complete=False)
    order_book = OrderBook.objects.create(book=create_test_book, order=order)

    # Test the get_title property
    assert order_book.get_title == "example"
