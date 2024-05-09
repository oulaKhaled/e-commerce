from django.shortcuts import render, redirect
from django.http import response, HttpResponse
from django.contrib.auth.forms import UserCreationForm
from . import forms
from django.contrib.auth import login, authenticate


# Create your views here.
def store(request):
    return render(request, "app/store.html")


def registerUser(request):
    form = forms.createUserForm()
    message = ""
    if request.method == "POST":
        form = forms.createUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("/app")
        else:
            message = "something went wrong, please enter a valid username or password"

    return render(
        request, "app/register.html", context={"form": form, "message": message}
    )


def loginUser(request):
    form = forms.LoginForm()
    message = ""
    if request.method == "POST":
        form = forms.LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return redirect("/app")
            else:
                message = "Please check if password or username are correct"

    return render(request, "app/auth.html", context={"form": form, "message": message})


# def cart(request):
#     return render(request, "app/cart.html")


# def checkout(request):
#     return render(request, "app/checkout.html")
