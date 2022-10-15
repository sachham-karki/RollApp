import React from "react";
import { pieChartData } from "../../data/dummy";
import { Header, Charts as PieChart } from "../../components";

const Charts = () => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <Header category="Pie-Chart" title="Live View" />
    <div className="w-full">
      <PieChart
        id="Company Overview"
        data={pieChartData}
        legendVisibility={true}
        height="full"
      />
    </div>
  </div>
);

export default Charts;
