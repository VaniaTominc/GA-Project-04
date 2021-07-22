from opinions.serializers.common import OpinionSerializer
from categories.serializers.common import CategorySerializer
from .common import ProductSerializer

class PopulatedProductSerializer(ProductSerializer):
    opinions = OpinionSerializer(many=True)
    categories = CategorySerializer(many=True)