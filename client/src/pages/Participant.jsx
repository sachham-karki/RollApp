import React from "react";
// import { useState } from "react";
import axios from "axios";
import { Form } from "../components";

export default function Participant() {
  return (
    <form action="/spinner" method="POST">
      <input type="text" placeholder="Items" name="Items" />
      <input type="text" placeholder="Items" name="Items" />

      <button>Submit</button>
    </form>
  );
}
