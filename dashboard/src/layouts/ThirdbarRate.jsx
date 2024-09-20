import QueryBuilderIcon from "@mui/icons-material/WatchLaterOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import MediationIcon from "@mui/icons-material/Mediation";
import React from 'react'
import ThirdBar from "./ThirdBar";


const items = [
    {
      path: "/rate/HourlyRate",
      label: "BY MOLD",
      icon: QueryBuilderIcon,
    },
    {
      path: "/rate/ProductProgress",
      label: "BY PRODUCT",
      icon: PrecisionManufacturingOutlinedIcon,
    },
    {
      path: "/rate/PartProgress",
      label: "BY PART",
      icon: MediationIcon,
    },
  ];

  
  const ThirdbarRate = () => {
    return (
      <ThirdBar items={items} />

    )
  }
  
  export default ThirdbarRate