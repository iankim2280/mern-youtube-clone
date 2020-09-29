import React from "react";
import { FaCode } from "react-icons/fa";

const LandingPage = () => {
  return (
    <>
      <div className="app">
        <FaCode style={{ fontSize: "4rem" }} />
        <br />
        <span style={{ fontSize: "2rem" }}>
          Youtube clone - MERN with ReduxJS
        </span>
      </div>
    </>
  );
};

export default LandingPage;
