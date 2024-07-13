// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";


// Analytics Cards Data
export const CardsData = [
  {
    title: "Success",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 60,
    value: "2597",
    png: UilUsdSquare,
    series: [
      {
        name: "Success",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Failed",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 40,
    value: "870",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Fail",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  
];
