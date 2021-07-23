from opinions.serializers.populated import PopulatedOpinionSerializer
from .common import UserSerializer

class PopulatedUserSerializer(UserSerializer):
    opinions = PopulatedOpinionSerializer(many=True)