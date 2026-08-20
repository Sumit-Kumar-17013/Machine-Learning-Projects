# 💻 Laptop Price Prediction

> An end-to-end Machine Learning project that predicts the price of a laptop based on its hardware specifications.

This project explores laptop pricing using data analysis, visualization, feature preprocessing, multiple regression algorithms, model evaluation, feature importance analysis, and an interactive **Streamlit web application**.

---

## 📌 Project Overview

Laptop prices depend on several hardware specifications such as:

* Brand
* Processor Speed
* RAM
* Storage Capacity
* Screen Size
* Weight

The goal of this project is to build a Machine Learning regression model that learns the relationship between these specifications and laptop prices, and then predicts the expected price of a new laptop.

The project compares multiple regression algorithms and selects the best-performing model for deployment.

---

# 🎯 Objectives

The main objectives of this project are:

* Perform Exploratory Data Analysis (EDA)
* Understand laptop-price distributions
* Analyze relationships between hardware specifications and price
* Check missing values
* Check duplicate records
* Clean and transform the dataset
* Encode categorical features
* Scale numerical features
* Build Machine Learning pipelines
* Train multiple regression models
* Compare model performance
* Analyze feature importance
* Save the trained model using Joblib
* Build an interactive Streamlit application
* Predict laptop prices from user input

---

# 📊 Dataset

The project uses a dataset named:

```text
Laptop_price.csv
```

The dataset contains laptop specifications and their corresponding prices.

## Features

| Feature            | Description            |
| ------------------ | ---------------------- |
| `Brand`            | Laptop manufacturer    |
| `Processor_Speed`  | Processor speed in GHz |
| `RAM_Size`         | RAM capacity in GB     |
| `Storage_Capacity` | Storage capacity in GB |
| `Screen_Size`      | Screen size in inches  |
| `Weight`           | Laptop weight in kg    |
| `Price`            | Target laptop price    |

---

# 🔍 Exploratory Data Analysis

The project performs several exploratory analysis operations using **Pandas, Matplotlib, and Seaborn**.

### EDA includes:

* Dataset inspection
* `head()`
* `info()`
* `describe()`
* Missing-value checking
* Duplicate checking
* Column inspection
* Distribution analysis
* Brand-wise price analysis
* RAM vs price analysis
* Correlation analysis
* Boxplots
* Violin plots
* Histograms
* Feature relationships

---

# 🧹 Data Cleaning

## Storage Capacity Normalization

The dataset contains a storage value of `1000 GB`, which was converted to `1024 GB` for consistency.

```python
df['Storage_Capacity'] = df['Storage_Capacity'].replace(1000, 1024)
```

This makes storage-capacity values more consistent with common storage specifications.

---

# 📈 Data Visualization

Several visualizations were created to understand the dataset.

### 1. Feature Distributions

Histograms were created for:

* Processor Speed
* RAM Size
* Storage Capacity
* Screen Size
* Weight
* Price

### 2. Brand vs Price

The project analyzes how laptop prices vary between different brands.

### 3. Brand and RAM vs Price

A bar plot was used to understand the relationship between:

```text
Brand
RAM Size
Price
```

### 4. Violin Plot

Violin plots were used to visualize price distributions across laptop brands.

### 5. Correlation Heatmap

A correlation heatmap was created for numerical features.

### 6. Boxplots

Boxplots were created to identify the distribution and potential outliers in:

* Processor Speed
* RAM
* Storage
* Screen Size
* Weight
* Price

---

# 🔤 Feature Preprocessing

The project uses a `ColumnTransformer` for preprocessing.

## Categorical Feature

```text
Brand
```

The categorical feature is transformed using:

```python
OneHotEncoder(
    drop='first',
    handle_unknown='ignore'
)
```

## Numerical Features

```text
Processor_Speed
RAM_Size
Storage_Capacity
Screen_Size
Weight
```

Numerical features are standardized using:

```python
StandardScaler()
```

---

# ⚙️ Preprocessing Pipeline

The preprocessing workflow is:

```text
Raw Data
   ↓
Categorical Encoding
   ↓
Numerical Standardization
   ↓
Transformed Features
   ↓
Machine Learning Model
```

Using a `Pipeline` and `ColumnTransformer` helps keep preprocessing consistent during both training and prediction.

---

# ✂️ Train-Test Split

The dataset was divided into training and testing data using:

```python
train_test_split(
    x,
    y,
    test_size=0.2,
    random_state=42
)
```

This means:

* **80% → Training data**
* **20% → Testing data**

The target variable is:

```text
Price
```

---

# 🤖 Machine Learning Models

Four regression algorithms were evaluated.

---

## 1. 📉 Linear Regression

Linear Regression was used as the baseline regression model.

```python
LinearRegression(
    fit_intercept=True,
    copy_X=True,
    positive=False
)
```

