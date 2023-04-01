from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='apiOverview'),
    path('profiles-list', views.ShowAllProfiles, name='profiles-list'),
    path('profile-detail/<uuid:pk>', views.ViewProfile, name='profile-detail'),
    path('profile-create', views.CreateProfile, name='profile-create'),
    path('profile-update/<uuid:pk>', views.updateProfile, name='profile-update'),
    path('profile-delete/<uuid:pk>', views.deleteProfile, name='profile-delete'),
]
