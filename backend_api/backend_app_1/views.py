from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .serializers import UserImageSerializer, OutfitSerializer
from .apps import BackendApp1Config
from django.http import HttpResponse, JsonResponse
from .models import Outfit, UserImage


class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        user_image_serializer = UserImageSerializer(data=request.data)
        if user_image_serializer.is_valid():
            user_image_serializer.save()

        image_details = Outfit.objects.filter(pk__in=[59679, 59680, 59681])
        serializer = OutfitSerializer(image_details, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RecommendAll(APIView):
    def post(self, request, *args, **kwargs):

        age_group = request.data.get('age_group')  # accepting as string = "Teen"  || "Children" || "Adult"
        body_type = request.data.get('body_type')   # accepting as string = "Pear" || "Rectangle" || ..
        season = request.data.get('season')         # accepting as string = "Fall" || "Winter" || ..
        recommended_response = list()


        if age_group:
            # write the code to call Model 1
            # It should have response as list of dictionary

            # adding sample output to test for now
            image_details = Outfit.objects.filter(pk__in=[59679, 59680, 59681])
            serializer = OutfitSerializer(image_details, many=True)
            recommended_response += serializer.data

        if body_type:
            # write the code to call model 2
            # It should have response as list of dictionary
            pass

        if season:
            # write the code to call model 3
            # It should have response as list of dictionary
            pass

        return Response(recommended_response, status=status.HTTP_200_OK)


class Default(APIView):
    def get(self, request, *args, **kwargs):
        data = {"This is API server, Use Postman"}
        return Response(data, status=status.HTTP_200_OK)
