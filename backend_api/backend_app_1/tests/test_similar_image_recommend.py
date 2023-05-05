import os

from PIL import Image
import io
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status


class TestSimilarImageRecommend(APITestCase):

    def test_get_similar_images_200(self):
        print('Running valid test for Similar Image Recommend')
        # Load the test image
        file = open("/Users/sakshijain/Desktop/media/formalshoes.jpeg", "rb")

        # Send a POST request to the API with the image data
        url = reverse('upload-image')
        data = {'file': file}
        response = self.client.post(url, data, format='multipart')

        # Check that the response status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        file.close()

    def test_get_similar_images_bad_request(self):
        print('Running bad request test - pdf not accepted for Similar Image Recommend')
        # Load the test image
        file = open("/Users/sakshijain/Downloads/GuestList - Sheet1.pdf", "rb")

        # Send a POST request to the API with the image data
        url = reverse('upload-image')
        data = {'file': file}
        response = self.client.post(url, data, format='multipart')

        # Check that the response status code is 400 BAD REQUEST
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        file.close()

    def test_get_similar_images_missing_file(self):
        print('Running No file sent test for Similar Image Recommend')
        # Load the test image
        file = open("/Users/sakshijain/Desktop/media/formalshoes.jpeg", "rb")

        # Send a POST request to the API with the image data
        url = reverse('upload-image')
        data = {'image': file}
        response = self.client.post(url, data, format='multipart')

        # Check that the response status code is 400 BAD REQUEST
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        file.close()
