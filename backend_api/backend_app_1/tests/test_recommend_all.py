from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse


class TestRecommendAll(APITestCase):

    # checking for user's valid physical attributes
    def test_recommend_user_attr_200(self):
        url = reverse('recommend_all')
        data = {'user_age': 14, 'user_hip': 37, 'user_bust': 47, 'user_waist': 39}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print("Recommendations for user attributes - valid inputs")

    # checking for user's invalid physical attributes
    def test_recommend_user_attr_400(self):
        url = reverse('recommend_all')
        data = {'user_age': "fourteen", 'user_hip': 7, 'user_bust': 5, 'user_waist': 3}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        print("Recommendations for user attributes - invalid inputs")

    # checking for user's valid age
    def test_recommend_user_attr_age_200(self):
        url = reverse('recommend_all')
        data = {'user_age': 5, 'user_hip': 33, 'user_bust': 40, 'user_waist': 36}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print("Recommendations for user attributes - user's age valid check")

    # checking for user's invalid age
    def test_recommend_user_attr_age_400(self):
        url = reverse('recommend_all')
        data = {'user_age': "three", 'user_hip': 32, 'user_bust': 36, 'user_waist': 39}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        print("Recommendations for user attributes - user's age invalid check")

    # checking for user's valid bodytype
    def test_recommend_user_attr_bodytype_200(self):
        url = reverse('recommend_all')
        data = {'user_age': 14, 'user_hip': 38, 'user_bust': 33, 'user_waist': 39}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print("Recommendations for user attributes - user's bodytype valid check")

    # checking for user's invalid bodytype
    def test_recommend_user_attr_bodytype_400(self):
        url = reverse('recommend_all')
        data = {'user_age': 17, 'user_hip': 7, 'user_bust': 0, 'user_waist': 3}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        print("Recommendations for user attributes - user's bodytype invalid check")

    # checking for valid selected filters
    def test_recommend_selected_filters_200(self):
        url = reverse('recommend_all')
        data = {'age_group': "Teen", 'body_type': 'Rectangle', 'season': 'Winter'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print("Recommendations for selected filters - valid check")

    # checking for invalid selected filters
    def test_recommend_selected_filters_400(self):
        url = reverse('recommend_all')
        data = {'age_group': "Teen", 'body_type': 123, 'season': 'Winter'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        print("Recommendations for selected filters - invalid check")

    # checking for valid season filter
    def test_recommend_season_filter_200(self):
        url = reverse('recommend_all')
        data = {'age_group': "Teen", 'body_type': 'Rectangle', 'season': 'Winter'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print("Recommendations for season filter - valid check")

    # checking for invalid season filter
    def test_recommend_season_filter_400(self):
        url = reverse('recommend_all')
        data = {'age_group': "Children", 'body_type': "Pear", 'season': 'Rainy'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        print("Recommendations for season filter - invalid check")