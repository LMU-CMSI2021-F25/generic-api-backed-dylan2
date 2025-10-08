import { useState } from "react";
import "./deck.css";

export default function DeckView({deck, setDeck}) {

  function removeFromDeck(id) {
    setDeck(deck.filter((c) => c.id !== id));
  }

  return (
    <>
      {/* Deck Section */}
      <div id="main_deck_card">
        <h3>Your Deck ({deck.length} cards)</h3>
        <div>
          {deck.map((card) => (
            <div key={card.id}>
              <a href={card.scryfall_uri} target="_blank">{card.name}</a>
              <button id="remove" onClick={() => removeFromDeck(card.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
