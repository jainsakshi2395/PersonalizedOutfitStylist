from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
# from django.http import JsonResponse
from .serializers import UserImageSerializer, OutfitSerializer
# from .apps import BackendApp1Config
# from django.http import HttpResponse, JsonResponse
# from .models import Outfit, UserImage
from .serializers import OutfitSerializer
from .models import Outfit
from keras.utils import load_img
from keras.utils import img_to_array
import numpy as np
from keras.applications.resnet import ResNet50, preprocess_input
import tensorflow
from keras.layers import GlobalMaxPooling2D
from numpy.linalg import norm
import os
from sklearn.neighbors import NearestNeighbors
from django.conf import settings

model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
model.trainable = False

model = tensorflow.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])


def feature_extraction(img_path, model):
    img = load_img(img_path, target_size=(224, 224))
    img_array = img_to_array(img)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)

    return normalized_result


def recommend(features, feature_list):
    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list)

    distances, indices = neighbors.kneighbors([features])

    return indices


def extract_filename(filepath):
    filename = os.path.splitext(os.path.basename(filepath))[0]
    return filename


class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):

        if 'file' not in request.FILES:
            return Response({'error': 'No file was sent'})

        file = request.FILES['file']

        # Check if file is an image
        if file.name.split('.')[-1] not in ['jpg', 'jpeg', 'png']:
            return Response({'error': 'File must be an image and sent in jpg, jpeg or png format'})

        if not os.path.exists(settings.IMG_FOLDER_PATH):
            os.makedirs(settings.IMG_FOLDER_PATH)

        # Save file to folder
        with open(os.path.join(settings.IMG_FOLDER_PATH, file.name), 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        img_file = request.data['file']
        print(img_file)


        # feature extract

        features = feature_extraction(os.path.join(settings.IMG_FOLDER_PATH, file.name), model)

        print(features)

        # recommendation

        indices = recommend(features, settings.FEATURE_LIST)
        print(indices)
        indexes = []

        for i in indices[0][1:6]:
            index = extract_filename(settings.FILENAMES[i])
            indexes.append(index)

        print(indexes)
        image_details = Outfit.objects.filter(pk__in=indexes)
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

