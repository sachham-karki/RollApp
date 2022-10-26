import React, { useEffect, useState } from "react";
// import {pieChartData} from '../../data/dummy.js';

import { useStateContext } from "../../contexts/ContextProvider";
import { quesList } from "../../components/charts/Questions";

import {
  Header,
  Charts as PieChart,
  Questions,
  SpinWheel,
  FormComp,
  Button,
} from "../../components";

import CandiateListData from "../../components/charts/CandiateListData";

import axios from "axios";

import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");

const addNewData = async () => {};

const Charts = () => {
  //old
  // const [dataOfPieChart, setDataOfPieChart] = useState({ data: [] });

  // const { currentColor } = useStateContext();
  // useEffect(() => {
  //   const loadData = async () => {
  //     //Geting pie chart data from backend.
  //     const getData = await axios.get("http://localhost:8000/spinner");
  //     //Assigning data to pieChartData variable.
  //     setDataOfPieChart(getData.data[0].spinner);
  //   };
  //   loadData();
  // }, []);

  useEffect(() => {
    loadAsync();
  }, []);

  const [dataOfPieChart, setDataOfPieChart] = useState(null);
  const [load, setLoad] = useState(false);

  const loadAsync = async () => {
    const response = await axios.get("http://localhost:8000/spinner");

    setDataOfPieChart(response.data[0].spinner);
    setLoad(true);
  };

  // const arrData = dataOfPieChart.map((x) => x.x);

  const dataPie = dataOfPieChart;
  // const map1 = dataPie.map((x) => x.x);
  console.log(dataPie);

  const vote = async (opt) => {
    // socket.on("connection");
    //Sending data to backend and invoke the function called voteCountUpdate using emit method.
    socket.emit("voteCountUpdate", opt.x);

    console.log(`map----------------->>>>>>>>>>>>>>>>>  ${opt.x} `);
  };

  socket.on("message", (data) => {
    //Replacing the data of pie chart with update value received from backend.
    setDataOfPieChart((dataOfPieChart = data[0].spinner));
  });

  // console.log(dataOfPieChart);

  // let a = dataOfPieChart.map((x) => x.x);

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
              {load &&
                dataOfPieChart.map((opt) => (
                  <div key={opt.x}>
                    <p className="text-gray-400 m-3 mt-4 uppercase">
                      <span onClick={vote.bind(this, opt)}>
                        <Questions text={opt.x} />
                      </span>
                    </p>

                    {/* <p className=" grid grid-cols-1 gap-4 place-items-center mt-8">
                    {" "}
                    <div onClick={vote.bind(this, items)}>
                      <Questions text={items.x} />
                    </div>
                  </p> */}

                    {/* {items.options.map((opt) => (
                    <p className=" grid grid-cols-1 gap-4 place-items-center mt-8">
                      {" "}
                      <div onClick={vote.bind(this, opt)}>
                        <Questions text={opt} />
                      </div>
                    </p>
                  ))} */}
                    {/* <div className="m-12">
                    <Button
                      color="white"
                      bgColor={currentColor}
                      text="Add new Canidates"
                      bRadius={50}
                      size="md"
                      padX={10}
                    />
                  </div> */}
                  </div>
                ))}

              <form action="/spinner" method="POST">
                <FormComp />
                <button className="block m-8" type="submit" value="Submit">
                  Submit
                </button>
              </form>
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
