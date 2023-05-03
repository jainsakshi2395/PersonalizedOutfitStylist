from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
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
from .model.model_age import recommend_age_based_outfits, clf_age_based
from .model.model_bodytype import recommend_bodytype_results, clf_bodytype
from .model.model_season import recommend_outfits

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


def get_recommended_age_results(age_category):
    model_response = list()

    if age_category == "Children":
        user_predicted_age = 5
    elif age_category == "Teen":
        user_predicted_age = 14
    elif age_category == "Adult":
        user_predicted_age = 30
    else:
        return model_response
    prediction_result = recommend_age_based_outfits([[user_predicted_age]])
    model_response += prediction_result.to_dict('records')[:5]
    return model_response

def get_recommended_bodytype_results(body_type):
    model_response = list()
    prediction_result = recommend_bodytype_results([body_type])
    model_response += prediction_result.to_dict('records')[:5]
    return model_response

def get_recommended_season_results(season):
    model_response = list()
    prediction_result = recommend_outfits([season])
    model_response += prediction_result.to_dict('records')[:5]
    return model_response

class RecommendAll(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.recommended_response = {"age_group": None, "body_type": None, "season": None, "results": []}

    def post(self, request, *args, **kwargs):
        user_age = request.data.get("user_age")    # accepting as integer = 25
        age_group = request.data.get('age_group')  # accepting as string = "Teen"  || "Children" || "Adult"
        body_type = request.data.get('body_type')   # accepting as string = "Pear" || "Rectangle" || ..
        selected_season = request.data.get('season')         # accepting as string = "Fall" || "Winter" || ..
        # user_height = request.data.get('user_height')
        user_bust = request.data.get('user_bust')
        user_waist = request.data.get('user_waist')
        user_hip = request.data.get('user_hip')
        season = request.data.get('season')

        if user_age:
            try:
                user_age = int(user_age)
            except:
                return Response("user_age is not a valid integer", status=status.HTTP_400_BAD_REQUEST)
            if user_age <= 0 or user_age > 40:
                return Response("user_age is invalid", status=status.HTTP_400_BAD_REQUEST)

        if age_group:
            if not isinstance(age_group, str):
                return Response("age_group is not a valid string", status=status.HTTP_400_BAD_REQUEST)
            if age_group not in ["Children", "Adult", "Teen"]:
                return Response("age_group is invalid", status=status.HTTP_400_BAD_REQUEST)

        if age_group:
            self.recommended_response["age_group"] = age_group
            self.recommended_response['results'] += get_recommended_age_results(age_group)
            print("testing:  ", self.recommended_response['results'])
        elif user_age:
            user_age_group = clf_age_based.predict(np.array([[user_age]]))[0]
            self.recommended_response["age_group"] = user_age_group
            self.recommended_response['results'] += get_recommended_age_results(user_age_group)

        if user_bust or user_waist or user_hip:
            try:
                user_bust = float(user_bust)
                user_waist = float(user_waist)
                user_hip = float(user_hip)
            except:
                return Response("User's physical attributes are not valid", status=status.HTTP_400_BAD_REQUEST)
            if user_bust <= 0 or user_bust > 40:
                return Response("User_Bust is invalid", status=status.HTTP_400_BAD_REQUEST)
            if user_waist <= 0 or user_waist > 40:
                return Response("User_Waist is invalid", status=status.HTTP_400_BAD_REQUEST)
            if user_hip <= 0 or user_hip > 40:
                return Response("User_Hip is invalid", status=status.HTTP_400_BAD_REQUEST)

        if body_type:
            if not isinstance(body_type, str):
                return Response("Body_Type is not a valid string", status=status.HTTP_400_BAD_REQUEST)
            if body_type not in ["Pear-Hourglass", "Hourglass", "Apple", "Pear", "Rectangle"]:
                return Response("Body_Type is invalid", status=status.HTTP_400_BAD_REQUEST)

        if body_type:
            # write the code to integrate model 2 - bodytype
            # It should have response as list of dictionary for recommended outfits
            self.recommended_response["body_type"] = body_type
            self.recommended_response['results'] += get_recommended_bodytype_results(body_type)
        elif user_bust and user_waist and user_hip:
            body_type = clf_bodytype.predict(np.array([[user_bust, user_waist, user_hip]]))[0]
            self.recommended_response["body_type"] = body_type
            self.recommended_response['results'] += get_recommended_bodytype_results(body_type)

        if selected_season:
            # write the code to integrate model 3 - season
            # It should have response as list of dictionary for recommended outfits
            self.recommended_response["season"] = selected_season
            self.recommended_response['results'] += get_recommended_season_results(season)

        return Response(self.recommended_response, status=status.HTTP_200_OK)


class Default(APIView):
    def get(self, request, *args, **kwargs):
        data = {"This is API server, Use Postman!!"}
        return Response(data, status=status.HTTP_200_OK)

