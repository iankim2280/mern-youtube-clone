import React, { useEffect, useState } from "react";
import Axios from "axios";

const Subscribe = (props) => {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const subscribeNumberVariables = {
      userTo: props.userTo,
    };
    Axios.post("/api/subscribe/subscribeNumber", subscribeNumberVariables).then(
      (res) => {
        if (res.data.success) {
          setSubscribeNumber(res.data.subscribeNumber);
        } else {
          alert("Failed to get subscriber Number");
        }
      }
    );

    const subscribedUserVariables = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };
    Axios.post("/api/subscribe/subscribed", subscribedUserVariables).then(
      (res) => {
        if (res.data.success) {
          setSubscribed(res.data.subcribed);
        } else {
          alert("Failed to get Subscribed Information");
        }
      }
    );
  }, []);

  return (
    <div>
      <button
        onClick
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
};

export default Subscribe;
