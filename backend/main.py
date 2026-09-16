from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import joblib
import json
import numpy as np
import pandas as pd


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


BASE_DIR = Path(__file__).resolve().parent.parent

model = joblib.load(BASE_DIR / "house_price.pkl")

with open(BASE_DIR / "feature_columns.json", "r", encoding="utf-8") as f:
    feature_columns = json.load(f)


@app.get("/health")
def health():
    return {"status": "ok"}


class HouseInput(BaseModel):
    location: str
    area: float
    floor_num: float
    bathroom_num: float
    balcony_num: float
    furnishing: str
    transaction: str


@app.post("/predict")
def predict(data: HouseInput):

    input_data = pd.DataFrame([{
        "location": data.location,
        "area": data.area,
        "floor_num": data.floor_num,
        "bathroom_num": data.bathroom_num,
        "balcony_num": data.balcony_num,
        "Furnishing": data.furnishing,
        "Transaction": data.transaction
    }])

    input_data = pd.get_dummies(
        input_data,
        columns=["location", "Furnishing", "Transaction"],
        drop_first=True
    )

    input_data = input_data.reindex(
        columns=feature_columns,
        fill_value=False
    )

    prediction_log = model.predict(input_data)[0]

    prediction = float(np.expm1(prediction_log))

    return {"predicted_price": prediction}