from django.forms import forms

from django import forms
from django.contrib.auth.forms import UserCreationForm
from . import models


class createUserForm(UserCreationForm):
    username = forms.CharField(
        label="username",
        min_length=5,
        max_length=150,
        widget=forms.TextInput(
            attrs={
                "placeholder": "username",
                "style": "width: 300px; align-items: center; position: relative; justify-content: center;",
                "class": "form-control",
            }
        ),
    )
    email = forms.EmailField(
        label="email",
        widget=forms.EmailInput(
            attrs={
                "placeholder": "Email",
                "style": "width: 300px; align-items: center;",
                "class": "form-control",
            }
        ),
    )
    password1 = forms.CharField(
        label="password",
        widget=forms.PasswordInput(
            attrs={
                "placeholder": "pssword",
                "style": "width: 300px; align-items: center;",
                "class": "form-control",
            }
        ),
    )
    password2 = forms.CharField(
        label="Confirm password",
        widget=forms.PasswordInput(
            attrs={
                "placeholder": "pssword",
                "style": "width: 300px; align-items: center;",
                "class": "form-control",
            }
        ),
    )


class LoginForm(forms.Form):
    username = forms.CharField(
        max_length=70,
        widget=forms.TextInput(
            attrs={
                "placeholder": "username",
                "style": "width: 300px; margin:10px;",
                "class": "form-control",
            }
        ),
    )
    password = forms.CharField(
        max_length=65,
        widget=forms.PasswordInput(
            attrs={
                "placeholder": "username",
                "style": "width: 300px;  margin:10px;",
                "class": "form-control",
            }
        ),
    )

    class Meta:
        fields = ["username", "password"]
