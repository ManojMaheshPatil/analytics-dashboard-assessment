import React, { useEffect, useState } from "react";

const EVComparison = ({ data }) => {
  const [comparisonData, setComparisonData] = useState({ PHEV: {}, BEV: {} });

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
        // Safely extract the values from the row, defaulting to empty strings or 0
        const ElectricVehicleType = row.ElectricVehicleType || "";
        const ElectricRange = parseFloat(row.ElectricRange) || 0;
        const BaseMSRP = parseFloat(row.BaseMSRP) || 0;
        const CleanAlternativeFuelVehicle =
          row.CleanAlternativeFuelVehicle || "";

        // Check for PHEV
        if (
          ElectricVehicleType.includes("Plug-in Hybrid Electric Vehicle (PHEV)")
        ) {
          comparison.PHEV.count += 1;
          comparison.PHEV.totalRange += ElectricRange;
          comparison.PHEV.totalMSRP += BaseMSRP;
          if (
            CleanAlternativeFuelVehicle.includes(
              "Clean Alternative Fuel Vehicle Eligible"
            )
          ) {
            comparison.PHEV.eligibleCount += 1;
          }
        }
        // Check for BEV
        else if (
          ElectricVehicleType.includes("Battery Electric Vehicle (BEV)")
        ) {
          comparison.BEV.count += 1;
          comparison.BEV.totalRange += ElectricRange;
          comparison.BEV.totalMSRP += BaseMSRP;
          if (
            CleanAlternativeFuelVehicle.includes(
              "Clean Alternative Fuel Vehicle Eligible"
            )
          ) {
            comparison.BEV.eligibleCount += 1;
          }
        }
      });

      // Calculate averages
      setComparisonData({
        PHEV: {
          averageRange:
            (comparison.PHEV.totalRange / comparison.PHEV.count).toFixed(2) ||
            0,
          averageMSRP:
            (comparison.PHEV.totalMSRP / comparison.PHEV.count).toFixed(2) || 0,
          eligibleCount: comparison.PHEV.eligibleCount,
          totalCount: comparison.PHEV.count,
        },
        BEV: {
          averageRange:
            (comparison.BEV.totalRange / comparison.BEV.count).toFixed(2) || 0,
          averageMSRP:
            (comparison.BEV.totalMSRP / comparison.BEV.count).toFixed(2) || 0,
          eligibleCount: comparison.BEV.eligibleCount,
          totalCount: comparison.BEV.count,
        },
      });
    }
  }, [data]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Comparison of PHEVs and BEVs
      </h2>
      <table className="min-w-full bg-gray-800 border border-gray-600 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-700 text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Type</th>
            <th className="py-3 px-6 text-right">Count</th>
            <th className="py-3 px-6 text-right">Average Range (miles)</th>
            <th className="py-3 px-6 text-right">Average MSRP ($)</th>
            <th className="py-3 px-6 text-right">Eligible for Incentives</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-600">
            <td className="py-3 px-6 text-left text-white">PHEV</td>
            <td className="py-3 px-6 text-right text-white">
              {comparisonData.PHEV.totalCount}
            </td>
            <td className="py-3 px-6 text-right text-white">
              {comparisonData.PHEV.averageRange} miles
            </td>
            <td className="py-3 px-6 text-right text-white">
              ${comparisonData.PHEV.averageMSRP}
            </td>
            <td className="py-3 px-6 text-right text-white">
              {comparisonData.PHEV.eligibleCount} out of{" "}
              {comparisonData.PHEV.totalCount}
            </td>
          </tr>
          <tr className="border-b border-gray-600">
            <td className="py-3 px-6 text-left text-white">BEV</td>
            <td className="py-3 px-6 text-right text-white">
              {comparisonData.BEV.totalCount}
            </td>
            <td className="py-3 px-6 text-right text-white">
              {comparisonData.BEV.averageRange} miles
            </td>
            <td className="py-3 px-6 text-right text-white">
              ${comparisonData.BEV.averageMSRP}
            </td>
            <td className="py-3 px-6 text-right text-white">
              {comparisonData.BEV.eligibleCount} out of{" "}
              {comparisonData.BEV.totalCount}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EVComparison;
