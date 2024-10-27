import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const EVAdoptionByYear = ({ data }) => {
  const [adoptionData, setAdoptionData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const yearCounts = {};

      data.forEach((row) => {
        const { ModelYear, ElectricVehicleType } = row;

        if (ModelYear) {
          if (!yearCounts[ModelYear]) {
            yearCounts[ModelYear] = { BEV: 0, PHEV: 0 };
          }
          if (ElectricVehicleType.includes("Battery Electric Vehicle (BEV)")) {
            yearCounts[ModelYear].BEV += 1;
          } else if (
            ElectricVehicleType.includes(
              "Plug-in Hybrid Electric Vehicle (PHEV)"
            )
          ) {
            yearCounts[ModelYear].PHEV += 1;
          }
        }
      });

      const sortedAdoptionData = Object.entries(yearCounts)
        .map(([year, counts]) => ({ year, ...counts }))
        .sort((a, b) => a.year - b.year);

      setAdoptionData(sortedAdoptionData);
    }
  }, [data]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        EV Adoption Trends by Model Year
      </h2>
      <BarChart
        width={600}
        height={400}
        data={adoptionData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="BEV" fill="#8884d8" />
        <Bar dataKey="PHEV" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default EVAdoptionByYear;
