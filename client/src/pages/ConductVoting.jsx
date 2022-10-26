import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { Stacked, Pie, Button, SparkLine, SpinWheel } from "../components";

import {
  earningData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy";

import { useStateContext } from "../contexts/ContextProvider";

const ConductVoting = () => {
  const { currentColor } = useStateContext();
  return (
    <div className="mt-12">
      <div className="flex flex-wrap lg:flex-nowrap justify-center"></div>
      <div className=" bg-gray-200  dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-100% lg: p-8 pt-9 m-3 bg-no-repeat bg-cover bg-center   ">
        <div className="flex justify-center items-center mb-2">
          <div>
            <p className="font-bold text-gray-400">Let's Roll</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            color="white"
            bgColor={currentColor}
            text="Roll"
            bRadius={50}
            size="md"
            padX={10}
          />
        </div>
      </div>
      {/* <div className="mt-[400px] mb-20 w-full  flex justify-center ">
        <SpinWheel />
      </div> */}
      {/* <div className=" mb-10 flex justify-center">
        {" "} */}
      {/* <div className="absolute">
          <Button
            color="white"
            bgColor={currentColor}
            text="Roll"
            bRadius={50}
            size="md"
            padX={10}
          />
        </div> */}
    </div>
    // </div>
  );
};

export default ConductVoting;
