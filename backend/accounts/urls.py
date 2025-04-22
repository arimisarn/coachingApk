from django.urls import path
from .views import RegisterUser
from .views import UserListView, UserDetailView

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register'),
     path('users/', UserListView.as_view(), name='user-list'),
     path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
]
