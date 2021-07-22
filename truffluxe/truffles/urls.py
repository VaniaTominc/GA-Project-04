from django.urls import path
from .views import TruffleListView

urlpatterns = [
    path('', TruffleListView.as_view())
]