import { useState } from "react";
import SearchView from "./searchView";
import DeckView from "./deckView";
import "./deckbuilding.css";

export default function DeckbuildingView(props) {
  const deck = props.deck;
  const setDeck = props.setDeck;
  const commander = props.commander;

  return (
    <>
      <div id="main_grid">
        {" "}
        {/*Main deckbuiliding view (DeckView and SearchView side by side) */}
        <DeckView id="deck" deck={deck} setDeck={setDeck} />
        <SearchView
          id="search"
          deck={deck}
          setDeck={setDeck}
          commander={commander}
        />
      </div>
    </>
  );
}
