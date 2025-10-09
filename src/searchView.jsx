import React, { useEffect, useState } from "react";
import { searchCards } from "./api";
import "./search.css";

export default function SearchView({ commander, deck, setDeck }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function isCardLegalByColor(card) {
    // Check if a card fits within the Commander’s color identity
    if (!commander || !commander.color_identity) return true;
    const commanderColors = commander.color_identity;
    const cardColors = card.color_identity || [];
    if (cardColors == []) {
      return true;
    }
    return cardColors.every((c) => commanderColors.includes(c));
  }

  async function handleSearch(e) {
    // Search cards to add to deck
    e.preventDefault();
    setLoading(true);
    const cards = await searchCards(searchTerm);
    const legalCards = cards.filter(isCardLegalByColor);
    setSearchResults(legalCards || []);
    setLoading(false);
  }

  function addToDeck(card) {
    setError("");
    if (!deck.some((c) => c.id === card.id)) setDeck([...deck, card]);
  }

  return (
    <>
      <div>
        {/* Search Form */}
        <form onSubmit={handleSearch}>
          <>
            <input
              id="searchbox"
              type="text"
              placeholder="Search for cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>Search</button>
          </>
        </form>

        {error && <p>{error}</p>}
        {loading && <p>Loading search results...</p>}

        {/* Search Results */}
        <div>
          {searchResults.map((card) => (
            <div key={card.id}>
              <img
                id="result_image"
                src={card.image_uris?.normal}
                alt={card.name}
              />
              <p>{card.name}</p>
              <button onClick={() => addToDeck(card)}>Add to Deck</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
