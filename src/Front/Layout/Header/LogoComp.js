import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.svg";
function LogoComp() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
      <Link to="/">
        <img
          src={Logo}
          width="300px"
          height="40px"
          style={{ marginLeft: "-110px"}}
          alt=""
        />
      </Link>
    </div>
  );
}

export default LogoComp;
