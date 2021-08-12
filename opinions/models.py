from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Opinion(models.Model):
    text = models.TextField(max_length=300)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)
    truffle = models.ForeignKey(
        "truffles.Truffle",
        related_name = "opinions",
        on_delete = models.CASCADE
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="opinions",
        on_delete = models.CASCADE              # Potencially I could leave this out. 
    )

    def __str__(self):
        return f"{self.truffle} - {self.rating}"               
