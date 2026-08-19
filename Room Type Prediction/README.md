🏠 Room Type Prediction

An end-to-end Machine Learning project that predicts the type of room/listing based on property and neighbourhood-related features.









📌 Overview

Room Type Prediction is a Machine Learning application designed to predict the room/listing type from property information provided by the user.

The project follows a complete Machine Learning lifecycle:

Raw Dataset
     ↓
Data Cleaning
     ↓
Exploratory Data Analysis
     ↓
Feature Selection
     ↓
Categorical Encoding
     ↓
Data Preprocessing
     ↓
Model Training
     ↓
Model Evaluation
     ↓
Model Serialization
     ↓
FastAPI Backend
     ↓
Frontend / User Interface
     ↓
Deployment

The main goal of this project was not only to train a Machine Learning model, but to understand how a trained model can be transformed into a real-world prediction application.

🎯 Project Objectives

The major objectives of this project are:

Build a complete Machine Learning classification pipeline.
Clean and preprocess real-world tabular data.
Handle categorical and numerical features.
Convert categorical values into machine-readable features.
Train and evaluate Machine Learning models.
Save the trained model for later inference.
Build an API around the trained model using FastAPI.
Create a user-friendly prediction interface.
Handle unseen categorical values safely.
Prepare the project for deployment.
Organize the complete project professionally for GitHub.
🧠 Machine Learning Problem

This project is a Supervised Machine Learning Classification Problem.

The model learns relationships between property/listing features and the target:

Target

Room Type

The model predicts the room/listing category based on the information supplied by the user.

Example prediction flow:

User Input
   ↓
Property Information
   ↓
Preprocessing
   ↓
Trained ML Model
   ↓
Predicted Room Type
📊 Dataset

The project uses a room/listing dataset containing information about properties and their neighbourhoods.

The dataset contains a mixture of:

Numerical Features

Examples include:

Price
Minimum Nights
Number of Reviews
Reviews per Month
Calculated Host Listings Count
Availability
Other numerical/property-related features
Categorical Features

Examples include:

Neighbourhood
Neighbourhood Group
Room Type
Other categorical property attributes

Note: The exact columns may depend on the version of the dataset used for training.

🔎 Exploratory Data Analysis

Before training the model, the dataset was explored to understand:

Dataset shape
Data types
Missing values
Duplicate records
Numerical distributions
Categorical distributions
Target distribution
Feature relationships
Outliers
Neighbourhood distribution

Typical analysis included:

df.shape
df.info()
df.describe()
df.isnull().sum()
df.duplicated().sum()
df["room_type"].value_counts()

The analysis helped identify which features were useful for prediction and which preprocessing techniques were required.

🧹 Data Preprocessing

Real-world datasets cannot normally be directly passed into a Machine Learning model.

Therefore, several preprocessing steps were performed.

1. Missing Value Handling

Missing values were identified using:

df.isnull().sum()

Depending on the feature, missing values were either removed or appropriately handled.

2. Duplicate Handling

Duplicate records were checked using:

df.duplicated().sum()

Duplicate rows can introduce unnecessary bias into the training process, so they were handled during data cleaning.

3. Feature Selection

Only relevant features were selected for the Machine Learning pipeline.

The purpose was to:

Reduce unnecessary information.
Improve model efficiency.
Reduce noise.
Make inference easier.
Create a cleaner API input structure.
🏘️ Neighbourhood Feature

One important feature used in the project is Neighbourhood.

The dataset contains many different neighbourhood values.

Examples include:

Williamsburg
Bedford-Stuyvesant
Harlem
Bushwick
Upper West Side
Hell's Kitchen
East Village
Upper East Side
Crown Heights
Midtown

These neighbourhood values were incorporated into the prediction workflow.

The application also handles cases where a user enters a neighbourhood that is not present in the known categories.

🔤 Categorical Encoding

Machine Learning algorithms cannot directly understand raw text such as:

Williamsburg
Harlem
Brooklyn
Manhattan

Therefore, categorical features need to be transformed into numerical representations.

Depending on the feature and preprocessing pipeline, techniques such as:

One-Hot Encoding
Label Encoding

