from django.urls import path
from .views import TruffleAllView, TruffleDetailView

urlpatterns = [
    path('', TruffleAllView.as_view()),
    path('<int:pk>/', TruffleDetailView.as_view())
]