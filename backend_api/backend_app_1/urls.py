from django.urls import path
from .views import ImageUploadView, RecommendAll, Default

urlpatterns = [
    path('upload/', ImageUploadView.as_view(), name='upload-image'),
    path('recommend_all/', RecommendAll.as_view(), name='recommend_all'),
    path('', Default.as_view(), name="default_view")

]
