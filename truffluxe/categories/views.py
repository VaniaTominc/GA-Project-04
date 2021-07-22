from categories.serializers.common import CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .serializers.populated import PopulatedCategorySerializer
from .models import Category

class CategoryListView(APIView):

    def get(self, _request):
        categories = Category.objects.all()
        serialized_categories = PopulatedCategorySerializer(categories, many=True)
        return Response(serialized_categories.data, status=status.HTTP_200_OK)

class CategoryDetailView(APIView):

    def get_category(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except:
            raise NotFound(detail="🆘 Can't find that category 😢.")
    
    # GET request for one
    def get(self, _request, pk):
        category = self.get_category(pk=pk)
        serialized_category = PopulatedCategorySerializer(category)
        return Response(serialized_category.data, status=status.HTTP_200_OK)