from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .serializers.common import OpinionSerializer
from opinions.models import Opinion

class OpinionListView(APIView):

    # GET request all
    def get(self, _request):
        opinions = Opinion.objects.all()
        serialized_opinions = OpinionSerializer(opinions, many=True)
        return Response(serialized_opinions.data, status=status.HTTP_200_OK)

    # POST request
    def post(self, request):

        opinion_to_create = OpinionSerializer(data=request.data)

        if opinion_to_create.is_valid():
            opinion_to_create.save()
            return Response(opinion_to_create.data, status=status.HTTP_201_CREATED)
        return Response(opinion_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class OpinionDetailView(APIView):

    def get_opinion(self, pk):
        try:
            return Opinion.objects.get(pk=pk)
        except:
            raise NotFound(detail="🆘 Can't find that comment 😱.")

    # GET request one
    def get(self, _request, pk):

        opinion = self.get_opinion(pk=pk)
        serialized_opinion = OpinionSerializer(opinion)
        return Response(serialized_opinion.data, status=status.HTTP_200_OK)

    # EDIT request
    def put(self, request, pk):

        opinion_to_edit = self.get_opinion(pk=pk)
        updated_opinion = OpinionSerializer(opinion_to_edit, data=request.data)
        if updated_opinion.is_valid():
            updated_opinion.save()
            return Response(updated_opinion.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_opinion.data, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    # DELETE request
    def delete(self, request, pk):

        opinion_to_delete = self.get_opinion(pk=pk)
        opinion_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)