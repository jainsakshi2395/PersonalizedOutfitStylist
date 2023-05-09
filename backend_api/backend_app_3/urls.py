from django.urls import path
from . import views

urlpatterns = [
    path('profile/create/', views.createMeasurements, name='measurement-create'),
    path('profile/get/<uuid:user_id>/', views.getMeasurementByUserId, name='get-measurement-by-id'),
    path('profile/update/<uuid:user_id>/', views.updateMeasurementByUserId, name='update-measurement-by-id'),
]
