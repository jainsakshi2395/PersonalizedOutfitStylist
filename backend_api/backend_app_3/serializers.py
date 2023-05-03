from rest_framework import serializers

from .models import UserAttributes


class UserAttributesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAttributes
        fields = '__all__'
