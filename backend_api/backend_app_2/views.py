from .models import UserProfile
from .serializers import ProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/profiles-list/',
        'Detail View': '/profile-detail/<int:id>/',
        'Create': '/profile-create/',
        'Update': '/profile-update/<int:id>/',
        'Delete': '/profile-detail/<int:id>/',
    }
    return Response(api_urls);


@api_view(['GET'])
def ShowAllProfiles(request):
    profiles = UserProfile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def ViewProfile(request, pk):
    profile = UserProfile.objects.get(user_id=pk)
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def CreateProfile(request):
    serializer = ProfileSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['PUT'])
def updateProfile(request, pk):
    profile = UserProfile.objects.get(user_id=pk)
    serializer = ProfileSerializer(instance=profile, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['GET'])
def deleteProfile(request, pk):
    profile = UserProfile.objects.get(user_id=pk)
    profile.delete()

    return Response('Profile deleted successfully!')


@api_view(['POST'])
def deleteProfile(request, pk):
    profile = UserProfile.objects.get(user_id=pk)
    profile.delete()

    return Response('Profile deleted successfully!')


