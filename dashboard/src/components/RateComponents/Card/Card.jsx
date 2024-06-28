import React, { useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Card.css";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

function Card(props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <LayoutGroup>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </LayoutGroup>
  );
}

//CompactCard

function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  return (
    <motion.div
      className="CompactCards"
      style={{
        background: param.color.background,
        boxShadow: param.color.boxShadow,
      }}
      onClick={setExpanded}
      layoutId="expandedCard"
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        ></CircularProgressbar>
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>${param.value}</span>
        <span>Last 24 Hours</span>
      </div>
    </motion.div>
  );
}

function ExpandedCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },

      dataLabels: {
        enabled: false,
      },

      stroke: {
        curve: "smooth",
        colors: ["white"],
      },

      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },

      grid: {
        show: true,
      },

      xaxis: {
        type: "datetime",
        categories: [
          "2021-09-01T00:00:00",
          "2021-09-01T01:30:00",
          "2021-09-01T02:30:00",
          "2021-09-01T03:30:00",
          "2021-09-01T04:30:00",
          "2021-09-01T05:30:00",
          "2021-09-01T06:30:00",
          "2021-09-01T07:30:00",
          "2021-09-01T08:30:00",
          "2021-09-01T09:30:00",
          "2021-09-01T10:30:00",
          "2021-09-01T11:30:00",
        ],
      },
    },
  };
  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.background,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandedCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart series={param.series} type="area" options={data.options}></Chart>
      </div>
      <span>Last 24 Hours</span>
    </motion.div>
  );
}
export default Card;
