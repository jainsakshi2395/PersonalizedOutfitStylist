import numpy as np
import pickle

EMBEDDED_FEATURES_FILE_PATH = '/Users/sakshijain/Desktop/CMPE295B/embeddings.pkl'
FILENAMES_PATH = '/Users/sakshijain/Desktop/CMPE295B/filenames.pkl'

FEATURE_LIST = np.array(pickle.load(open(EMBEDDED_FEATURES_FILE_PATH, 'rb')))
FILENAMES = pickle.load(open(FILENAMES_PATH,'rb'))

IMG_FOLDER_PATH = '/Users/sakshijain/Desktop/CMPE295B/PersonalizedOutfitStylist/backend_api/media'
