import React, { useRef } from "react";
import "./voteInput.css";
import { useStateContext } from "../../contexts/ContextProvider";
let votingPower = 10;

const VoteInput = () => {
  const {
    clickIncreaseVote,
    setClickIncreaseVote,
    clickDecreaseVote,
    setClickDecreaseVote,
  } = useStateContext();
  const voteInputRef = useRef();

  let voteCurrentValue = 0;

  const incrementWeight = () => {
    if (voteInputRef.current.value < 10) {
      votingPower > 0 && voteCurrentValue < 10 && voteCurrentValue++;
      voteInputRef.current.value = voteCurrentValue;

      votingPower > 0 && votingPower--;

      console.log(votingPower + "==============>>>>>>>>>>>>>");
      console.log(
        "input value:" +
          voteInputRef.current.value +
          "==============>>>>>>>>>>>>>"
      );
    }
  };

  const decrementWeight = () => {
    if (voteInputRef.current.value > 0) {
      // setClickDecreaseVote(!clickDecreaseVote);
      voteCurrentValue > 0 && voteCurrentValue--;
      voteInputRef.current.value = voteCurrentValue;

      votingPower < 10 && votingPower++;

      console.log(votingPower + "==============>>>>>>>>>>>>>");

      console.log(
        "input value:" +
          voteInputRef.current.value +
          "==============>>>>>>>>>>>>>"
      );
    }
  };

  return (
    <div className="voteInput__container">
      {/* <span onClick={setClickDecreaseVote(clickDecreaseVote)}> */}{" "}
      <button id="decreaseVote" onClick={decrementWeight}>
        -
      </button>
      {/* </span> */}
      <input
        type="number"
        ref={voteInputRef}
        min="0"
        max="10"
        value="0"
        id="voteInput"
      />
      {/* <span onClick={setClickIncreaseVote(!clickIncreaseVote)}> */}{" "}
      <button
        id="increaseVote"
        onClick={() => {
          incrementWeight();
        }}
      >
        +
      </button>
    </div>
  );
};

export default VoteInput;
