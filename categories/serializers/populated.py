from truffles.serializers.common import ProductSerializer
from .common import CategorySerializer

class PopulatedCategorySerializer(CategorySerializer):
    truffles = ProductSerializer(many=True)