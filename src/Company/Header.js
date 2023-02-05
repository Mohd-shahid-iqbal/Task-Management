import React from "react";
import Popup from "./Popup";
// import logo from "../assets/images/crud_logo.png";
import logo from "../assets/images/logo.png";

export default function Header(props) {
  return (
    <>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: "250px",
                  height: "70px",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div className="col-md-3" align="right">
              {" "}
              <Popup
                getalldata={props.getalldata}
                setrows={props.setrows}
                rows={props.rows}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