can be used.

For categorical features, the project uses preprocessing that can safely handle unseen values during prediction.

A key concept used is:

handle_unknown="ignore"

This prevents the application from crashing when a category appears during inference that was not present during training.

🔢 Numerical Feature Processing

Numerical features can have very different scales.

For example:

Price        → 100
Reviews      → 250
Availability → 365

To make numerical features suitable for Machine Learning algorithms, appropriate preprocessing/scaling can be applied.

This ensures that large-scale numerical values do not unnecessarily dominate smaller-scale features.

🤖 Machine Learning Model

The project uses Scikit-Learn to build the Machine Learning pipeline.

The general workflow is:

Input Features
      ↓
Preprocessor
      ↓
Categorical Encoding
      ↓
Numerical Processing
      ↓
Classifier
      ↓
Room Type Prediction

A pipeline-based approach makes preprocessing and prediction consistent.

🔬 Train/Test Split

The dataset was divided into training and testing sets.

Conceptually:

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
Why?

The training set is used to teach the model.

The testing set is used to evaluate how well the model performs on unseen data.

📈 Model Evaluation

The trained model was evaluated using classification metrics such as:

Accuracy

Measures the overall percentage of correct predictions.

Accuracy =
Correct Predictions / Total Predictions
Precision

Measures how many predicted instances of a class were actually correct.

Recall

Measures how many actual instances of a class were successfully detected.

F1-Score

The harmonic mean of precision and recall.

F1 = 2 × (Precision × Recall)
     --------------------------
       Precision + Recall
Confusion Matrix

A confusion matrix helps visualize:

True Positives
True Negatives
False Positives
False Negatives
💾 Model Serialization

After training, the final preprocessing/model pipeline was saved so that it could be reused without retraining.

The project uses:

joblib

Example:

import joblib

joblib.dump(model, "model.pkl")

Later, the model can be loaded:

model = joblib.load("model.pkl")

This allows the backend application to use the already-trained model for real-time predictions.

⚡ FastAPI Backend

The Machine Learning model was integrated into a FastAPI backend.

FastAPI provides an API layer between the frontend and the Machine Learning model.

Architecture:

Frontend
   │
   │ JSON Request
   ▼
FastAPI
   │
   ▼
Data Validation
   │
   ▼
Preprocessing
   │
   ▼
ML Model
   │
   ▼
Prediction
   │
   ▼
JSON Response
   │
   ▼
Frontend
📡 API Prediction Flow

The frontend sends property information to the backend.

Example structure:

{
    "neighbourhood": "Williamsburg",
    "price": 150,
    "minimum_nights": 2,
    "number_of_reviews": 50
}

The FastAPI backend:

Receives the request.
Validates the input.
Converts the input into the expected format.
Loads the trained model.
Runs preprocessing.
Generates the prediction.
Returns the result as JSON.
🛡️ Input Validation

FastAPI/Pydantic is used to validate incoming user data.

This helps prevent invalid values from reaching the Machine Learning model.

For example:

Invalid numerical input
        ↓
Validation
        ↓
Error Response

instead of allowing invalid data to reach the model.

🌐 Frontend

A user-friendly interface was created so users do not need to interact directly with the API.

The interface allows users to enter property information and receive a predicted room type.

The basic flow is:

Enter Property Details
          ↓
       Predict
          ↓
    API Request
          ↓
   Machine Learning
          ↓
  Prediction Result

The frontend can communicate with the FastAPI backend using HTTP requests.

🎨 User Experience

The application is designed around a simple prediction workflow:

Step 1

User enters the required property information.

Step 2

User clicks the prediction button.

Step 3

The frontend sends the data to the API.

Step 4

The trained model processes the input.

Step 5

The predicted room type is displayed to the user.

🏗️ Project Architecture
                    ROOM TYPE PREDICTION
                           │
          ┌────────────────┴────────────────┐
          │                                 │
      Frontend                          Backend
          │                                 │
          │                             FastAPI
          │                                 │
          │                         Input Validation
          │                                 │
          │                         Preprocessing
          │                                 │
          │                         Trained Model
          │                                 │
          └────────────── API ───────────────┘
                                            │
                                            ▼
                                     Room Type
                                     Prediction
