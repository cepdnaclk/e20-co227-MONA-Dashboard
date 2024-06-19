import React from "react";
import './Header.css';
import Logo from './Logo';
import Date from './Date';
        
function Header() {
        
  return (
        <header id="header" className="header fixed-top d-flex align-items-center">
                {/* {logo} */}
                <Logo/> 
                {/* {date} */}
                <Date/>
                {/* {button} */}
        </header>
        
  );
}
export default Header;