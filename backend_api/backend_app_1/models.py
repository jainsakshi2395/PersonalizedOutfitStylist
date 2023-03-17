from django.db import models

# Create your models here.


class Outfit(models.Model):
    image_id = models.IntegerField(primary_key=True, null=False)
    image_display_name = models.CharField(max_length=255, default="Outfit#")
    gender = models.CharField(max_length=100)
    master_category = models.CharField(max_length=100)
    sub_category = models.CharField(max_length=100)
    outfit_type = models.CharField(max_length=100)
    base_colour = models.CharField(max_length=100)
    season = models.CharField(max_length=100)
    year = models.IntegerField()
    usage = models.CharField(max_length=100)
    image_link = models.TextField()

    class Meta:
        db_table = 'outfit_details'


class UserImage(models.Model):
    user_image = models.FileField(blank=False, null=False)
    image_name = models.CharField(max_length=100, default='user_image')

    class Meta:
        db_table = 'user_images'
