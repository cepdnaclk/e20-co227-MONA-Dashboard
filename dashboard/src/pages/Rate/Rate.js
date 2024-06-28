import "./Rate.scss";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import DropDownContainer from "../../components/RateComponents/DropDownContainer";
import Graph from "../../components/RateComponents/Graph";
import DateComponent from "../../components/RateComponents/DateComponent";
import Cards from "../../components/RateComponents/Cards/Cards";

function Rate() {
  document.title = "Dashboard - Production Rate";

  return (
    <>
      <div className="rate-page">
        <Header />

        <div className="rate-container">
          <SecondBar />
          <div className="container">
            <div>
              <DateComponent />
            </div>
            <div>
              <DropDownContainer />
            </div>
      
            <div>
              <Graph />
            </div>

            <div>
              <Cards />
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Rate;
