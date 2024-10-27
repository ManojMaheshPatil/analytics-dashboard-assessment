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

const ElectricVehicleDistribution = ({ data }) => {
  const [distribution, setDistribution] = useState([]);

  useEffect(() => {
    const countTypes = {};

    data.forEach((vehicle, index) => {
      const { ElectricVehicleType, County } = vehicle;

      if (!ElectricVehicleType || !County) {
        return;
      }

      const type = ElectricVehicleType.includes("BEV") ? "BEV" : "PHEV";

      if (!countTypes[County]) {
        countTypes[County] = { BEV: 0, PHEV: 0 };
      }
      countTypes[County][type]++;
    });

    const distributionArray = Object.keys(countTypes).map((county) => ({
      name: county,
      BEV: countTypes[county].BEV,
      PHEV: countTypes[county].PHEV,
    }));

    setDistribution(distributionArray);
  }, [data]);

  return (
    <div>
      <h2>Electric Vehicle Distribution by County</h2>
      <BarChart width={800} height={400} data={distribution}>
        <XAxis dataKey="name" />
        <YAxis />

        <Tooltip />
        <CartesianGrid strokeDasharray="2 2" />
        <Legend />
        {/* <Bar dataKey="BEV" fill="#8884d8" />
        <Bar dataKey="PHEV" fill="#82ca9d" /> */}

        <Bar dataKey="BEV" fill="#8884d8" minPointSize={5} />
        <Bar dataKey="PHEV" fill="#82ca9d" minPointSize={5} />
      </BarChart>
    </div>
  );
};

export default ElectricVehicleDistribution;
