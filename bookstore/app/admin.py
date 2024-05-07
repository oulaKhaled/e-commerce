from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.UserProfile)
admin.site.register(models.Shippininformation)
admin.site.register(models.Order)
admin.site.register(models.OrderBook)
admin.site.register(models.Book)
admin.site.register(models.Rating)
