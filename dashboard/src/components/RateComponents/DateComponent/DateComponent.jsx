import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


const DateComponent = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000); // Update date every minute

    return () => clearInterval(timer);
  }, []);

  const getFormattedDate = () => {
    const day = date.getDate();
    return day < 10 ? `0${day}` : day;
  };

  return (
    <div
      className="calendar-date"
      style={{
        color: "#0052ab",
        position: "relative",
        width: "2rem",
        height: "2rem",
        top: "0%",
        left: "90%",
      }}
    >
      <i className="bi bi-calendar" style={{ fontSize: "4rem" }}></i>
      <div
        className="date-overlay"
        style={{
          position: "absolute",
          
          top: "170%",
          left: "102%",
          transform: "translate(-50%, -50%)",
          fontSize: "2.0rem",
          fontWeight: "bold",
        }}
      >
        {getFormattedDate()}
      </div>
    </div>
  );
};

export default DateComponent;
