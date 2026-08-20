import joblib 
import pandas as pd
import streamlit as st

model = joblib.load('Laptop.pkl')
print("Model Loaded Successfully")

st.set_page_config(
    page_title=("LAPTOP PRICE PREDICTION"),
    page_icon='💻',
    layout='centered'
)

st.title("💻 Laptop Price Prediction")
st.markdown(" Enter laptop specifications and predict its price.")

st.divider()

brand = st.selectbox("Brand" , ['Dell' , 'Asus' , 'HP' , 'Lenovo' , 'Acer' , 'Apple'])
processor = st.slider("Processor Speed (GHz)" , min_value=1.0 , max_value= 5.0 , value= 3.0 , step= 0.1)
ram = st.slider("RAM SIZE (GB)" , min_value= 4 , max_value= 32 , value= 16 , step=4)
storage = st.selectbox("Storage (GB)" , ['256' , '512 ' , '1024'])
screen = st.slider('Screen Size (inch)' , min_value= 11.0 , max_value=18.0 , value= 15.0 , step=1.0)
weight = st.slider("Weight (kg)" , min_value= 1.0 , max_value= 5.0 , value= 3.0 , step=1.0)

st.divider()

if st.button("Predict Price"):

    input_df = pd.DataFrame({
        "Brand": [brand],
        "Processor_Speed": [processor],
        "RAM_Size": [ram],
        "Storage_Capacity": [storage],
        "Screen_Size": [screen],
        "Weight": [weight]
    })

    prediction = model.predict(input_df)[0]

    st.success(
        f"Predicted Laptop Price: ₹ {prediction: ,.2f}"
    )

    st.balloons()