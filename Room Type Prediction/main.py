from fastapi import FastAPI , HTTPException
import pandas as pd
import numpy as np
from typing import Literal
from pydantic import BaseModel , Field
from fastapi.middleware.cors import CORSMiddleware
import joblib

model = joblib.load('room_type_xgboost_pipeline.joblib')


label_encoder = joblib.load("room_type_label_encoder.joblib")

app = FastAPI(
    title="Room Type Prediction API",
    description="XGBoost based Airbnb Room Type Prediction API",
    version="1.0.0"
)

##cros 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)


class Features(BaseModel):
    latitude: float = Field(..., ge=-90, le=90, description="Latitude coordinate")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude coordinate")
    price: float = Field(..., gt=0, description="Price per night, must be positive")
    minimum_nights: int = Field(..., ge=1, le=365, description="Minimum nights required for booking")
    number_of_reviews: int = Field(..., ge=0, description="Total number of reviews")
    reviews_per_month: float = Field(..., ge=0, description="Average reviews per month")
    calculated_host_listings_count: int = Field(..., ge=0, description="Number of listings by this host")
    availability_365: int = Field(..., ge=0, le=365, description="Days available out of 365")
    neighbourhood_group: Literal["Bronx","Brooklyn","Manhattan","Queens","Staten Island"]
    neighbourhood: str = Field(..., min_length=1, description="Select a neighbourhood from the available options")



@app.get('/')
def Home():
    return{
        "message": "Room Type Prediction API",
        "status": "Running",
        "model": "Tuned XGBoost",
        "endpoint": "/predict",
        "documentation": "/docs"
    }


@app.get("/health")
def Health():
    return{
        "Status" : "Running",
        "Model" : "XGBOOST Classifier With Best HyperParameter Tuning",
        "model_type" : "Tuned XGBoost",
        "status_code" : 200
    }    


@app.post('/predict')
def predict(features: Features):

    try:
        row = pd.DataFrame([{
            "latitude": features.latitude,
            "longitude": features.longitude,
            "price": features.price,
            "minimum_nights_log": np.log1p(features.minimum_nights),
            "number_of_reviews": features.number_of_reviews,
            "reviews_per_month_log": np.log1p(features.reviews_per_month),
            "calculated_host_listings_count":features.calculated_host_listings_count,
            "availability_365":features.availability_365,
            "neighbourhood_group":features.neighbourhood_group,
            "neighbourhood": features.neighbourhood
        }])

        prediction = model.predict(row)

        prediction_label = label_encoder.inverse_transform(prediction.astype(int))[0]

        probability = model.predict_proba(row)[0]
        probability_percent = probability * 100
        class_names = label_encoder.classes_

        probability_result = {
        class_names[i]: round(float(probability_percent[i]), 2)
        for i in range(len(class_names))
        }

        return {
            "Predicted_room_type": prediction_label,
            "Probability": probability_result
        }

    except Exception as e:
        raise HTTPException(
            status_code = 500,
            detail = f"Predicition Failed {(e)}"
        )