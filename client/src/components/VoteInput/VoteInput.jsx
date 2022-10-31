import React, { useRef, useEffect, useState } from "react";
import "./voteInput.css";

import useUser from "../../hooks/useUser";

import axios from "axios";

import { useStateContext } from "../../contexts/ContextProvider";

import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");

const VoteInput = () => {
  const voteInputRef = useRef();

  let voteCurrentValue = 0;

  const { user } = useUser();

  let [userVotingPower, setUserVotingPower] = useState(10);
  let votingPower = userVotingPower;

  const { candidateName, setCandidateName } = useStateContext();
  useEffect(() => {
    const createUserDB = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};

      // token && (await axios.get("/api/user/get", { headers }));
      const userData = await axios.get("/api/userInfo/get", { headers });
      const vPower = userData.data[0].votingPower;
      setUserVotingPower(vPower);
      console.log("votingPower:" + userData.data[0].votingPower);
      console.log("data:" + userData.data[0].votes[0]);
    };

    createUserDB();
  }, [candidateName]);

  useEffect(() => {
    const createUserDB = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};

      // token && (await axios.get("/api/user/get", { headers }));
      await axios.put(`/api/userInfo/put/${votingPower}`, null, {
        headers,
      });
    };

    createUserDB();
  }, [votingPower]);

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
    socket.emit("voteCountUpdate", candidateName);
    // const updateVoteCount = await axios.patch(`http://localhost:8000/api/spinner/${opt.x}`)
    // setDataOfPieChart(updateVoteCount.data[0].spinner);
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    await axios.patch(`/api/incUserVote/patch/${candidateName}`, null, {
      headers,
    });
  };

  const voteDec = async () => {
    socket.on("connection");
    // Sending data to backend and invoke the function called voteCountUpdate using emit method.
    socket.emit("voteCountDecrease", candidateName);
    // const updateVoteCount = await axios.patch(
    //   `http://localhost:8000/api/decSpinner/app`
    // );
    // setDataOfPieChart(updateVoteCount.data[0].spinner);

    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    await axios.patch(`/api/decUserVote/patch/${candidateName}`, null, {
      headers,
    });
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
