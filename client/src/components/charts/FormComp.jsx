import React, { useState } from "react";
import Button from "../Button";

import { useStateContext } from "../../contexts/ContextProvider";

const FormComp = () => {
  const { currentColor } = useStateContext();
  const [options, setOptions] = useState([]);
  const handleAdd = () => {
    const add = [...options, []];
    setOptions(add);
  };

  const handleChange = (changeValue, i) => {
    const inputdata = [...options];
    inputdata[i] = changeValue.target.value;
    setOptions(inputdata);
  };
  // console.log(options, "data");

  const handleDelete = (i) => {
    const deleteOptions = [...options];
    deleteOptions.splice(i, 1);
    setOptions(deleteOptions);
  };

  return (
    <>
      {/* <h1 className="ml-20 m-20">Select your best party.....</h1> */}

      {/* <button
        onClick={() => handleAdd()}
        class="ml-20 mb-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Add
      </button> */}

      {options.map((data, i) => {
        return (
          // <form action="/" method="POST">
          <div className="ml-10">
            <button
              onClick={() => handleDelete(i)}
              className="mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full "
            >
              x
            </button>{" "}
            {/* <button
              onClick={() => handleAdd()}
              className="ml-4 mb- bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              +
            </button> */}
            <br />
            <br />
          </div>
          //   <input type="submit" value="Submit"></input>
          // </form>
        );
      })}

      <span onClick={() => handleAdd()}>
        <Button
          color="white"
          bgColor={currentColor}
          text="Add new Canidates"
          bRadius={50}
          size="md"
          padX={10}
        />
      </span>
    </>
  );
};

export default FormComp;
