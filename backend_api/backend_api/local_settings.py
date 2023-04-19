import numpy as np
import pickle


## mentioned below path formats depending upon the OS for local testing

#EMBEDDED_FEATURES_FILE_PATH = r'C:\Users\simra\Desktop\Pickle\embeddings.pkl'  # windows
EMBEDDED_FEATURES_FILE_PATH = '/Users/sakshijain/Desktop/CMPE295B/embeddings.pkl'   # mac

#FILENAMES_PATH = r'C:\Users\simra\Desktop\Pickle\filenames.pkl'  # windows
FILENAMES_PATH = '/Users/sakshijain/Desktop/CMPE295B/filenames.pkl'   #mac

FEATURE_LIST = np.array(pickle.load(open(EMBEDDED_FEATURES_FILE_PATH, 'rb')))
FILENAMES = pickle.load(open(FILENAMES_PATH,'rb'))

# IMG_FOLDER_PATH = r'C:\Users\simra\PycharmProjects\PersonalizedOutfitStylist\backend_api\media'  # windows
IMG_FOLDER_PATH = '/Users/sakshijain/Desktop/CMPE295B/PersonalizedOutfitStylist/backend_api/media'   #mac

BODY_MEASUREMENT_CSV = '/Users/sakshijain/Desktop/CMPE295B/BodyMeasurements.csv'
SAMPLE_OUTFIT_CSV = '/Users/sakshijain/Desktop/CMPE295B/sample_outfits.csv'
