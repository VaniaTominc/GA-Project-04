from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.exceptions import NotFound

from .serializers.common import ImageSerializer
from .models import Image

class ImageListView(APIView):

    # GET request all
    def get(self, _request):
        images = Image.objects.all()
        serialized_images = ImageSerializer(images, many=True)
        return Response(serialized_images.data, status=status.HTTP_200_OK)

class ImageDetailView(APIView):

    def get_image(self, pk):
        try:
            return Image.objects.get(pk=pk)
        except:
            raise NotFound(detail="🆘 Can't find that image 😱.")

    # GET request one
    def get(self, _request, pk):

        image = self.get_image(pk=pk)
        serialized_image = ImageSerializer(image)
        return Response(serialized_image.data, status=status.HTTP_200_OK)
    
