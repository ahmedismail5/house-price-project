import { useState } from "react";
import "./App.css";

import locations from "./locations.json";
function App() {
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [floor, setFloor] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [balcony, setBalcony] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [transaction, setTransaction] = useState("");
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
  if (
    !location ||
    !area ||
    !floor ||
    !bathroom ||
    !balcony ||
    !furnishing ||
    !transaction
  ) {
    alert("Please fill in all fields.");
    return;
  }

  if (
    Number(area) <= 0 ||
    Number(floor) < 0 ||
    Number(bathroom) <= 0 ||
    Number(balcony) < 0
  ) {
    alert("Please enter valid values.");
    return;
  }
setLoading(true);

  try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location,
          area: Number(area),
          floor_num: Number(floor),
          bathroom_num: Number(bathroom),
          balcony_num: Number(balcony),
          furnishing,
          transaction,
        }),
      });

      const data = await response.json();
      setPrediction(data.predicted_price);
    } catch (error) {
      console.error(error);
      alert("Could not connect to the backend.");
    }
    finally {
  setLoading(false);
}
  };

  return (
    <div className="app">
      <div className="container">
        <h1>House Price Prediction</h1>

        <div className="form-group">
  <label>Location</label>

  <select
    value={location}
    onChange={(e) => setLocation(e.target.value)}
  >
    <option value="">Select location</option>

    {locations.map((loc: string) => (
      <option key={loc} value={loc}>
        {loc}
      </option>
    ))}
  </select>
</div>
        <div className="form-group">
          <label>Area (sqft)</label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter area"
          />
        </div>

        <div className="form-group">
          <label>Floor</label>
          <input
            type="number"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            placeholder="Enter floor"
          />
        </div>

        <div className="form-group">
          <label>Bathrooms</label>
          <input
            type="number"
            value={bathroom}
            onChange={(e) => setBathroom(e.target.value)}
            placeholder="Enter bathrooms"
          />
        </div>

        <div className="form-group">
          <label>Balcony</label>
          <input
            type="number"
            value={balcony}
            onChange={(e) => setBalcony(e.target.value)}
            placeholder="Enter balconies"
          />
        </div>

        <div className="form-group">
          <label>Furnishing</label>
          <select
            value={furnishing}
            onChange={(e) => setFurnishing(e.target.value)}
          >
            <option value="">Select furnishing</option>
            <option value="Furnished">Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div className="form-group">
          <label>Transaction</label>
          <select
            value={transaction}
            onChange={(e) => setTransaction(e.target.value)}
          >
            <option value="">Select transaction</option>
            <option value="Resale">Resale</option>
            <option value="New Property">New Property</option>
            <option value="Other">Other</option>
            <option value="Rent/Lease">Rent/Lease</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <button onClick={handlePredict} disabled={loading}>
  {loading ? "Predicting..." : "Predict Price"}
</button>

        {prediction !== null && (
          <div className="result">
            <h2>Predicted Price: ₹ {prediction.toFixed(2)}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;