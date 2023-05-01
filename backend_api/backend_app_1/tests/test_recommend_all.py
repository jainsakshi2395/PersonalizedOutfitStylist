# import pytest
from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse


class TestRecommendAll(APITestCase):
    def test_recommend_user_attr_200(self):
        url = reverse('recommend_all')
        data = {'user_age': 14, 'user_hip': 7, 'user_bust': 7, 'user_waist': 3}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print("Recommendations for user attributes - valid inputs")

    def test_recommend_user_attr_400(self):
        url = reverse('recommend_all')
        data = {'user_age': "fourteen", 'user_hip': 7, 'user_bust': 5, 'user_waist': 3}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        print("Recommendations for user attributes - invalid inputs")

    def test_recommend_user_attr_age_200(self):
        url = reverse('recommend_all')
        data = {'user_age': 5, 'user_hip': 7, 'user_bust': 7, 'user_waist': 3}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print("Recommendations for user attributes - user's age valid check")


    def test_recommend_user_attr_age_400(self):
        url = reverse('recommend_all')
        data = {'user_age': "three", 'user_hip': 7, 'user_bust': 7, 'user_waist': 3}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        print("Recommendations for user attributes - user's age invalid check")

    def test_recommend_user_attr_bodytype_200(self):
        url = reverse('recommend_all')
        data = {'user_age': 14, 'user_hip': 7, 'user_bust': 7, 'user_waist': 3}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print("Recommendations for user attributes - user's physical parameters valid check")

    def test_recommend_user_attr_bodytype_400(self):
        url = reverse('recommend_all')
        data = {'user_age': 17, 'user_hip': 7, 'user_bust': 0, 'user_waist': 3}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        print("Recommendations for user attributes - user's physical parameters invalid check")


    def test_recommend_selected_filters_200(self):
        url = reverse('recommend_all')
        data = {'age_group': "Teen", 'body_type': 'Rectangle', 'season': 'winter'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print("Recommendations for selected filters - valid check")

    def test_recommend_selected_filters_400(self):
        url = reverse('recommend_all')
        data = {'age_group': "Teen", 'body_type': 123, 'season': 'winter'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        print("Recommendations for selected filters - invalid check")
