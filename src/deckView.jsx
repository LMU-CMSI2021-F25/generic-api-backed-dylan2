import { useState } from "react";
import "./deck.css";

export default function DeckView({ deck, setDeck }) {
  const [landCounts, setLandCounts] = useState({});

  function removeFromDeck(id) {
    setDeck(deck.filter((c) => c.id !== id));
    delete landCounts[id]; //Make sure we remove the entry from landCounts so that we don't mess up the overall count
  }

  function basicCheck(card) {
    //Basic land type checking so that we can allow users to include more than one
    return card.type_line.includes("Basic Land");
  }

  function incrementLand(id) {
    //Increment the basic land count
    setLandCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  }

  function decrementLand(id) {
    //Decrement the basic land count
    setLandCounts((prev) => {
      const current = prev[id] || 1;
      if (current <= 1) return prev; // don't go below 1
      return { ...prev, [id]: current - 1 };
    });
  }

  return (
    <>
      {/* Deck Section */}
      <div id="main_deck_card">
        <h3>
          Your Deck (
          {Object.keys(landCounts).length === 0 //Ensure we have the right count based on basic land status
            ? deck.length
            : deck.length +
              Object.values(landCounts).reduce((a, b) => a + b, 0) -
              1}{" "}
          cards)
        </h3>
        <div>
          {deck.map((card) => ( //Main decklist
            <div id="item" key={card.id}>
              <a href={card.scryfall_uri} target="_blank">
                {card.name}
              </a>
              {basicCheck(card) && ( //Additional land + *count* - section for basic lands
                <div className="land-counter">
                  <button
                    className="count-btn"
                    onClick={() => decrementLand(card.id)}
                  >
                    −
                  </button>
                  <span className="land-count">{landCounts[card.id] || 1}</span>
                  <button
                    className="count-btn"
                    onClick={() => incrementLand(card.id)}
                  >
                    +
                  </button>
                </div>
              )}
              <button id="remove" onClick={() => removeFromDeck(card.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
