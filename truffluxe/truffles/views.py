from rest_framework.views import APIView        # Facilitates sending back JSON
from rest_framework.response import Response    # Sends back a response
from rest_framework import status               # Sends back a status HTTP code
from rest_framework.exceptions import NotFound  # Handling Errors

from .models import Truffle
from .serializers import ProductSerializer

class ProductListView(APIView):
    # GET request all
    def get(self, _request):
        products = Truffle.objects.all()
        serialized_products = ProductSerializer(products, many=True)
        return Response(serialized_products.data, status=status.HTTP_200_OK)
    
    #POST request
    def post(self, request):
        product_to_add = ProductSerializer(data=request.data)
        if product_to_add.is_valid():
            product_to_add.save()
            return Response(product_to_add.data, status=status.HTTP_201_CREATED)
        return Response(product_to_add.data, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ProductDetailView(APIView):

    def get_product(self, pk):
        try:
            return Truffle.objects.get(pk=pk)
        except:
            raise NotFound(detail="🆘 Can't find that underground 💎.")

    #GET request for one
    def get(self, _request, pk):
        product = self.get_product(pk=pk)
        serialized_product = ProductSerializer(product)
        return Response(serialized_product.data, status=status.HTTP_200_OK)
    
