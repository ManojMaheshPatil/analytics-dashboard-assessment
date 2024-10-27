import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import ElectricVehicleDistribution from "./ElectricVehicleDistribution";
import AverageElectricRange from "./AverageElectricRange";
import EVComparison from "./EVComparison";
import EVPieChart from "./EVPieChart";
import EVAdoptionByYear from "./EVAdoptionByYear";
import EVRangeTrendLineChart from "./EVRangeTrendLineChart";

const App = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    Papa.parse("/data.csv", {
      download: true,
      header: true,
      complete: (results) => {
        setVehicleData(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }, []);

  const componentMap = {
    "Electric Vehicle Distribution": (
      <ElectricVehicleDistribution data={vehicleData} />
    ),
    "Average Electric Range": <AverageElectricRange data={vehicleData} />,
    "EV Comparison": <EVComparison data={vehicleData} />,
    "EV Pie Chart": <EVPieChart data={vehicleData} />,
    "EV Adoption by Year": <EVAdoptionByYear data={vehicleData} />,
    "EV Range Trend Line Chart": <EVRangeTrendLineChart data={vehicleData} />,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-4">Select a Component to Display</h2>
      <select
        onChange={(e) => setSelectedComponent(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded shadow-md focus:outline-none"
        defaultValue="Choose Component"
      >
        <option disabled>Choose Component</option>
        {Object.keys(componentMap).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <div className="mt-6 w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-lg">
        {selectedComponent && componentMap[selectedComponent]}
      </div>
    </div>
  );
};

export default App;