### Performance

| Metric   |  Score |
| -------- | -----: |
| MAE      | 170.44 |
| RMSE     | 213.47 |
| R² Score | 0.9995 |

---

# 2. 🌳 Decision Tree Regressor

A Decision Tree Regressor was trained to capture nonlinear relationships between laptop specifications and price.

```python
DecisionTreeRegressor(
    criterion='squared_error',
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    max_features=None,
    random_state=42
)
```

### Performance

| Metric   |  Score |
| -------- | -----: |
| MAE      | 238.65 |
| RMSE     | 293.94 |
| R² Score | 0.9990 |

---

# 3. 🌲 Random Forest Regressor ⭐

Random Forest was trained using multiple decision trees.

```python
RandomForestRegressor(
    n_estimators=100,
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    random_state=42
)
```

### Performance

| Metric   |      Score |
| -------- | ---------: |
| MAE      | **170.11** |
| RMSE     | **205.55** |
| R² Score | **0.9996** |

Random Forest achieved the best overall performance among the evaluated models.

---

# 4. 📐 Support Vector Regression (SVR)

SVR was also tested using an RBF kernel.

```python
SVR(
    kernel='rbf',
    C=100,
    gamma='scale',
    epsilon=0.1
)
```

### Performance

| Metric   |   Score |
| -------- | ------: |
| MAE      | 4803.77 |
| RMSE     | 5854.05 |
| R² Score |    0.62 |

SVR performed significantly worse than the other regression models on this dataset.

---

# 🏆 Model Comparison

| Model             |        MAE |       RMSE |   R² Score |
| ----------------- | ---------: | ---------: | ---------: |
| Linear Regression |     170.44 |     213.47 |     0.9995 |
| Decision Tree     |     238.65 |     293.94 |     0.9990 |
| **Random Forest** | **170.11** | **205.55** | **0.9996** |
| SVR               |    4803.77 |    5854.05 |       0.62 |

## 🥇 Best Model

The final model selected for deployment is:

**Random Forest Regressor**

It achieved:

```text
MAE  → 170.11
RMSE → 205.55
R²   → 0.9996
```

---

# 🔍 Feature Importance

Feature importance was extracted from the trained Random Forest model.

The project uses:

```python
feature_name = pipeline_RFR.named_steps[
    'preprocessing'
].get_feature_names_out()

importance = pipeline_RFR.named_steps[
    'model'
].feature_importances_
```

The top features were visualized using a horizontal bar chart.

The generated visualization is saved as:

```text
Top 10 Feature Importances.png
```

This analysis helps understand which laptop specifications contribute most strongly to price prediction.

---

# 💾 Model Saving

After selecting Random Forest as the final model, the complete pipeline was saved using Joblib.

```python
joblib.dump(
    pipeline_RFR,
    'Laptop.pkl'
)
```

The saved file is:

```text
Laptop.pkl
```

The complete pipeline contains both:

```text
Preprocessing
      +
Random Forest Model
```

This allows the application to directly accept raw user input without manually repeating the preprocessing steps.

---

# 🖥️ Streamlit Web Application

A Streamlit application was created to make the model interactive.

The application loads the trained model:

```python
model = joblib.load('Laptop.pkl')
```

and provides a simple interface for entering laptop specifications.

---

# 🎛️ Streamlit Inputs

The application accepts the following inputs:

### Brand

Available brands:

```text
Dell
Asus
HP
Lenovo
Acer
Apple
```

### Processor Speed

Range:

```text
1.0 GHz → 5.0 GHz
```

### RAM

Range:

```text
4 GB → 32 GB
```

### Storage

Available options:

```text
256 GB
512 GB
1024 GB
```

### Screen Size

Range:

```text
11 inch → 18 inch
```

### Weight

Range:

```text
1 kg → 5 kg
```

These inputs are implemented directly in the Streamlit application.

---

# 🔮 Price Prediction

After entering the laptop specifications, the user clicks:

```text
Predict Price
```

The application creates a Pandas DataFrame:

```python
input_df = pd.DataFrame({
    "Brand": [brand],
    "Processor_Speed": [processor],
    "RAM_Size": [ram],
    "Storage_Capacity": [storage],
    "Screen_Size": [screen],
    "Weight": [weight]
})
```

The trained model then predicts the laptop price.

The result is displayed as:

```text
Predicted Laptop Price: ₹ XX,XXX.XX
```

The application also displays a Streamlit success message and balloons animation after prediction.

---

# 🔄 Complete Project Workflow

