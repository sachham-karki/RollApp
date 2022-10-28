import React, { useRef, useEffect, useState } from "react";
import "./voteInput.css";

import axios from "axios";

import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");
let votingPower = 10;

const VoteInput = () => {
  const voteInputRef = useRef();

  let voteCurrentValue = 0;

  //---------axios api****************************************************

  let [votingPower, setVotingPower] = useState(null);

  useEffect(() => {
    getVotingPower();
  }, []);

  const getVotingPower = async () => {
    const response = await axios.get("http://localhost:8000/spinner");

    // setDataOfPieChart(response.data[0].spinner);
    // setCandidateDocID(response.data[0]._id);
    // setLoad(true);
  };

  //---------axios api***************************************************

  const incrementWeight = () => {
    if (voteInputRef.current.value < 11) {
      votingPower > 0 && voteCurrentValue < 10 && voteCurrentValue++;
      voteInputRef.current.value = voteCurrentValue;

      votingPower > 0 && votingPower--;
      console.log(votingPower + "==============>>>>>>>>>>>>>");
      console.log(
        "input value:" +
          voteInputRef.current.value +
          "==============>>>>>>>>>>>>>"
      );
      voteInc();
    }
  };

  const decrementWeight = () => {
    // if (voteInputRef.current.value > 0) {
    voteDec();
    voteCurrentValue > 0 && voteCurrentValue--;
    voteInputRef.current.value = voteCurrentValue;

    votingPower < 10 && votingPower++;

    console.log(votingPower + "==============>>>>>>>>>>>>>");

    console.log(
      "input value:" +
        voteInputRef.current.value +
        "==============>>>>>>>>>>>>>"
    );

    // }
  };

  //---------------------Socket-------------------------

  const voteInc = async () => {
    socket.on("connection");
    // Sending data to backend and invoke the function called voteCountUpdate using emit method.
    socket.emit("voteCountUpdate", "app");
    // const updateVoteCount = await axios.patch(`http://localhost:8000/api/spinner/${opt.x}`)
    // setDataOfPieChart(updateVoteCount.data[0].spinner);
  };

  const voteDec = async () => {
    socket.on("connection");
    // Sending data to backend and invoke the function called voteCountUpdate using emit method.
    socket.emit("voteCountDecrease", "app");
    // const updateVoteCount = await axios.patch(
    //   `http://localhost:8000/api/decSpinner/app`
    // );
    // setDataOfPieChart(updateVoteCount.data[0].spinner);
  };

  return (
    <div className="voteInput__container">
      <button id="decreaseVote" onClick={decrementWeight}>
        -
      </button>
      <input
        type="number"
        ref={voteInputRef}
        min="0"
        max="10"
        value="0"
        id="voteInput"
      />
      <button id="increaseVote" onClick={incrementWeight}>
        +
      </button>
    </div>
  );
};

export default VoteInput;
