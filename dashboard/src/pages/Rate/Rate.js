import "./Rate.css";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import MainDash from "../../components/RateComponents/Dash/MainDash";

function Rate() {
  document.title = "Dashboard - Production Rate";

  return (
    <>
      <Header />
      <SecondBar />
      <div className="rate-page">
        <div className="dash-container">
          <MainDash />
        </div>
      </div>
    </>
  );
}

export default Rate;
