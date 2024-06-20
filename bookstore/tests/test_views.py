import pytest
from django.urls import reverse, resolve
from rest_framework import status
from app.models import User, Rating, Book, Order, OrderBook, UserProfile
from datetime import date
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory
from app.views import BookView


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
    response = client.post(reverse("login"), user_data)
    assert response.status_code == status.HTTP_200_OK
    session_id = response.client.cookies.get("sessionid")
    assert session_id is not None


@pytest.mark.django_db
def test_user_register_success(client, user_data_register):
    response = client.post(reverse("register"), user_data_register)
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_user_logout_success(client):
    response = client.post(reverse("logout"))
    session_id = response.client.cookies.get("sessionid")
    assert session_id is None


@pytest.mark.django_db
def test_get_user_success(client, create_test_user):
    client.login(username="testuser", password="testpassword")
    response = client.get(reverse("users"))
    assert response.status_code == status.HTTP_202_ACCEPTED
    assert "user" in response.data
    assert response.data["user"]["username"] == "testuser"


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
