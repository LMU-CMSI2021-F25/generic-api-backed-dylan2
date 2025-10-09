export async function fetchCommander() {
 const res = await fetch(
    "https://api.scryfall.com/cards/random?q=is:commander+-layout:transform+-layout:modal_dfc+-layout:meld+-layout:flip+-layout:split"
 );
  const data = await res.json();
  return data;
}

export async function searchCards(searchTerm) {
  //Search from scryfall api
  if (!searchTerm) return [];

  const response = await fetch(
    `https://api.scryfall.com/cards/search?q=${encodeURIComponent(
      searchTerm
    )}+game:paper&unique=cards&order=edhrec`
  );

  if (!response.ok) {
    console.error("Scryfall search failed:", response.statusText);
    throw new Error("Failed to fetch cards from Scryfall");
  }

  const data = await response.json();
  return data.data || [];
}