📁 Project Structure

A typical structure of the project is:

Room Type Prediction/
│
├── app.py
├── model.pkl
├── requirements.txt
├── README.md
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── notebooks/
│   └── room_type_prediction.ipynb
│
├── data/
│   └── dataset.csv
│
└── assets/
    └── screenshots/

The exact structure may differ slightly depending on the final deployment setup.

🧪 Local Setup
1. Clone the Repository
git clone https://github.com/Sumit-Kumar-17013/Machine-Learning-Projects.git

Move into the project directory:

cd Machine-Learning-Projects

Then enter the Room Type Prediction project directory.

cd "Room Type Prediction"
🐍 2. Create Virtual Environment

Create a virtual environment:

python -m venv venv

Activate it on Windows PowerShell:

venv\Scripts\Activate.ps1

If you are using Command Prompt:

venv\Scripts\activate
📦 3. Install Dependencies

Install the required packages:

pip install -r requirements.txt

If requirements.txt has not been created yet, the project may require packages such as:

pip install pandas numpy scikit-learn joblib fastapi uvicorn

Install frontend-specific dependencies separately if your final frontend requires them.

🚀 4. Run FastAPI

Start the FastAPI server using:

uvicorn app:app --reload

The API will normally be available at:

http://127.0.0.1:8000

FastAPI's interactive documentation can be accessed from:

http://127.0.0.1:8000/docs
🔍 API Documentation

FastAPI automatically generates interactive API documentation.

Swagger UI
/docs
ReDoc
/redoc

This makes it easy to test API endpoints directly from the browser.

🧪 Testing the Prediction API

The API can be tested using:

Swagger UI
Postman
JavaScript frontend
Python requests
Other HTTP clients

Example:

POST /predict

The API receives the property information and returns the predicted room type.

⚠️ Important Model Compatibility Note

When loading a serialized Scikit-Learn model using Joblib, the environment used for prediction should ideally use a compatible version of Scikit-Learn with the version used during training.

For example:

Training Environment
        ↓
Scikit-Learn Version
        ↓
Joblib Model
        ↓
Prediction Environment

Different Scikit-Learn versions can sometimes cause errors when loading old serialized models.

Therefore, the project should keep its dependencies documented in:

requirements.txt
☁️ Deployment

The project was prepared with deployment in mind.

The architecture can be deployed as:

Frontend
   ↓
Hosted Frontend
   ↓
FastAPI Backend
   ↓
Hosted ML Model

The backend can be deployed on platforms that support Python/FastAPI applications.

The frontend can be deployed separately or served according to the chosen deployment architecture.

🔐 CORS Configuration

Because the frontend and backend may be hosted on different domains, CORS configuration may be required.

FastAPI supports this using:

from fastapi.middleware.cors import CORSMiddleware

Example:

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

For production applications, it is recommended to replace "*" with the actual frontend domain.

🧠 What I Learned From This Project

This project helped me understand much more than simply training a Machine Learning model.

Machine Learning
Supervised Learning
Classification
Feature Selection
Train/Test Split
Model Training
Model Evaluation
Prediction
Data Science
Pandas
NumPy
Data Cleaning
Exploratory Data Analysis
Missing Value Handling
Duplicate Handling
Categorical Data
Numerical Data
Machine Learning Engineering
Scikit-Learn Pipelines
Preprocessing
Encoding
Model Serialization
Joblib
Model Inference
Version Compatibility
Backend Development
FastAPI
REST APIs
Pydantic
JSON
HTTP Requests
CORS
API Testing
Deployment
Git
GitHub
Virtual Environments
Requirements Management
Backend Deployment
Frontend Deployment
💡 Key Challenges Solved

During development, several practical problems were encountered and solved.

1. Categorical Features

Machine Learning models cannot directly process raw categorical strings.

Solution:

Use appropriate encoding and preprocessing pipelines.

2. Unseen Neighbourhoods

A user might enter a neighbourhood that was not present during training.

Solution:

Use preprocessing that supports unknown categories:

handle_unknown="ignore"
3. Model Persistence

