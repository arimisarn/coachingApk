from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer

class RegisterUser(APIView):
    def post(self, request, *args, **kwargs):
        # On utilise le serializer pour valider et créer un utilisateur
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Crée l'utilisateur dans la base de données
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
