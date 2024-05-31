from django.db import models
from datetime import date
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Book(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False)
    author = models.CharField(max_length=250, null=False, blank=False)
    price = models.IntegerField(null=False, blank=False)
    quantity = models.IntegerField(null=False, blank=False)
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    category = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.title


class Order(models.Model):
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    order_date = models.DateField(default=date.today, null=False)
    total_amount = models.IntegerField(null=False)
    complete = models.BooleanField(null=False, default=False, blank=False)

    def __str__(self):
        return str(self.id)

    @property
    def get_cart_total(self):
        orderbooks = self.orderbook_set.all()
        total = sum([book.get_total for book in orderbooks])
        return total

    @property
    def get_cart_items(self):
        orderbooks = self.orderbook_set.all()
        total = sum([book.quantity for book in orderbooks])
        return total


class OrderBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField(null=False, default=1)
    added_date = models.DateField(default=date.today, null=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

    @property
    def get_total(self):
        total = self.book.price * self.quantity
        return total

    @property
    def get_title(self):
        return self.book.title

    def __str__(self) -> str:
        return str(self.id)


class UserProfile(models.Model):
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    username = models.CharField(null=False, max_length=100)
    email = models.EmailField(null=False)
    Address = models.CharField(max_length=300, null=False)

    def __str__(self):
        return self.username


class Shippininformation(models.Model):
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, null=False, on_delete=models.CASCADE)
    address = models.CharField(max_length=300, null=False)
    zipcode = models.CharField(max_length=50, null=False)

    def __str__(self):
        return str(self.id)


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    stars = models.IntegerField(
        null=True, validators=[MinValueValidator(0), MaxValueValidator(5)], default=0
    )

    class Meta:
        unique_together = ("user", "book")
        index_together = ("user", "book")

    def __str__(self):
        return str(self.stars)
