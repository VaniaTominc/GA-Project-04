from rest_framework.views import APIView        # Facilitates sending back JSON
from rest_framework.response import Response    # Sends back a response
from rest_framework import status               # Sends back a status HTTP code
from rest_framework.exceptions import NotFound  # Handling Errors

from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Truffle
from .serializers.common import ProductSerializer
from .serializers.populated import PopulatedProductSerializer

class ProductListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    # GET request all
    def get(self, _request):
        products = Truffle.objects.all()
        serialized_products = PopulatedProductSerializer(products, many=True)            # Originally ProductSerializer
        return Response(serialized_products.data, status=status.HTTP_200_OK)
    
    # POST request
    def post(self, request):
        request.data['owner'] = request.user.id
        product_to_add = ProductSerializer(data=request.data)
        if product_to_add.is_valid():
            product_to_add.save()
            return Response(product_to_add.data, status=status.HTTP_201_CREATED)
        return Response(product_to_add.data, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ProductDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_product(self, pk):
        try:
            return Truffle.objects.get(pk=pk)
        except:
            raise NotFound(detail="🆘 Can't find that underground 💎.")

    # GET request for one
    def get(self, _request, pk):
        product = self.get_product(pk=pk)
        serialized_product = PopulatedProductSerializer(product)                         # Originally ProductSerializer
        return Response(serialized_product.data, status=status.HTTP_200_OK)
    
    # DELETE request for one
    def delete(self, request, pk):
        product_to_delete = self.get_product(pk=pk)
        product_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    # EDIT request for one
    def put(self, request, pk):
        product_to_update = self.get_product(pk=pk)
        updated_product = ProductSerializer(product_to_update, data=request.data)
        if updated_product.is_valid():
            updated_product.save()
            return Response(updated_product.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_product.data, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    
