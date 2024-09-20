import QueryBuilderIcon from "@mui/icons-material/WatchLaterOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import MediationIcon from "@mui/icons-material/Mediation";
import React from 'react'
import ThirdBar from "./ThirdBar";


const items = [
    {
      path: "/history/product",
      label: "PRODUCT SUMMARY",
      icon: QueryBuilderIcon,
    },
    {
      path: "/history/part",
      label: "PART SUMMARY",
      icon: PrecisionManufacturingOutlinedIcon,
    },
    {
      path: "/history/machine",
      label: "MACHINE SUMMARY",
      icon: MediationIcon,
    },
  ];

  
  const ThirdbarSummary = () => {
    return (
      <ThirdBar items={items} />

    )
  }
  
  export default ThirdbarSummary