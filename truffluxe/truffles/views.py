from rest_framework.views import APIView      # Sends back json
from rest_framework.response import Response   # Sends back response
from rest_framework import status             # Sends back a status code

from .models import Truffle
from .serializers import TruffleSerializer

class TruffleAllView(APIView):

    def get(self, _request):
        truffles = Truffle.objects.all()
        serialized_truffles = TruffleSerializer(truffles, many=True)
        return Response(serialized_truffles.data, status=status.HTTP_200_OK)
