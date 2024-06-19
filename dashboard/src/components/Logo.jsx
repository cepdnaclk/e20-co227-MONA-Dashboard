import React from "react";
import './Logo.css';
import imagepath from '../images/logo.png';

function Logo() {
  return (
        <div className="logo">
                <a href="/" className="logo">
                        <img src={imagepath} alt="" className="img-fluid"/>
                </a>
        </div>
  );
}
export default Logo;