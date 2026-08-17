import streamlit as st
import numpy as np 
import pandas as pd
import pickle

model = pickle.load(open('modle.pkl', 'rb'))  
scale = pickle.load(open('scale.pkl', 'rb'))
columns = pickle.load(open('columns.pkl', 'rb'))  #

st.set_page_config(page_title='Car Price Predictor', layout='wide')
st.title('Car Price Prediction')

#
model_name = st.selectbox("Car Model", [
    "Fiesta", "Focus", "Kuga", "EcoSport", "C-MAX", "Ka+",
    "Mondeo", "B-MAX", "S-MAX", "Grand C-MAX", "Galaxy",
    "Edge", "KA", "Puma", "Tourneo Custom",
    "Grand Tourneo Connect", "Mustang"
])

year = st.number_input('Year', 1990, 2026, 2014)
mileage = st.number_input('Mileage', 0, 200000, 50000)
tax = st.number_input("Tax", 0.0, 500.0, 150.0)
mpg = st.number_input("MPG", 0.0, 100.0, 50.0)
engine_size = st.number_input("Engine Size", 0.5, 5.0, 1.5)

transmission = st.selectbox("Transmission", ["Manual", "Automatic", "Semi-Auto"])
fuel = st.selectbox("Fuel Type", ["Petrol", "Diesel", "Hybrid"])


input_dict = {
    "year": year,
    "mileage": mileage,
    "tax": tax,
    "mpg": mpg,
    "engineSize": engine_size
}

# encoding 
input_dict[f"transmission_{transmission}"] = 1
input_dict[f"fuelType_{fuel}"] = 1
input_dict[f"model_{model_name}"] = 1


input_df = pd.DataFrame([input_dict])

input_df = input_df.reindex(columns=columns, fill_value=0)

# scale
input_scaled = scale.transform(input_df)

if st.button('Predict Price'):
    result = model.predict(input_scaled)

    st.subheader("Estimated Car Price")
    st.success(f"$ {int(result[0]):,}")