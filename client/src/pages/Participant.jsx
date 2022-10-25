import React from "react";
// import { useState } from "react";

import { FormComp } from "../components";

export default function Participant() {
  return (
    <form action="/spinner" method="POST">
      <FormComp />

      <button className="m-8 ml-20 block border">Submit</button>
    </form>

    // <form action="/spinner" method="POST">
    //   <input type="text" placeholder="Items" name="Items" />
    //   <input type="text" placeholder="Items" name="Items" />

    //   <button>Submit</button>
    // </form>
  );
}
