from django.db import models
from django.contrib.auth.models import User

def default_avatar():
    return 'default/avatar.png'  # image par défaut dans MEDIA

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, default='')
    coaching_type = models.CharField(max_length=100, blank=True, default='')
    profile_picture = models.ImageField(upload_to='profile_pictures/', default=default_avatar)
    has_completed_profile = models.BooleanField(default=False)  # ➕ ajouté pour gérer la redirection

    def __str__(self):
        return self.user.username
