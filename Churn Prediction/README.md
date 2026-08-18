# 📉 Customer Churn Prediction

A Machine Learning project that predicts whether a customer is likely to leave a company based on customer-related information.

I built this project to practice a classification problem using a real-world customer churn dataset and to understand the complete process from data analysis and preprocessing to model training, evaluation, and saving the trained model.

---

## 📌 About the Project

Customer churn means a customer stops using a company's service.

The goal of this project is to use historical customer data to identify patterns that may indicate whether a customer is likely to churn.

The project focuses on building a Machine Learning classification model that predicts the churn status of a customer.

---

## 🎯 Project Objectives

* Understand the customer churn dataset.
* Perform Exploratory Data Analysis.
* Identify important features related to churn.
* Clean and preprocess the data.
* Convert categorical features into numerical values.
* Train a Machine Learning classification model.
* Evaluate the model.
* Save the trained model for future predictions.

---

## 📊 Dataset

The dataset used in this project is:

```text
Churn_Modelling.csv
```

It contains information about customers and their banking/account-related characteristics.

Some of the important features include:

| Feature           | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `CreditScore`     | Customer's credit score                                |
| `Geography`       | Customer's country/region                              |
| `Gender`          | Customer's gender                                      |
| `Age`             | Customer's age                                         |
| `Tenure`          | Number of years the customer has been with the company |
| `Balance`         | Customer's account balance                             |
| `NumOfProducts`   | Number of products used by the customer                |
| `HasCrCard`       | Whether the customer has a credit card                 |
| `IsActiveMember`  | Whether the customer is an active member               |
| `EstimatedSalary` | Estimated customer salary                              |
| `Exited`          | Target variable indicating whether the customer left   |

### Target Variable

The target variable is:

```text
Exited
```

Where:

```text
0 → Customer stayed
1 → Customer left
```

---

## 🔍 Exploratory Data Analysis

The dataset is explored to understand the relationship between customer characteristics and churn.

The analysis includes:

* Dataset structure
* Missing values
* Duplicate values
* Statistical analysis
* Churn distribution
* Customer age analysis
* Credit score analysis
* Balance analysis
* Geography and churn
* Gender and churn
* Active membership and churn
* Number of products and churn

Data visualization is used to make these relationships easier to understand.

---

## 🛠️ Technologies Used

* Python
* Pandas
* NumPy
* Matplotlib
* Seaborn
* Scikit-learn
* Jupyter Notebook
* Pickle

---

## 🤖 Machine Learning Workflow

The project follows this workflow:

```text
Customer Dataset
       ↓
Data Loading
       ↓
Data Cleaning
       ↓
Exploratory Data Analysis
       ↓
Feature Selection
       ↓
Categorical Encoding
       ↓
Feature Scaling
       ↓
Train/Test Split
       ↓
Model Training
       ↓
Model Evaluation
       ↓
Save Trained Model
       ↓
Future Prediction
```

---

## 📈 Model Evaluation

Since this is a classification problem, the model can be evaluated using metrics such as:

* Accuracy
* Precision
* Recall
* F1 Score
* Confusion Matrix
* ROC-AUC

These metrics help understand how well the model identifies customers who are likely to churn.

---

## 💾 Saved Model

The trained Machine Learning model is saved as:

```text
churn_model.pkl
```

This allows the trained model to be reused without training it again from the beginning.

The saved model can later be connected to an application or API for making predictions on new customer data.

---

## 📁 Project Structure

```text
Churn Prediction/
│
├── Churm_Predict.ipynb
├── Churn_Modelling.csv
├── churn_model.pkl
└── README.md
```

### File Description

| File                  | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `Churm_Predict.ipynb` | Jupyter Notebook containing data analysis, preprocessing, model training, and evaluation |
| `Churn_Modelling.csv` | Dataset used for the project                                                             |
| `churn_model.pkl`     | Saved trained Machine Learning model                                                     |
| `README.md`           | Project documentation                                                                    |

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/Sumit-Kumar-17013/Machine-Learning-Projects.git
```

### 2. Navigate to the project

```bash
cd Machine-Learning-Projects
cd "Churn Prediction"
```

### 3. Install the required libraries

```bash
pip install pandas numpy matplotlib seaborn scikit-learn jupyter
```

### 4. Start Jupyter Notebook

```bash
jupyter notebook
```

Open:

```text
Churm_Predict.ipynb
```

Run the notebook cells in order.

---

## 📚 What I Learned

Through this project, I practiced:

* Working with customer datasets
* Exploratory Data Analysis
* Data cleaning
* Categorical data encoding
* Feature scaling
* Classification problems
* Train/test splitting
* Model evaluation
* Understanding churn-related patterns
* Saving Machine Learning models using Pickle
* Reusing a trained model for future predictions

---

## 🔮 Future Improvements

I would like to improve this project by:

* Comparing multiple classification algorithms
* Performing hyperparameter tuning
* Using cross-validation
* Improving feature engineering
* Handling class imbalance if required
* Building a Streamlit prediction interface
* Creating a FastAPI endpoint
* Connecting the model to an HTML/CSS/JavaScript frontend
* Deploying the complete application

---

## 👨‍💻 Author

**Sumit Kumar**

B.Tech CSE — AI/ML

GitHub:
https://github.com/Sumit-Kumar-17013

---

## ⭐ About This Project

This is one of my Machine Learning projects built while learning and practicing practical Machine Learning.

I am using this repository to keep track of my progress, from smaller Machine Learning experiments to complete projects involving models, APIs, frontend applications, and deployment.

More projects will be added as I continue learning and building.
