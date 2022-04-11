import React from "react";
import "../style/Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <img src={logo} alt="" />
      </div>
    </>
  );
}

export default Navbar;
