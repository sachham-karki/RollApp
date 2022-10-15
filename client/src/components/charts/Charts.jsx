import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";

//data line 3001
import { pieChartData } from "../../data/dummy";

import { useStateContext } from "../../contexts/ContextProvider";

const Charts = ({ id, data, legendVisibility, height }) => {
  const { currentMode } = useStateContext();

  return (
    <div>
      <AccumulationChartComponent
        title={id}
        legendSettings={{
          visible: legendVisibility,
          position: "Bottom",
          background: "white",
        }}
        height={height}
        tooltip={{ enable: true }}
        background={currentMode === "Dark" ? "#33373E" : "#fff"}
      >
        <Inject
          services={[
            PieSeries,
            AccumulationDataLabel,
            AccumulationLegend,
            AccumulationTooltip,
          ]}
        ></Inject>
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            type="Pie"
            dataSource={data}
            innerRadius="50%"
            xName="x"
            yName="y"
            dataLabel={{
              visible: true,
              name: "text",
              position: "Inside",
              font: {
                fontWeight: "600",
                color: "#fff",
              },
            }}
            // startAngle={0}
            // endAngle={360}
            // radius="70%"
            explode
            explodeOffset="10%"
            // explodeIndex={0}
          ></AccumulationSeriesDirective>
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
  );
};

export default Charts;
