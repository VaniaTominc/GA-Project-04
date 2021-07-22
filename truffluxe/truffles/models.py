from django.db import models

class Truffle(models.Model):
    name = models.CharField(max_length=50, default=None)
    description = models.TextField(default=None)
    use = models.CharField(max_length=500, default=None)
    ingredients = models.CharField(max_length=500, default=None)
    alergies = models.CharField(max_length=500, default=None)
    life = models.CharField(max_length=50, default=None)
    images = models.CharField(max_length=100, default=None)

    def __str__(self):
        return f"{self.name}"               # add category later