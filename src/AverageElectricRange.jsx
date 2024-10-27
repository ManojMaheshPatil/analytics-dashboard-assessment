import React, { useEffect, useState } from "react";

const AverageElectricRange = ({ data }) => {
  const [averages, setAverages] = useState([]);

  // Function to calculate average electric range by make and model
  useEffect(() => {
    if (data.length > 0) {
      const makeModelRange = {};

      data.forEach((row) => {
        const { Make, Model, ElectricRange } = row;
        const range = parseFloat(ElectricRange);

        if (Make && Model && !isNaN(range)) {
          const key = `${Make} ${Model}`;
          if (!makeModelRange[key]) {
            makeModelRange[key] = { totalRange: 0, count: 0 };
          }
          makeModelRange[key].totalRange += range;
          makeModelRange[key].count += 1;
        }
      });

      const averagesArray = Object.keys(makeModelRange)
        .map((key) => {
          const { totalRange, count } = makeModelRange[key];
          return {
            makeModel: key,
            averageRange: (totalRange / count).toFixed(2),
          };
        })
        .filter((item) => parseFloat(item.averageRange) > 0);

      setAverages(averagesArray);
    }
  }, [data]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Average Electric Range by Make and Model
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border border-gray-600 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Make & Model</th>
              <th className="py-3 px-6 text-right">
                Average Electric Range in miles
              </th>
            </tr>
          </thead>
          <tbody>
            {averages.map((item, index) => (
              <tr
                key={index}
                className={`border-b border-gray-600 ${
                  index % 2 === 0
                    ? "bg-gray-800 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.makeModel}
                </td>
                <td className="py-3 px-6 text-right">
                  {item.averageRange} miles
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AverageElectricRange;
