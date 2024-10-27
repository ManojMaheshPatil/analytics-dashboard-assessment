import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EVRangeTrendLineChart = ({ data }) => {
  const [rangeData, setRangeData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const yearRangeMap = {};

      data.forEach((row) => {
        const { ModelYear, ElectricRange } = row;
        const range = parseFloat(ElectricRange);

        if (ModelYear && !isNaN(range)) {
          if (!yearRangeMap[ModelYear]) {
            yearRangeMap[ModelYear] = {
              year: ModelYear,
              totalRange: 0,
              count: 0,
            };
          }
          yearRangeMap[ModelYear].totalRange += range;
          yearRangeMap[ModelYear].count += 1;
        }
      });

      const sortedRangeData = Object.values(yearRangeMap)
        .map(({ year, totalRange, count }) => ({
          year,
          avgRange: totalRange / count,
        }))
        .sort((a, b) => a.year - b.year);

      setRangeData(sortedRangeData);
    }
  }, [data]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        EV Range Trends by Model Year
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={rangeData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{
              value: "Model Year",
              position: "insideBottomRight",
              offset: -10,
            }}
          />
          <YAxis
            label={{
              value: "Average Electric Range (miles)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="avgRange"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EVRangeTrendLineChart;
