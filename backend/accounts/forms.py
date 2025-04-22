from django import forms
from .models import CustomUser

class CustomUserCreationForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'bio', 'profile_picture', 'coaching_type']

    password = forms.CharField(widget=forms.PasswordInput)
