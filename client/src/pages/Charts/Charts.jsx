import React from "react";
import { pieChartData } from "../../data/dummy";
import {
  Header,
  Charts as PieChart,
  Questions,
  SpinWheel,
} from "../../components";

import { quesList } from "../../components/charts/Questions";

const car = ["a", "b", "d"];
const Charts = () => (
  <>
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <div>
        <Header category="Pie-Chart" title="Live View" />
        <div className="w-full mb-20">
          <div className=" grid grid-cols-1 gap-4 place-items-center mt-8">
            <PieChart
              id="Company Overview"
              data={pieChartData}
              legendVisibility={true}
              legendPos="Bottom"
              height="full"
            />

            {quesList.map((items) => (
              <div key={items.question}>
                <p className="text-gray-400 m-3 mt-4 uppercase">
                  {items.question}
                </p>

                {items.options.map((opt) => (
                  <p className=" grid grid-cols-1 gap-4 place-items-center mt-8">
                    {" "}
                    <Questions text={opt} />
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-60">
        <div className=" truncate  w-full  flex justify-center ">
          <SpinWheel />
        </div>
        <span className=" absolute top-40 mt-[1150px] ">
          <Header category="Rolling Section" title="Let's Roll " />
        </span>{" "}
      </div>
    </div>
  </>
);

export default Charts;
