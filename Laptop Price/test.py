import streamlit as st
import joblib
model = joblib.load('Laptop.pkl')
print("Model Loaded Successfully")