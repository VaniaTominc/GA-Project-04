from jwt_auth.serializers.common import UserSerializer
from .common import OpinionSerializer

class PopulatedOpinionSerializer(OpinionSerializer):
    owner = UserSerializer()