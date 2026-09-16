from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_predict():
    data = {
        "location": "Mumbai",
        "area": 1000,
        "floor_num": 5,
        "bathroom_num": 2,
        "balcony_num": 1,
        "furnishing": "Semi-Furnished",
        "transaction": "Resale",
    }

    response = client.post("/predict", json=data)

    assert response.status_code == 200
    assert "predicted_price" in response.json()