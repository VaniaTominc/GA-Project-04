from truffles.serializers.common import ProductSerializer
from .common import ImageSerializer


class PopulatedImageSerializer(ImageSerializer):
  truffles = ProductSerializer(many=True)