from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .serializers.common import OpinionSerializer
from .serializers.populated import PopulatedOpinionSerializer
from opinions.models import Opinion


class OpinionListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    # GET request all
    def get(self, _request):
        opinions = Opinion.objects.all()
        serialized_opinions = PopulatedOpinionSerializer(opinions, many=True)
        return Response(serialized_opinions.data, status=status.HTTP_200_OK)

    # POST request
    def post(self, request):
        request.data["owner"] = request.user.id

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
        serialized_opinion = PopulatedOpinionSerializer(opinion)
        return Response(serialized_opinion.data, status=status.HTTP_200_OK)

    # EDIT request
    def put(self, request, pk):

        opinion_to_edit = self.get_opinion(pk=pk)

        if opinion_to_edit.owner != request.user:
            raise PermissionDenied()

        updated_opinion = OpinionSerializer(opinion_to_edit, data=request.data)
        if updated_opinion.is_valid():
            updated_opinion.save()
            return Response(updated_opinion.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_opinion.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    # DELETE request
    def delete(self, request, pk):

        opinion_to_delete = self.get_opinion(pk=pk)
        if opinion_to_delete.owner != request.user:
            raise PermissionDenied()
        opinion_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
