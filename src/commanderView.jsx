import React, { useEffect, useState } from "react";
import "./commander.css";
import { fetchCommander } from "./api";

export default function CommanderView(props) {
  const commander = props.commander;
  const setCommander = props.setCommander;

  const colorMap = {
    W: "#FFFCE0", // White
    U: "#0800FF", // Blue
    B: "#2C1A52", // Black
    R: "#FF2E2E", // Red
    G: "#3BD440", // Green
  };

  // Fetch Commander of the Day (same for everyone per day)
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const storedDate = localStorage.getItem("commanderDate");
    const storedCommander = localStorage.getItem("commanderData");

    if (storedDate === today && storedCommander) {
      setCommander(JSON.parse(storedCommander));
      return;
    }
    async function getData() {
      const data = await fetchCommander();
      setCommander(data);
      localStorage.setItem("commanderDate", today);
      localStorage.setItem("commanderData", JSON.stringify(data));
    }

    getData();
  }, []);

  function getShadowStyle(identity) {
    if (!identity || identity.length === 0) {
      return {
        boxShadow: "0 0 25px 5px rgba(200, 200, 200, 0.5)", // colorless fallback
      };
    }

    const colors = identity.map((c) => colorMap[c]);
    const gradient = `linear-gradient(135deg, ${colors.join(", ")})`;
    let textColor = "#F8F8F8";

    if (identity.includes("W")) {
      textColor = "#000000";
    }

    return {
      boxShadow: `0 0 30px 10px ${colors[0]}80`, // translucent shadow from first color
      backgroundImage: gradient, //Set background of the commander card-card to the gradient of identity colors
      borderRadius: "1rem",
      padding: "1rem",
      "--card-text": textColor, //Make sure we don't have a contrast nightmare
    };
  }

  if (!commander) {
    return <div>Loading Commander of the Day...</div>;
  }

  return (
    <div>
      <h1 id="title">Commander of the Day</h1>

      {/* Commander Card */}
      <div id="main_card" style={getShadowStyle(commander.color_identity)}>
        <img
          id="card_image"
          src={commander.image_uris?.normal}
          alt={commander.name}
        />
        <div id="textbox">
          <h1 id="name">{commander.name}</h1>
          <div id="extra_info">
            <p>Color Identity: </p>{" "}
            {commander.color_identity?.length ? (
              commander.color_identity.map((c) => <p key={c}> {c} </p>)
            ) : (
              <p>Colorless</p>
            )}
            <p> | {commander.type_line}</p>
          </div>
          <p id="oracle_text">{commander.oracle_text}</p>
        </div>
      </div>
    </div>
  );
}
