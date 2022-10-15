import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { Stacked, Pie, Button, SparkLine } from "../components";

import {
  earningData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy";

import { useStateContext } from "../contexts/ContextProvider";

const ConductVoting = () => {
  return (
    <div className="mt-12">
      <div className="flex flex-wrap lg:flex-nowrap justify-center"></div>
      <div className="bg-green-300 dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-no-repeat bg-cover bg-center   ">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="font-bold text-gray-400">Let's Roll</p>
          </div>
        </div>
        <div>
          <Button
            color="white"
            bgColor="blue "
            text="Roll"
            borderRadius="50"
            size="md"
          />
        </div>
      </div>
    </div>
  );
};

export default ConductVoting;
