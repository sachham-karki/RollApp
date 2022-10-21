import React, { useEffect, useState } from "react";
// import {pieChartData} from '../../data/dummy.js';
import {
  Header,
  Charts as PieChart,
  Questions,
  SpinWheel,
} from "../../components";
import { quesList } from "../../components/charts/Questions";
import axios from "axios";

import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");

const addNewData = async () => {};

const Charts = () => {
  let [dataOfPieChart, setData] = useState({ data: [] });

  useEffect(() => {
    const loadData = async () => {
      //Geting pie chart data from backend.
      const getData = await axios.get("http://localhost:8000/spinner");
      //Assigning data to pieChartData variable.
      setData(getData.data[0].spinner);
    };
    loadData();
  }, []);

  const vote = async (opt) => {
    socket.on("connection");
    //Sending data to backend and invoke the function called voteCountUpdate using emit method.
    socket.emit("voteCountUpdate", opt);
  };

  socket.on("message", (data) => {
    //Replacing the data of pie chart with update value received from backend.
    setData((dataOfPieChart = data[0].spinner));
  });

  return (
    <>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <div>
          <Header category="Pie-Chart" title="Live View" />
          <div className="w-full mb-20">
            <PieChart
              id="Company Overview"
              data={dataOfPieChart}
              legendVisibility={true}
              legendPos="Bottom"
              height="full"
            />
            <div className=" grid grid-cols-1 gap-4 place-items-center mt-8">
              {quesList.map((items) => (
                <div key={items.question}>
                  <p className="text-gray-400 m-3 mt-4 uppercase">
                    {items.question}
                  </p>

                  {items.options.map((opt) => (
                    <p className=" grid grid-cols-1 gap-4 place-items-center mt-8">
                      {" "}
                      <div onClick={vote.bind(this, opt)}>
                        <Questions text={opt} />
                      </div>
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
};

export default Charts;
