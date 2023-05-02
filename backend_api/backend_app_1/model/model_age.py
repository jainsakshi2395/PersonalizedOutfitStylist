# recommend outfits based on user's age - association rule mining

import numpy as np
import pandas as pd
from django.conf import settings

path1 = 'https://drive.google.com/uc?id=1uTdERhfpCC0dtc-YyXadY9ZoHShJvsDU'
num = pd.read_csv(path1)
df = num.loc[:, ['Age']]
df.columns = ['Age']
df.dropna(inplace=True)
# df.head()


def age_groups(df):
    # Add a new column called 'age_groups'
    df['AgeGroups'] = ''

    # Loop through each row in the dataframe
    for i in range(len(df)):
        # Determine age groups type as - children, teen, adult
        age = df.at[i, 'Age']

        if age >= 1 and age <= 12:
            df.at[i, 'AgeGroups'] = 'Children'
        elif age >= 13 and age <= 17:
            df.at[i, 'AgeGroups'] = 'Teen'
        elif age >= 18 and age < 40:
            df.at[i, 'AgeGroups'] = 'Adult'
        else:
            df.at[i, 'AgeGroups'] = 'Senior Citizen'

    return df

df = age_groups(df)
# df

value_counts = df['AgeGroups'].value_counts()

# print(value_counts)

"""### checking if the count for every age group is valid"""

count_rect = len(df[df['AgeGroups'] == 'Children'])
# print(count_rect)

"""### split the dataset into train and test"""

# import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

X_train, X_test, y_train, y_test = train_test_split(df[['Age']], df['AgeGroups'], test_size=0.2, random_state=42)

clf_age_based = DecisionTreeClassifier()
clf_age_based.fit(X_train, y_train)

y_pred = clf_age_based.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
# print('Accuracy:', accuracy)

# predict the age group of user

input_values = np.array([[22]])

predicted_age_group = clf_age_based.predict(input_values)

# print('Predicted age group:', predicted_age_group)

# predict the age group of user

input_values = np.array([[4]])

predicted_age_group = clf_age_based.predict(input_values)

# print('Predicted age group:', predicted_age_group)

# predict the age group of user

input_values = np.array([[14]])

predicted_age_group = clf_age_based.predict(input_values)

# print('Predicted age group:', predicted_age_group)

"""## Determine which outfits are appropriate for specific age groups:

General notion of outfits specific to age groups are:

Children: t-shirt, jeans, shorts, casual, smock dresses

Teen: trendy, graphic tees, skinny jeans, sneakers, mini dresses

Adult: slacks, heels, skirts, wrap dresses, chic, jumpsuits, midi dresses, sandals, bodycon

Senior Citizen: classy, sophisticated, blazers, trousers, maxi dresses, formals, pencil skirts, shirt dresses, statement jewelry
"""

import pandas as pd

age_groups_dict = {
    "Children": ["t-shirt", "jeans", "shorts", "smock dress", "boys", "girls", "child"],
    "Teen": ["skinny jeans", "graphic tees", "V-neck", "sneakers", "dresses", "Off-shoulder"],
    "Adult": ["chic", "Off-shoulder", "Bodycon", "pencil skirt", "blazers", "blouses", "jumpsuits", "tops", "sandals", "mini skirts"],
    "Senior Citizen": ["classy", "sophisticated", "kurta", "peplum", "trousers", "shirt dress", "formal"]
}


def map_ageGroup_to_dressType(agegrp):
    for key, value in age_groups_dict.items():
        if agegrp == key:
            return value
    return "Unknown"


df["Dresstype"] = df["AgeGroups"].apply(map_ageGroup_to_dressType)

# print(df)
# df.head()

"""### import the sample dataset of images"""

path2 = 'https://drive.google.com/uc?id=1ypzPWMt5FqtUYtS0kN_OpXjtYKXZxno9'
num = pd.read_csv(path2, on_bad_lines='skip')
df1 = num.loc[:, ['title', 'product_type', 'product_details', 'ideal_for', 'type', 'images']]

df1.dropna(inplace=True)
# df1.head()

num_rows = df1.shape[0]

import re

keywords = ['t-shirt', 'jeans', 'shorts', 'smock dress', 'skinny jeans', 'graphic tees', 'V-neck', 'sneakers', 'dresses', 'Off-shoulder',
            'chic', 'Off-shoulder', 'Bodycon', 'pencil skirt', 'blazers', 'blouse', 'jumpsuits', 'sandals', 'mini skirts', 'tops',
            'classy', 'sophisticated', 'peplum', 'trousers', 'shirt dress', 'formal', 'boys', 'girls', 'child', 'kurta', 'dupatta']

keywords = [kw.strip().lower() for kw in keywords]

pattern = '|'.join(keywords)

filtered_df = df1[df1['product_type'].str.contains(pattern, flags=re.IGNORECASE) |
                 df1['product_details'].str.contains(pattern, flags=re.IGNORECASE) |
                 df1['title'].str.contains(pattern, flags=re.IGNORECASE) |
                 df1['ideal_for'].str.contains(pattern, flags=re.IGNORECASE) |
                 df1['images'].str.contains(pattern, flags=re.IGNORECASE) |
                 df1['type'].str.contains(pattern, flags=re.IGNORECASE)]
filtered_df.head()

num_rows = filtered_df.shape[0]
# print('Number of rows in filtered dataframe:', num_rows)

filtered_df.shape[0]

keywords = ['child']

keywords = [kw.strip().lower() for kw in keywords]


pattern = '|'.join(keywords)


filtered_df = df1[df1['product_type'].str.contains(pattern, flags=re.IGNORECASE) |
                 df1['product_details'].str.contains(pattern, flags=re.IGNORECASE) |
                 df1['type'].str.contains(pattern, flags=re.IGNORECASE)]

filtered_df.shape[0]

import pandas as pd

age_groups_dict = {
    "Children": "t-shirt, jeans, shorts, smock dress, child, boys, girls",
    "Teen": "skinny jeans, graphic tees, V-neck, sneakers, dresses, Off-shoulder",
    "Adult": "chic, Off-shoulder, Bodycon, pencil skirt, blazers, blouses, jumpsuits, tops, sandals, mini skirts",
    "Senior Citizen": "classy, sophisticated, kurta, peplum, trousers, shirt dress, formal"
}


dfmap = pd.DataFrame.from_dict(age_groups_dict, orient='index')
dfmap = dfmap.reset_index()
dfmap.columns = ['AgeGroups', 'Dresstypes']


def recommend_age_based_outfits(input_values):
  predicted_age_group = clf_age_based.predict(input_values)
  dress_types = dfmap.loc[dfmap['AgeGroups'] == predicted_age_group[0], 'Dresstypes'].iloc[0]
  keywords = dress_types.split(',')

  keywords = [kw.strip().lower() for kw in keywords]


  pattern = '|'.join(keywords)


  filtered_df = df1[df1['product_type'].str.contains(pattern, flags=re.IGNORECASE) |
                  df1['product_details'].str.contains(pattern, flags=re.IGNORECASE) |
                  df1['type'].str.contains(pattern, flags=re.IGNORECASE)]

  filtered_df = filtered_df.assign(age_group=predicted_age_group[0])
  return filtered_df

num_rows = filtered_df.shape[0]
# print('Number of rows in filtered dataframe:', num_rows)

filtered_df.shape[0]


