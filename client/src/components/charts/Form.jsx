import React, { useState } from "react";

const Form = () => {
  const [options, setOptions] = useState([]);
  const handleAdd = () => {
    const add = [...options, []];
    setOptions();
  };

  const handleChange = () => {};

  return (
    <div>
      <button onClick={() => handleAdd()}>Add</button>

      {options.map((input, i) => {
        return <input onChange={(e) => handleChange(e, i)} />;
      })}
    </div>
  );
};

export default Form;
