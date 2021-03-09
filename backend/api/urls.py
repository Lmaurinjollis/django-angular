from django.urls import path
from api import views

# Path leading to views associated
urlpatterns = [
    path('thread/', views.thread_list, name='Thread list'),
    path('thread/<int:pk>/', views.thread_detail, name='Thread detail'),
    path('thread/published/', views.thread_list_published, name='Thread published list')
]
