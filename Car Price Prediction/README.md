# 🚗 Car Price Prediction

A Machine Learning project for predicting car prices using data related to different car features.

I built this project while learning and practicing the complete Machine Learning workflow — from data analysis and preprocessing to model training, evaluation, and creating a simple prediction application.

## 📌 About the Project

The main goal of this project is to predict the price of a car based on the available features in the dataset.

The project includes:

* Data analysis
* Data preprocessing
* Exploratory Data Analysis
* Feature selection
* Machine Learning model training
* Model evaluation
* Saving the trained model
* Building a prediction application

The trained model and preprocessing objects are saved using Pickle so they can be used later in the application.

---

## 📊 Dataset

The project uses a car dataset containing information about different cars and their prices.

The main dataset used in this project is:

```text
ford.csv
```

The dataset is used for training and testing the Machine Learning model.

---

## 🛠️ Technologies Used

* Python
* Pandas
* NumPy
* Matplotlib
* Seaborn
* Scikit-learn
* Pickle
* Jupyter Notebook
* Streamlit

---

## 🔍 Machine Learning Workflow

The project follows a basic end-to-end Machine Learning workflow:

```text
Dataset
   ↓
Data Loading
   ↓
Data Cleaning
   ↓
Exploratory Data Analysis
   ↓
Feature Selection
   ↓
Data Preprocessing
   ↓
Train/Test Split
   ↓
Model Training
   ↓
Model Evaluation
   ↓
Save Model
   ↓
Prediction Application
```

---

## 📈 Exploratory Data Analysis

Before training the model, the dataset is explored to understand:

* Data types
* Missing values
* Duplicate values
* Feature distributions
* Relationships between features
* Price distribution
* Important features affecting car prices

Python libraries such as Pandas, Matplotlib, and Seaborn are used for this part.

---

## 🤖 Model

A Machine Learning regression model is trained to predict the price of a car.

The trained model is saved as:

```text
modle.pkl
```

The preprocessing information is also saved so that the same transformations can be applied when making predictions.

```text
columns.pkl
scale.pkl
```

---

## 📁 Project Structure

```text
Car Price Prediction/
│
├── Car Predict.ipynb
├── app.py
├── ford.csv
├── columns.pkl
├── modle.pkl
├── scale.pkl
└── README.md
```

### File Description

| File                | Description                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------- |
| `Car Predict.ipynb` | Jupyter Notebook containing data analysis, preprocessing, model training, and evaluation |
| `app.py`            | Application used for making car price predictions                                        |
| `ford.csv`          | Dataset used for the project                                                             |
| `columns.pkl`       | Saved feature/column information used during prediction                                  |
| `modle.pkl`         | Saved trained Machine Learning model                                                     |
| `scale.pkl`         | Saved scaler used during preprocessing                                                   |
| `README.md`         | Project documentation                                                                    |

---

## 🚀 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/Sumit-Kumar-17013/Machine-Learning-Projects.git
```

### 2. Go to the project

```bash
cd Machine-Learning-Projects
cd "Car Price Prediction"
```

### 3. Install dependencies

If a `requirements.txt` file is available:

```bash
pip install -r requirements.txt
```

Otherwise, install the main libraries:

```bash
pip install pandas numpy matplotlib seaborn scikit-learn streamlit
```

### 4. Run the application

```bash
streamlit run app.py
```

The application will open in your browser.

---

## 🧪 Running the Notebook

To explore the complete Machine Learning process:

```bash
jupyter notebook
```

Then open:

```text
Car Predict.ipynb
```

Run the notebook cells in order.

---

## 💾 Saved Model Files

The project saves the trained Machine Learning components so that the application does not need to train the model every time.

```text
modle.pkl
columns.pkl
scale.pkl
```

These files are loaded by the application during prediction.

---

## 📚 What I Learned

While building this project, I practiced:

* Working with real-world datasets
* Data cleaning
* Exploratory Data Analysis
* Data visualization
* Feature preprocessing
* Regression problems
* Train/test splitting
* Model training
* Model evaluation
* Saving Machine Learning models
* Loading saved models
* Building a simple ML application with Streamlit

---

## 🔮 Future Improvements

Some things I can improve in this project:

* Compare more regression algorithms
* Improve feature engineering
* Perform hyperparameter tuning
* Add more evaluation metrics
* Improve the Streamlit interface
* Add better input validation
* Deploy the application
* Improve prediction performance

---

## 👨‍💻 Author

**Sumit Kumar**

B.Tech CSE — AI/ML

GitHub:
https://github.com/Sumit-Kumar-17013

---

## ⭐ About This Project

This is one of my Machine Learning projects created as part of my learning and practical development.

I am continuously adding new projects to this repository as I learn more about Machine Learning, AI, backend development, APIs, and deployment.
