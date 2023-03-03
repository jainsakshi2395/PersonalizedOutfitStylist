import uuid


from django.db import models
from django.utils import timezone


# Create your models here.


class UserProfile(models.Model):
    user_id = models.CharField(primary_key=True, max_length=40, default=uuid.uuid4,
                               editable=False)
    age = models.IntegerField()
    name = models.CharField(max_length=225,default="")
    height = models.DecimalField(max_digits=4, decimal_places=2)
    waist = models.DecimalField(max_digits=4, decimal_places=2)
    bust = models.DecimalField(max_digits=4, decimal_places=2)
    hip = models.DecimalField(max_digits=4, decimal_places=2)
    body_type = models.CharField(max_length=225)
    gender = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now())
    updated_at = models.DateTimeField(default=timezone.now())

    def __str__(self):
        return self.name
