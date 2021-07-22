from django.urls import path
from .views import TruffleAllView

urlpatterns = [
    path('', TruffleAllView.as_view())
]