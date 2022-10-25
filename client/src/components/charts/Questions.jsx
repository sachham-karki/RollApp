import React from "react";
import Button from "../Button";
import { useStateContext } from "../../contexts/ContextProvider";

export const quesList = [
  {
    question: "What do you like to Play ?",
    options: ["app", "apple", "jjhbh"],
  },
];

const Questions = ({ text }) => {
  const { currentColor } = useStateContext();

  return (
    <Button
      bgColor={currentColor}
      color="white"
      size="md"
      text={text}
      bRadius={30}
      width="250px"
    />
  );
};

export default Questions;
