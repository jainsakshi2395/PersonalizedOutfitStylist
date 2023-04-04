import tensorflow
from keras.utils import load_img
from keras.utils import img_to_array
from keras.layers import GlobalMaxPooling2D
from keras.applications.resnet import ResNet50, preprocess_input
import numpy as np
from numpy.linalg import norm
import os
from tqdm import tqdm
import pickle

model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
model.trainable = False

model = tensorflow.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])


def extract_features(img_path, model):
    img = load_img(img_path, target_size=(224, 224))
    img_array = img_to_array(img)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)

    return normalized_result


path = '\Users\simra\Desktop\Pickle\images' # drive 255 images folder

# print(os.listdir(path))

filenames = []

for file in os.listdir(path):
    filenames.append(os.path.join(path, file))

# print(len(filenames))
# print(filenames[0:5])

feature_list = []

for file in tqdm(filenames):
    feature_list.append(extract_features(file, model))

# print(np.array(feature_list).shape)
pickle.dump(feature_list, open('embeddings.pkl', 'wb'))
pickle.dump(filenames, open('filenames.pkl', 'wb'))
