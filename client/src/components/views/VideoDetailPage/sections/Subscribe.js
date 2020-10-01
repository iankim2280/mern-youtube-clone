import React, { useEffect, useState } from "react";
import Axios from "axios";

const Subscribe = (props) => {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  const onSubscribe = () => {
    // already subscribed
    let subscribeVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    if (Subscribed) {
      Axios.post("/api/subscribe/unSubscribe", subscribeVariable).then(
        (response) => {
          if (response.data.success) {
            // -1 from current subscribed number
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("Failed to unsubscribe");
          }
        }
      );
    } else {
      Axios.post("/api/subscribe/subscribe", subscribeVariable).then((res) => {
        if (res.data.success) {
          setSubscribeNumber(SubscribeNumber + 1);
          setSubscribed(!Subscribed);
        } else alert("Failed to subscribe");
      });
    }
    // not a subscriber
  };
  useEffect(() => {
    let subscribeNumberVariables = {
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

    let subscribedUserVariables = {
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
        onClick={onSubscribe}
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
