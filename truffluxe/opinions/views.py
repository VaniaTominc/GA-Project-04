from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .serializers.common import OpinionSerializer
from opinions.models import Opinion

class OpinionListView(APIView):
    # POST request
    def post(self, request):

        opinion_to_create = OpinionSerializer(data=request.data)

        if opinion_to_create.is_valid():
            opinion_to_create.save()
            return Response(opinion_to_create.data, status=status.HTTP_201_CREATED)
        return Response(opinion_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class OpinionDetailView(APIView):
    # DELETE request
    def delete(self, request, pk):

        try:
            opinion_to_delete = Opinion.objects.get(pk=pk)
        except Opinion.DoesNotExist:
            raise NotFound(detail="😱 Comment not found")
        opinion_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)