```text
Laptop Dataset
      ↓
Data Loading
      ↓
Data Inspection
      ↓
Missing Value Check
      ↓
Duplicate Check
      ↓
Data Cleaning
      ↓
Exploratory Data Analysis
      ↓
Visualization
      ↓
Feature Engineering
      ↓
One-Hot Encoding
      ↓
Standard Scaling
      ↓
Train-Test Split
      ↓
Multiple Regression Models
      ↓
Model Evaluation
      ↓
Model Comparison
      ↓
Random Forest Selection
      ↓
Feature Importance
      ↓
Save Model with Joblib
      ↓
Streamlit Application
      ↓
Laptop Price Prediction
```

---

# 🗂️ Project Structure

```text
Laptop-Price-Prediction/
│
├── Laptop Price.ipynb
├── Laptop_price.csv
├── Laptop.pkl
├── app.py
├── Top 10 Feature Importances.png
├── requirements.txt
└── README.md
```

### File Description

| File                             | Description                        |
| -------------------------------- | ---------------------------------- |
| `Laptop Price.ipynb`             | Complete Machine Learning workflow |
| `Laptop_price.csv`               | Laptop dataset                     |
| `Laptop.pkl`                     | Trained Random Forest pipeline     |
| `app.py`                         | Streamlit prediction application   |
| `Top 10 Feature Importances.png` | Feature importance visualization   |
| `requirements.txt`               | Required Python libraries          |
| `README.md`                      | Project documentation              |

---

# 🛠️ Technologies Used

## Programming Language

* Python 🐍

## Data Analysis

* Pandas
* NumPy

## Data Visualization

* Matplotlib
* Seaborn

## Machine Learning

* Scikit-learn

## Model Persistence

* Joblib

## Web Application

* Streamlit

---

# 📦 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
```

## 2. Enter the Project Directory

```bash
cd Laptop-Price-Prediction
```

## 3. Create a Virtual Environment

```bash
python -m venv venv
```

## 4. Activate the Environment

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

## 5. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# ▶️ Run the Streamlit Application

Make sure the following files are in the same directory:

```text
app.py
Laptop.pkl
```

Then run:

```bash
streamlit run app.py
```

The application will open in your browser.

---

# 📋 Example

Suppose the user selects:

```text
Brand            → Dell
Processor Speed  → 3.5 GHz
RAM              → 16 GB
Storage          → 512 GB
Screen Size      → 15 inch
Weight           → 2 kg
```

The application processes these values through the saved preprocessing pipeline and Random Forest model and returns the predicted laptop price.

---

# 📊 Evaluation Metrics

The project uses three primary regression metrics.

### Mean Absolute Error — MAE

Measures the average absolute difference between actual and predicted prices.

```text
Lower is better
```

### Root Mean Squared Error — RMSE

Penalizes larger prediction errors more heavily.

```text
Lower is better
```

### R² Score

Measures how much variance in the target variable is explained by the model.

```text
Closer to 1 → Better
```

---

# 🚀 Key Results

The best-performing model was:

## 🌲 Random Forest Regressor

```text
MAE  : 170.11
RMSE : 205.55
R²   : 0.9996
```

The model was saved as:

```text
Laptop.pkl
```

and integrated into a Streamlit application for real-time laptop price prediction.

---

# 🌟 Project Highlights

* ✅ Complete regression Machine Learning project
* ✅ Exploratory Data Analysis
* ✅ Data cleaning
* ✅ Duplicate checking
* ✅ Feature transformation
* ✅ One-Hot Encoding
* ✅ Standard Scaling
* ✅ ColumnTransformer
* ✅ Scikit-learn Pipelines
* ✅ Linear Regression
* ✅ Decision Tree Regression
* ✅ Random Forest Regression
* ✅ Support Vector Regression
* ✅ Model comparison
* ✅ MAE evaluation
* ✅ RMSE evaluation
* ✅ R² evaluation
* ✅ Feature importance analysis
* ✅ Joblib model serialization
* ✅ Streamlit deployment
* ✅ Interactive price prediction

---

# ⚠️ Disclaimer

This project is created for **educational and Machine Learning demonstration purposes**.

The predicted price should be considered an estimated value based on the dataset and trained model. Real-world laptop prices can vary depending on market conditions, generation, brand-specific configurations, discounts, availability, taxes, and other factors.

---

# 👨‍💻 Author

**Sumit Kumar**

B.Tech CSE — AI/ML

**Interests:**
Machine Learning • Artificial Intelligence • Python • Data Science

---

# ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub.

Feel free to fork the project, experiment with different regression algorithms, improve the model, and enhance the Streamlit interface.

---

## 📌 Final Project Summary

**Laptop Price Prediction** is an end-to-end Machine Learning regression project that demonstrates how laptop hardware specifications can be used to predict price.

The project covers the complete Machine Learning workflow:

**Data → EDA → Preprocessing → Multiple Regression Models → Evaluation → Model Selection → Feature Importance → Model Saving → Streamlit Application → Price Prediction**
