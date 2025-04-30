from django.urls import path
from .views import (
    RegisterUser, UserListView, UserDetailView,
    ProfileSetupView, CustomTokenObtainPairView
)

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('profile/setup/', ProfileSetupView.as_view(), name='profile-setup'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # 🔐 Auth avec redirection

]
