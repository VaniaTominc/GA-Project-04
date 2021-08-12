from django.db import models

class Image(models.Model):
    imageurl = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.imageurl}"
