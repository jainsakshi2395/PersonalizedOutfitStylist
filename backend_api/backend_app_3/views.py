from django.shortcuts import render

# Create your views here.
from rest_framework import status

from .models import UserAttributes
from .serializers import UserAttributesSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(['GET'])
def getMeasurementByUserId(request, user_id):
    print(user_id)
    try:
        attribute = UserAttributes.objects.get(user_id=user_id)
        print(attribute)
    except UserAttributes.DoesNotExist:
        return Response({'error': 'UserAttributes with user ID {} does not exist'.format(user_id)},
                        status=status.HTTP_404_NOT_FOUND)

    serializer = UserAttributesSerializer(attribute, many=False)
    print(serializer)
    return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
def createMeasurements(request):
    serializer = UserAttributesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['PUT'])
def updateMeasurementByUserId(request, user_id):
    try:
        attribute = UserAttributes.objects.get(user_id=user_id)
    except UserAttributes.DoesNotExist:
        return Response({'error': 'UserAttributes with user ID {} does not exist'.format(user_id)},
                        status=status.HTTP_404_NOT_FOUND)

    serializer = UserAttributesSerializer(attribute, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
