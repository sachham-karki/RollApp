import React from "react";
// import { useState } from "react";
import axios from "axios";

export default function Participant() {
  // const [data, setData] = useState({ items: "", items: "" });

  // const handleInput = (event) => {
  //   let newInput = { [event.target.name]: event.target.value };
  //   setData({ ...data, ...newInput });
  // };

  // const deleteFirstDataInSpinner = async () => {
  //   await axios
  //     .delete("http://localhost:8000/spinner")
  //     .then(() => console.log("sucess"));
  //   console.log("fuck you");
  // };
  return (
    <form action="/spinner" method="POST">
      <input type="text" placeholder="Items" name="Items" />
      <input type="text" placeholder="Items" name="Items" />
      <button>Submit</button>
    </form>
  );
}
