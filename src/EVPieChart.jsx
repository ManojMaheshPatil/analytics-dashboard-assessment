import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const EVPieChart = ({ data }) => {
  const [comparisonData, setComparisonData] = useState({
    PHEV: {
      count: 0,
      totalRange: 0,
      totalMSRP: 0,
      eligibleCount: 0,
    },
    BEV: {
      count: 0,
      totalRange: 0,
      totalMSRP: 0,
      eligibleCount: 0,
    },
  });

  useEffect(() => {
    if (data.length > 0) {
      const comparison = {
        PHEV: {
          count: 0,
          totalRange: 0,
          totalMSRP: 0,
          eligibleCount: 0,
        },
        BEV: {
          count: 0,
          totalRange: 0,
          totalMSRP: 0,
          eligibleCount: 0,
        },
      };

      data.forEach((row) => {
        const {
          ElectricVehicleType,
          ElectricRange,
          BaseMSRP,
          CleanAlternativeFuelVehicle,
        } = row;

        // Ensure ElectricVehicleType is defined and is a string
        if (typeof ElectricVehicleType === "string") {
          if (
            ElectricVehicleType.includes(
              "Plug-in Hybrid Electric Vehicle (PHEV)"
            )
          ) {
            comparison.PHEV.count += 1;
            comparison.PHEV.totalRange += parseFloat(ElectricRange) || 0;
            comparison.PHEV.totalMSRP += parseFloat(BaseMSRP) || 0;

            // Check if CleanAlternativeFuelVehicle is defined and is a string
            if (
              typeof CleanAlternativeFuelVehicle === "string" &&
              CleanAlternativeFuelVehicle.includes(
                "Clean Alternative Fuel Vehicle Eligible"
              )
            ) {
              comparison.PHEV.eligibleCount += 1;
            }
          } else if (
            ElectricVehicleType.includes("Battery Electric Vehicle (BEV)")
          ) {
            comparison.BEV.count += 1;
            comparison.BEV.totalRange += parseFloat(ElectricRange) || 0;
            comparison.BEV.totalMSRP += parseFloat(BaseMSRP) || 0;

            if (
              typeof CleanAlternativeFuelVehicle === "string" &&
              CleanAlternativeFuelVehicle.includes(
                "Clean Alternative Fuel Vehicle Eligible"
              )
            ) {
              comparison.BEV.eligibleCount += 1;
            }
          }
        }
      });

      setComparisonData(comparison);
    }
  }, [data]);

  const pieData = [
    { name: "PHEV", value: comparisonData.PHEV.count },
    { name: "BEV", value: comparisonData.BEV.count },
  ];

  const COLORS = ["#8884d8", "#82ca9d"];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">EV Type Distribution</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default EVPieChart;
