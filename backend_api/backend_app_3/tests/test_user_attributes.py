from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status


class TestUserAttributes(APITestCase):
    def setUp(self):
        self.user_data = {
            "user_id": "77cd51e0-6c83-4214-8e66-8dec830b8b09",
            "age": 30,
            "height": 7,
            "bust": 32,
            "hip": 32,
            "waist": 33,
            "name": "Sakshi Unit test"
        }

    def test_create_user_attributes(self):
        url = reverse('measurement-create')
        response = self.client.post(url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user_id'], self.user_data['user_id'])
        self.assertEqual(response.data['age'], self.user_data['age'])
        self.assertEqual(response.data['height'], self.user_data['height'])
        self.assertEqual(response.data['bust'], self.user_data['bust'])
        self.assertEqual(response.data['hip'], self.user_data['hip'])
        self.assertEqual(response.data['waist'], self.user_data['waist'])
        self.assertEqual(response.data['name'], self.user_data['name'])

    def test_get_user_attributes(self):
        url = reverse('get-measurement-by-id', args=[self.user_data['user_id']])
        print(url)
        response = self.client.get(url)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user_id'], self.user_data['user_id'])
        self.assertEqual(response.data['age'], self.user_data['age'])
        self.assertEqual(response.data['height'], self.user_data['height'])
        self.assertEqual(response.data['bust'], self.user_data['bust'])
        self.assertEqual(response.data['hip'], self.user_data['hip'])
        self.assertEqual(response.data['waist'], self.user_data['waist'])
        self.assertEqual(response.data['name'], self.user_data['name'])

    def test_update_user_attributes(self):
        url = reverse('update-measurement-by-id', args=[self.user_data['user_id']])
        update_data = {
            "user_id": "77cd51e0-6c83-4214-8e66-8dec830b8b09",
            "age": 35,
            "height": 165,
            "bust": 92,
            "hip": 97,
            "waist": 72,
            "name": "Update Test"
        }
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user_id'], self.user_data['user_id'])
        self.assertEqual(response.data['age'], update_data['age'])
        self.assertEqual(response.data['height'], update_data['height'])
        self.assertEqual(response.data['bust'], update_data['bust'])
        self.assertEqual(response.data['hip'], update_data['hip'])
        self.assertEqual(response.data['waist'], update_data['waist'])
        self.assertEqual(response.data['name'], self.user_data['name'])
