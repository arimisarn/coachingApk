from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Profile
from .serializers import UserSerializer

# 🧾 APIView pour l'inscription utilisateur
class RegisterUser(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Création du profil associé automatiquement
            Profile.objects.create(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 📋 APIView pour afficher la liste des utilisateurs
class UserListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

# 🔍 APIView pour afficher le détail d'un utilisateur
class UserDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# 👤 Vue HTML pour afficher le profil de l'utilisateur connecté
@login_required
def profile_view(request):
    return render(request, 'accounts/profile.html', {
        'user': request.user,
        'profile': request.user.profile
    })

# ⚙️ APIView REST pour configurer le profil (photo, bio, coaching_type)
class ProfileSetupView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        profile = request.user.profile
        bio = request.data.get('bio', '')
        coaching_type = request.data.get('coaching_type', '')
        photo = request.FILES.get('photo')

        profile.bio = bio
        profile.coaching_type = coaching_type
        if photo:
            profile.photo = photo

        profile.save()
        request.session['is_first_login'] = False  # utile pour redirection frontend

        return Response({'message': 'Profil mis à jour avec succès'}, status=status.HTTP_200_OK)
