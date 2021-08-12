from django.urls import path
from .views import OpinionListView, OpinionDetailView

urlpatterns = [
    path('', OpinionListView.as_view()),
    path('<int:pk>/', OpinionDetailView.as_view()),
]