from rest_framework.views import APIView        # Facilitates sending back JSON
from rest_framework.response import Response    # Sends back a response
from rest_framework import status               # Sends back a status HTTP code

from .models import Truffle
from .serializers import TruffleSerializer

class TruffleListView(APIView):
    # All products
    def get(self, _request):
        cyclists = Truffle.objects.all()
        serialized_cyclists = TruffleSerializer(cyclists, many=True)
        return Response(serialized_cyclists.data, status=status.HTTP_200_OK)