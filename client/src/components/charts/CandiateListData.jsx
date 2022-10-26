import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";

const CandiateListData = () => {
  const { pieChartData } = useStateContext();

  return pieChartData;
};

export default CandiateListData;
