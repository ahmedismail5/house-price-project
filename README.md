# House Price Prediction


## Project Overview

A machine learning web application that predicts house prices based on property features such as location, area, floor, bathrooms, balconies, furnishing, and transaction type.


## Features

- Data cleaning and preprocessing
- Exploratory Data Analysis (EDA)
- House price prediction using machine learning
- FastAPI backend for predictions
- React + TypeScript frontend
- Location-based house price prediction



## Technologies Used

- Python 3.11
- Pandas
- NumPy
- Scikit-learn
- FastAPI
- React
- TypeScript
- Vite
- Git and GitHub


## Machine Learning

The project uses a Random Forest Regressor trained on the logarithm of the house price target to reduce the effect of extreme price outliers.

Model evaluation:
- MAE: 619.57
- RMSE: 2442.55
- R²: 0.772


## Project Structure


```text
house-price-project/
├── backend/
│   ├── main.py
│   └── tests/
├── frontend/
│   └── src/
├── house_price_prediction.ipynb
├── feature_columns.json
├── .gitignore
└── README.md
```


واكتب:

```markdown
## How to Run

### Backend
```bash

uvicorn backend.main:app --reload
```
### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Health Check

`GET /health`

### Prediction

`POST /predict`

## Model Files

- `house_price.pkl` is used locally for prediction and is excluded from GitHub because of its large file size.
- `feature_columns.json` contains the model feature columns.
- `frontend/src/locations.json` contains the available locations.