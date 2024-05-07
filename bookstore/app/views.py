from django.shortcuts import render, redirect
from django.http import response, HttpResponse
from django.contrib.auth.forms import UserCreationForm
from . import forms
from django.contrib.auth import login


# Create your views here.
def store(request):
    return render(request, "app/store.html")


def registerUser(request):
    form = forms.createUserForm()
    if request.method == "POST":
        form = forms.createUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("/app")
    else:
        print("Post Method is not working")

    return render(request, "app/register.html", context={"form": form})


def loginUser(request):
    form = forms.LoginForm
    return render(request, "app/auth.html", context={"form": form})


# def cart(request):
#     return render(request, "app/cart.html")


# def checkout(request):
#     return render(request, "app/checkout.html")
