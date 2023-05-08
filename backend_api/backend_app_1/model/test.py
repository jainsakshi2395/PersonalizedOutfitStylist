import pickle
import numpy as np
import tensorflow
from keras.utils import load_img
from keras.utils import img_to_array
from keras.layers import GlobalMaxPooling2D
from keras.applications.resnet import ResNet50, preprocess_input
from numpy.linalg import norm
from sklearn.neighbors import NearestNeighbors

import cv2

# feature_list = np.array(pickle.load(open('/home/ubuntu/masters-project-v2-testing/data/embeddings.pkl', 'rb')))  # path to AWS EC2

feature_list = np.array(pickle.load(open('\Users\simra\Desktop\Pickle\embeddings.pkl', 'rb')))
# feature_list = np.array(pickle.load(open('/Users/supreetha/Documents/Pickle/embeddings.pkl', 'rb')))

# print(feature_list.shape)

# filenames = pickle.load(open('/home/ubuntu/masters-project-v2-testing/data/filenames.pkl', 'rb'))   # path to AWS EC2

filenames = pickle.load(open('\Users\simra\Desktop\Pickle\filenames.pkl', 'rb'))
# filenames = pickle.load(open('/Users/supreetha/Documents/Pickle/filenames.pkl', 'rb'))

model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
model.trainable = False

model = tensorflow.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])

# img_path = '/home/ubuntu/masters-project-v2-testing/backend_app_1/sample/watch.jpg'   # path to AWS EC2

img_path = '\Users\simra\PycharmProjects\PersonalizedOutfitStylist\backend_api\backend_app_1\sample' \
           '\watch.jpg'
# img_path = '/Users/supreetha/Documents/PersonalizedOutfitStylist/backend_api/backend_app_1/sample/watch.jpg'

img = load_img(img_path, target_size=(224, 224))
img_array = img_to_array(img)
expanded_img_array = np.expand_dims(img_array, axis=0)
preprocessed_img = preprocess_input(expanded_img_array)
result = model.predict(preprocessed_img).flatten()
normalized_result = result / norm(result)

neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
neighbors.fit(feature_list)

distances, indices = neighbors.kneighbors([normalized_result])

print(indices)

for file in indices[0][1:6]:
    temp_img = cv2.imread(filenames[file])
    print(filenames[file])
    print(file)
    #cv2.imshow('output', cv2.resize(temp_img, (512, 512)))
    #cv2.waitKey(0)

