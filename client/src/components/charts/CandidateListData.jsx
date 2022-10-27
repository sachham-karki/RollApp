import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";

const CandidateListData = () => {
  const { pieChartData } = useStateContext();

  return pieChartData;
};

export default CandidateListData;
