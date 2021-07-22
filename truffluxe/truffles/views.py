from rest_framework.views import APIView        # Sends back json
from rest_framework.response import Response    # Sends back response
from rest_framework import status               # Sends back a status code

from rest_framework.exceptions import NotFound  # Error handling

from .models import Truffle
from .serializers import TruffleSerializer

class TruffleAllView(APIView):

    def get(self, _request):
        truffles = Truffle.objects.all()
        serialized_truffles = TruffleSerializer(truffles, many=True)
        return Response(serialized_truffles.data, status=status.HTTP_200_OK)

class TruffleDetailView(APIView):

    def get_truffle(self, pk):
        try:
            return Truffle.objects.get(pk=pk)
        except:
            raise NotFound(detail="💎 Can't find that underground treasure!")

    def get(self, _request, pk):
        truffle = self.get_truffle(pk=pk)
        serialized_truffle = TruffleSerializer(truffle)
        return Response(serialized_truffle.data, status=status.HTTP_200_OK)
