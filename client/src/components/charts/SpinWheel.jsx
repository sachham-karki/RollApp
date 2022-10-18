import React, { useState, useEffect } from "react";
import "./SpinWheel.css";
import { pieChartData } from "../../data/dummy";
import { Charts } from "..";

import { GiSteamLocomotive } from "react-icons/gi";
import { rotateTextSize } from "@syncfusion/ej2-react-charts";

const SpinWheel = () => {
  // const startRotation = () => {
  //   var x = 1024;
  //   var b = 9999;
  //   var degree = Math.floor(Math.random() * (x - b)) + b;
  //   document.getElementById("wheel__chart").style.transform =
  //     "rotate(" + degree + "deg)";
  // };

  // let container = document.getElementById("wheel__chart");
  // let spinButton = document.getElementById("spin__button");
  // let number = Math.ceil(Math.random() * 10000);

  // spinButton.onClick = function () {
  //   container.style.transform = "rotate(" + number + "deg)";
  // };

  const [state, setState] = useState("wheel__chart");

  useEffect(() => {
    state !== "wheel__chart" &&
      setTimeout(() => {
        setState("wheel__chart");
      }, 5500);
  }, [state]);

  const [spinState, setSpinState] = useState({});
  const spin = async () => {
    // set random spin degree and ease out time
    // set state variables to initiate animation
    setState("rotate__wheel");

    setTimeout(() => {
      let randomSpin = Math.floor(Math.random() * 900) + 500;

      setSpinState({
        rotate: randomSpin,
        easeOut: 1,
        // spinning: true
      });
    }, 5500);

    //calcalute result after wheel stops spinning
    // setTimeout(() => {
    //   this.getResult(randomSpin);
    // }, 2000);
  };

  return (
    <>
      <div
        className={state}
        style={{
          WebkitTransform: `rotate(${spinState.rotate}deg)`,
          WebkitTransition: `-webkit-transform ${spinState.easeOut}s ease-out`,
        }}
      >
        <Charts
          id=" "
          data={pieChartData}
          legendVisibility={false}
          height="full"
          legendPos="Bottom"
        />
      </div>
      <span className="arrow"></span>
      <button id="spin__button" onClick={spin}>
        Let's Roll{" "}
      </button>
    </>
  );
};

// export const wheelButton = () => {
//   return <button className="rotateWheel" onClick={(magicWheel) => {}}></button>;
// };

export default SpinWheel;
