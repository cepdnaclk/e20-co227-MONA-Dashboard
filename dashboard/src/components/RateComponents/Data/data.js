import { UilUsdSquare, UilBasketball } from "@iconscout/react-unicons";

export const cardsData = [
  {
    title: "Successive Shots",
    color: {
      background: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },

    barValue: 70,
    value: "2950",
    png: UilBasketball,
    series: [
      {
        name: "Success",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 70, 75, 80],
      },
    ],
  },

  {
    title: "Failure Shots",
    color: {
      background: "linear-gradient(180deg, #ff6a00 0%, #ff8b00 100%)",
      boxShadow: "0px 10px 20px 0px #ffd2b3",
    },
    barValue: 30,
    value: "1050",
    png: UilUsdSquare,
    series: [
      {
        name: "Failure",
        data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
      },
    ],
  },
];