from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('accounts/', include('accounts.urls')),  # Cela inclut toutes les routes de `accounts/urls.py`
]
