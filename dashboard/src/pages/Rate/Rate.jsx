import "./Rate.scss";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import Sidebar from "../../components/RateComponents/SideBar/SideBar";

function Rate() {
  return (
    <>
      <Header />
      <SecondBar />

        <div className="rate-page">
          <Sidebar />
        </div>
    </>
  );
}

export default Rate;
