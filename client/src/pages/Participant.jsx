import React from "react";
import FormComp from "../components/charts/FormComp";

const Participant = () => {
  return (
    <div>
      <form action="">
        <button>
          {" "}
          <FormComp />
        </button>
      </form>
    </div>
  );
};

export default Participant;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Participant = () => {
//   useEffect(() => {
//     loadAsync();
//   }, []);

//   const [data, setData] = useState(null);
//   const [load, setLoad] = useState(false);

//   const loadAsync = async () => {
//     const response = await axios.get("http://localhost:8000/spinner");

//     setData(response.data[0].spinner);
//     setLoad(true);
//   };

// return <>{load && data.map((datas) => <h1 key={datas.x}>{datas.x}</h1>)}</>;
// };

// export default Participant;

// import { useState } from "react";

// <form action="/spinner" method="POST">
//   <input type="text" placeholder="Items" name="Items" />
//   <input type="text" placeholder="Items" name="Items" />

//   <button>Submit</button>
// </form>
