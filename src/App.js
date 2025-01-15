import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null); // Initial state for the JSON object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    "https://prod-15.westindia.logic.azure.com:443/workflows/c05457a7e4db4b29aacedcc9765f4b6f/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=QdXCDE7FuJH7N6x-cq6GEVinPBq4caP41TW-X8H-lBA";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data); // Save the entire JSON object
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayValues = (data) => {
    if (typeof data !== "object" || data === null) {
      // Base case: if not an object or array, display the value
      return <p>{data}</p>;
    }

    return Object.entries(data).map(([key, value], index) => (
      <div key={index} style={{ marginLeft: "20px" }}>
        <strong>{key}:</strong>
        {typeof value === "object" && value !== null ? (
          displayValues(value) // Recursive call for nested objects/arrays
        ) : (
          <p>{value}</p>
        )}
      </div>
    ));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <h1>Data from Logic App API</h1>
      <div style={{ padding: "10px", border: "1px solid #ccc" }}>
        {displayValues(data)}
      </div>
    </div>
  );
}

export default App;
