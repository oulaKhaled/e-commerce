import pytest
from django.urls import reverse, resolve
from rest_framework import status
from app.models import User, Rating, Book, Order, OrderBook, UserProfile
from datetime import date
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory
from app.views import BookView
from rest_framework.authtoken.models import Token


@pytest.fixture
def user_data():
    return {"username": "testuser", "password": "testpassword"}


@pytest.fixture
def order_book_data():
    return {
        "title": "example",
        "author": "testauthor",
        "price": 10,
        "category": "test",
        "quantity": 2,
    }


@pytest.fixture
def create_test_book(order_book_data):
    test_book = Book.objects.create(**order_book_data)
    return test_book


@pytest.fixture
def user_data_register():
    return {
        "username": "user_name",
        "password": "user_pass543",
        "email": "test@gmail.com",
    }


@pytest.fixture
def create_test_user(user_data):
    user_model = get_user_model()
    test_user = user_model.objects.create_user(**user_data)

    return test_user


@pytest.mark.django_db
def test_user_login_success(client, create_test_user, user_data):
    client = APIClient()
    user = create_test_user
    response = client.post(reverse("login"), user_data, format="json")
    assert response.status_code == status.HTTP_200_OK
    assert "token" in response.data
    assert "user" in response.data
    assert response.data["user"]["username"] == "testuser"


@pytest.mark.django_db
def test_nonexistent_user(client):
    client = APIClient()
    data = {"username": "username", "password": "password"}
    response = client.post(reverse("login"), data, format="json")
    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_successful_registration(user_data_register):
    client = APIClient()
    response = client.post(reverse("register"), user_data_register, format="json")
    assert response.status_code == status.HTTP_200_OK
    assert "token" in response.data
    assert "user" in response.data
    assert response.data["user"]["username"] == "user_name"


@pytest.mark.django_db
def test_registration_with_existing_username(client, user_data_register):
    user_model = get_user_model()
    test_user = user_model.objects.create_user(**user_data_register)
    client = APIClient()
    data = user_data_register
    response = client.post(reverse("register"), data, format="json")
    assert response.data["username"] == ["A user with that username already exists."]


@pytest.mark.django_db
def test_update_books_rate(client, create_test_user, create_test_book):
    client = APIClient()
    rating = Rating.objects.create(
        user=create_test_user, book=create_test_book, stars=2
    )

    client.force_login(create_test_user)  # Log in the client with the created user
    factory = APIRequestFactory()
    request = factory.post(
        "/api/books/{}/rate_book/".format(create_test_book.pk),
        {"stars": 4},
        format="json",
    )
    request.user = create_test_user
    view = BookView.as_view({"post": "rate_book"})
    response = view(request, pk=create_test_book.pk)
    assert response.status_code == status.HTTP_200_OK
    rating.refresh_from_db()
    assert rating.stars == 4


@pytest.mark.django_db
def test_create_rating(client, create_test_user):
    book = Book.objects.create(
        title="example", author="testauthor", price=10, category="test", quantity=2
    )
    Rating.objects.create(user=create_test_user, book=book, stars=2)
    assert Rating.objects.count() == 1


@pytest.mark.django_db
def test_create_orderBook(client, create_test_user, create_test_book):
    order = Order.objects.create(user=create_test_user, complete=False)
    orderBook = OrderBook.objects.create(order=order, book=create_test_book, quantity=1)
    assert OrderBook.objects.count() == 1


@pytest.mark.django_db
def test_list_order_orderbooks(client, create_test_user, create_test_book):
    client = APIClient()
    order = Order.objects.create(user=create_test_user, complete=False)
    client.force_login(create_test_user)  # Log in the client with the created user
    orderBook = OrderBook.objects.create(order=order, book=create_test_book, quantity=1)
    url = reverse("orders-list")
    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_create_order(client, create_test_user):
    client = APIClient()
    order = Order.objects.create(user=create_test_user, complete=False)
    assert Order.objects.count() == 1


@pytest.mark.django_db
def test_no_duplicate_uncomplete_order_for_user(client, create_test_user):
    client = APIClient()
    client.force_login(create_test_user)
    order = Order.objects.create(user=create_test_user, complete=False)
    data = {"user": create_test_user, "total_amount": 10, "complete": False}
    url = reverse("orders-list")
    response = client.post(url, data)
    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED


@pytest.mark.django_db
def test_increase_book_quantity(client, create_test_user, create_test_book):
    client = APIClient()

    client.force_login(create_test_user)
    order = Order.objects.create(user=create_test_user, complete=False)
    orderBook = OrderBook.objects.create(order=order, book=create_test_book, quantity=1)
    data = {
        "order": order.id,
        "book": create_test_book.id,
    }
    url = reverse("orderBook-list")
    response = client.post(url, data, format="json")
    assert response.status_code == status.HTTP_200_OK
    orderBook.refresh_from_db()
    assert orderBook.quantity == 2
    assert response.data["message"] == "just increase quantity"


@pytest.mark.django_db
def test_decrease_book_quantity(client, create_test_user, create_test_book):
    client = APIClient()
    client.force_login(create_test_user)
    order = Order.objects.create(
        user=create_test_user, complete=False, order_date=date.today().isoformat()
    )
    orderBook = OrderBook.objects.create(order=order, book=create_test_book, quantity=3)
    data = {
        "order": order.id,
        "book": create_test_book.id,
        # Sending current quantity to trigger decrease
    }
    url = reverse("orderBook-detail", kwargs={"pk": orderBook.id})
    response = client.put(url, data, format="json")
    assert response.status_code == status.HTTP_200_OK
    orderBook.refresh_from_db()
    assert orderBook.quantity == 2
