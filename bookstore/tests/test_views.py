import pytest
from django.urls import reverse, resolve
from rest_framework import status
from app.models import User, Rating, Book, Order, OrderBook
from datetime import date


@pytest.mark.django_db
def test_user_login_success(client):
    user = User.objects.create_user(username="testuser", password="testpassword")
    data = {"username": "testuser", "password": "testpassword"}
    response = client.post(reverse("login"), data)
    assert response.status_code == status.HTTP_200_OK
    session_id = response.client.cookies.get("sessionid")
    assert session_id is not None


@pytest.mark.django_db
def test_user_register_success(client):
    data = {
        "username": "testuser",
        "email": "email@example.com",
        "password": "testpassword",
    }

    response = client.post(reverse("register"), data)
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_user_logout_success(client):
    response = client.post(reverse("logout"))
    session_id = response.client.cookies.get("sessionid")
    assert session_id is None


@pytest.mark.django_db
def test_get_user_success(client):
    user = User.objects.create_user(username="testuser", password="testpassword")
    client.login(username="testuser", password="testpassword")
    response = client.get(reverse("users"))
    assert response.status_code == status.HTTP_202_ACCEPTED
    assert "user" in response.data
    assert response.data["user"]["username"] == "testuser"


# @pytest.mark.django_db
# def test_rate_books_update(client):
#     user = User.objects.create_user(username="testuser", password="testpassword")
#     client.login(username="testuser", password="testpassword")
#     book = Book.objects.create(
#         title="example", author="testauthor", price=10, category="test", quantity=2
#     )
#     # data = {"stars": 4, "book": f"{book.id}", "user": user}
#     rating = Rating.objects.create(user=user, book=book, stars=2)
#     rating.objects.update(stars=4)
#     # response = client.post(f"book/{book.id}/rate_book", data)
#     assert rating.stars == 4


@pytest.mark.django_db
def test_rate_books_create(client):
    user = User.objects.create_user(username="testuser", password="testpassword")
    book = Book.objects.create(
        title="example", author="testauthor", price=10, category="test", quantity=2
    )
    Rating.objects.create(user=user, book=book, stars=2)
    assert Rating.objects.count() == 1


@pytest.mark.django_db
def test_create_orderBook(client):
    user = User.objects.create_user(username="testuser", password="testpassword")
    order = Order.objects.create(user=user, total_amount=10, complete=False)
    book = Book.objects.create(
        title="example", author="testauthor", price=10, category="test", quantity=2
    )
    orderBook = OrderBook.objects.create(order=order, book=book, quantity=1)
    assert OrderBook.objects.count() == 1


@pytest.mark.django_db
def test_rate_list_order_orderbooks(client):
    user = User.objects.create_user(username="testuser", password="testpassword")
    order = Order.objects.create(user=user, total_amount=10, complete=False)
    book = Book.objects.create(
        title="example", author="testauthor", price=10, category="test", quantity=2
    )
    orderBook = OrderBook.objects.create(order=order, book=book, quantity=1)
    response = client.get("/orders")
    assert response.status_code == status.HTTP_200_OK
