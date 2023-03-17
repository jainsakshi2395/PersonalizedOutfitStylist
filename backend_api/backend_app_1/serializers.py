from rest_framework import serializers
from .models import Outfit, UserImage
from rest_framework.serializers import Serializer, FileField


class OutfitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outfit
        fields = ('image_id', 'image_display_name', 'gender', 'master_category', 'sub_category', 'outfit_type',
                  'base_colour', 'season', 'year', 'usage', 'image_link')
        # field = '__all__'


class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = ('user_image', 'image_name')
