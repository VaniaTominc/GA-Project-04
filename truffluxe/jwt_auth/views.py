from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.exceptions import NotFound, PermissionDenied

from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers.common import UserSerializer

User = get_user_model()


class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({"message": "Registration Successful"}, status=status.HTTP_202_ACCEPTED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    def post(self, request):
        
        email = request.data.get("email")
        password = request.data.get("password")
    
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail="Invalid Credentials")

        date_time = datetime.now() + timedelta(days=7)
        token = jwt.encode({"sub": user_to_login.id, "exp": int(date_time.strftime("%s"))},
        settings.SECRET_KEY,
        algorithm="HS256"
        )
        return Response({ "token": token, "message": f"Welcome back {user_to_login.username}"})

class ProfileListView(APIView):

    # GET request all
    def get(self, _request):
        profiles = User.objects.all()
        serialized_profiles = UserSerializer(profiles, many=True)
        return Response(serialized_profiles.data, status=status.HTTP_200_OK)

class ProfileDetailView(APIView):

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            raise NotFound(detail="🆘 Can't find that user 😱.")
    
    #GET request one
    def get(self, _request, pk):

        profile = self.get_user(pk=pk)
        serialized_profile = UserSerializer(profile)
        return Response(serialized_profile.data, status=status.HTTP_200_OK)
    
    # EDIT request
    def put(self, request, pk):

        user_to_edit = self.get_user(pk=pk)

        if user_to_edit.email!= request.user.email:
            raise PermissionDenied()
        
        updated_user = UserSerializer(user_to_edit, data=request.data)
        if updated_user.is_valid():
            updated_user.save()
            return Response(updated_user.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    # DELETE request
    def delete(self, request, pk):

        user_to_delete = self.get_user(pk=pk)
        if user_to_delete.email != request.user.email:
            raise PermissionDenied()
        user_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
