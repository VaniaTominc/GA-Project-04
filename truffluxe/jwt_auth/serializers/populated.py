from opinions.serializers.common import OpinionSerializer
from .common import UserSerializer

class PopulatedUserSerializer(UserSerializer):
    opinions = OpinionSerializer(many=True)