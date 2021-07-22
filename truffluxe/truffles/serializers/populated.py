from opinions.serializers.common import OpinionSerializer
from .common import ProductSerializer

class PopulatedProductSerializer(ProductSerializer):
    opinions = OpinionSerializer(many=True)