from rest_framework import serializers
from ..models import Truffle

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Truffle
        fields = '__all__'