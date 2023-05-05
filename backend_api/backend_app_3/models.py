from django.db import models
from django.utils import timezone


# Create your models here.

class UserAttributes(models.Model):
    user_id = models.UUIDField(max_length=40)
    name = models.CharField(max_length=50)
    age = models.IntegerField()
    hip = models.FloatField()
    bust = models.FloatField()
    waist = models.FloatField()
    height = models.FloatField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'user_attributes'
