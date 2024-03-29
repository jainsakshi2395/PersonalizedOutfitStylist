# -*- coding: utf-8 -*-
"""Model-season.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1fKb1Nnb1h3_ynTbj1vl73JNSOr0QmynK

# Recommend outfits based on seasons
"""

# import numpy as np
import pandas as pd
import re
import json
# import pickle

path2 = 'https://drive.google.com/uc?id=1ypzPWMt5FqtUYtS0kN_OpXjtYKXZxno9'
num = pd.read_csv(path2, on_bad_lines='skip')
df = num.loc[:, ['link', 'brand', 'title', 'product_type', 'images', 'product_details', 'body']]
df.dropna(inplace=True)

len(df.index)

# cols = ['body']
# df_subset = df.loc[:, cols]
# print(df_subset)

df1 = df
df1['detail_desc'] = df['body'].fillna('') + ' ' + df['product_details'].fillna('')
# df1.head()
# print("df1 printing: ", df1)

# Define the keywords and their associated seasons
keywords = {
    "Summer": ["summer", "cotton", "shorts", "graphic tees", "sneakers", "mini skirts", "sleeveless", "capris"],
    "Winter": ["wollen", "blazers", "blouse", "classy", "sophisticated", "winter", "silk", "long sleeves"],
    "Spring": ["Off-shoulder", "tank top", "midi dresses", "floral", "jeans", "jumpsuit", "three-quarter sleeves",
               "long sleeves"],
    "Fall": ["Turtlenecks", "Sweaters", "Denim", "Midi skirts", "wrap dress", "Maxi dresses"]
}


# Define a function to match keywords to a given text
def match_keywords(text):
    for season, keys in keywords.items():
        for key in keys:
            # Use regular expression to find the keyword in the text column
            pattern = f'\\b{key}\\b'
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return season
    return 'All Season'


# Apply the match_keywords function to the text column of the dataset
df1['season'] = df['detail_desc'].apply(match_keywords)

df['season'] = df['season'].astype(str)

# View the resulting dataframe
# print(df1.head(5))

# print(df1['season'])

# # Convert the DataFrame to JSON format
# json_data = df1.to_json(orient='records')
#
# # Convert the JSON data back to a DataFrame
# df_from_json = pd.read_json(json_data)
#
# # Save the DataFrame to a CSV file
# df_from_json.to_csv('season.csv', index=False)

# print(json_data)

# group the outfits by season and display them
# for season, group in df1.groupby('season'):
#     print(f'Outfits for {season}:')
#     print(group)


def recommend_outfits(season_name):
    # filter the outfits by season
    outfits_db = json.loads(df1.to_json(orient='records'))
    season_outfits = []
    for row in outfits_db:
        if row['season'] == season_name:
            season_outfits.append(row)

    # recommend the outfits
    if not season_outfits:
        print(f'Sorry, we don\'t have any outfits for {season_name} season.')
    else:
        print(f"my output = {season_outfits[:5]}")
        return season_outfits


# recommend_outfits('Summer')

print("Season-based model executed successfully!!")

#
# recommend_outfits('Spring')
#
# recommend_outfits('Fall')

# recommend_outfits('All Season')
