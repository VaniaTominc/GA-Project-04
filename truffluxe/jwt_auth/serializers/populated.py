from opinions.serializers.populated import PopulatedOpinionSerializer
from .profile import ProfileSerializer

class PopulatedUserSerializer(ProfileSerializer):
    opinions = PopulatedOpinionSerializer(many=True)