from opinions.serializers.populated import PopulatedOpinionSerializer
from categories.serializers.common import CategorySerializer
from images.serializers.common import ImageSerializer
from .common import ProductSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedProductSerializer(ProductSerializer):
    opinions = PopulatedOpinionSerializer(many=True)
    categories = CategorySerializer(many=True)
    photos = ImageSerializer(many=True)
    owner = UserSerializer()