The model needs to be available after the application starts.

Solution:

Serialize the trained model using Joblib.

4. Environment Issues

Python packages can behave differently between environments.

Solution:

Use a virtual environment and maintain:

requirements.txt
5. Frontend ↔ Backend Communication

The frontend needs to communicate with the Machine Learning model.

Solution:

Create a FastAPI REST API and send structured JSON requests.

6. Deployment Path Issues

When deploying a project containing separate frontend and backend directories, the deployment platform must be configured with the correct root directory and build/start commands.

This is especially important when multiple projects are stored inside a single GitHub repository.

🔮 Future Improvements

The project can be improved further by adding:

Hyperparameter tuning

Better feature engineering

Cross-validation

Model comparison

Explainable AI

SHAP feature explanations

Confidence/probability scores

Better error handling

Authentication

Database integration

Prediction history

User accounts

Advanced frontend animations

Docker support

CI/CD pipeline

Automated model retraining

Cloud-based ML monitoring

📊 Machine Learning Pipeline

The complete ML pipeline can be summarized as:

                 DATASET
                    │
                    ▼
              DATA CLEANING
                    │
                    ▼
                 EDA
                    │
                    ▼
            FEATURE SELECTION
                    │
                    ▼
           TRAIN / TEST SPLIT
                    │
                    ▼
             PREPROCESSING
              ┌─────┴─────┐
              │           │
         Numerical     Categorical
              │           │
          Scaling       Encoding
              │           │
              └─────┬─────┘
                    ▼
             MODEL TRAINING
                    │
                    ▼
              EVALUATION
                    │
                    ▼
             MODEL SAVING
                    │
                    ▼
               FASTAPI
                    │
                    ▼
               FRONTEND
                    │
                    ▼
              PREDICTION
🌟 Why This Project Matters

This project demonstrates the transition from:

Learning Machine Learning
        ↓
Building a Model
        ↓
Saving the Model
        ↓
Creating an API
        ↓
Connecting a Frontend
        ↓
Deploying the Application

Instead of stopping at a Jupyter Notebook, the project turns the Machine Learning model into a usable application.

That makes it a practical example of Machine Learning Engineering and not just a model-training exercise.

🛠️ Technologies Used
Technology	Purpose
Python	Core programming language
Pandas	Data manipulation
NumPy	Numerical computing
Matplotlib	Data visualization
Seaborn	Statistical visualization
Scikit-Learn	Machine Learning
Joblib	Model serialization
FastAPI	Backend API
Pydantic	Data validation
HTML	Frontend structure
CSS	Frontend styling
JavaScript	Frontend interaction
Git	Version control
GitHub	Source code hosting
Render / Cloud Platform	Deployment
📚 Concepts Covered

This project covers several important concepts:

Python
  ↓
Pandas / NumPy
  ↓
Data Cleaning
  ↓
EDA
  ↓
Feature Engineering
  ↓
Classification
  ↓
Scikit-Learn
  ↓
Preprocessing
  ↓
Pipeline
  ↓
Model Evaluation
  ↓
Joblib
  ↓
FastAPI
  ↓
REST API
  ↓
Frontend Integration
  ↓
Deployment
👨‍💻 Author
Sumit Kumar

B.Tech CSE — Artificial Intelligence & Machine Learning

Interested in:

🤖 Artificial Intelligence
🧠 Machine Learning
📊 Data Science
⚙️ Machine Learning Engineering
🚀 AI Applications
🌐 Backend Development
⭐ Project Goal

The long-term goal of this project is to demonstrate the ability to take a Machine Learning idea from:

Dataset → Model → API → Application → Deployment

and build a complete, practical Machine Learning product.

⭐ If You Like This Project

If you found this project useful:

⭐ Star the repository
🍴 Fork the repository
🐛 Report issues
💡 Suggest improvements
🤝 Contribute to the project
📜 License

This project is created for educational and learning purposes.

You are free to explore, modify, and improve the project for your own learning and development.

<div align="center">

🏠 Room Type Prediction

From Machine Learning Model → Real-World Application 🚀

Made with ❤️ by Sumit Kumar

</div>
