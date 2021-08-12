from jwt_auth.serializers.common import UserSerializer
from .common import OpinionSerializer
from truffles.serializers.common import ProductSerializer

class PopulatedOpinionSerializer(OpinionSerializer):
    owner = UserSerializer(),
    truffle = ProductSerializer()