import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CommanderView from './commanderView'
import SearchView from './searchView'
import DeckbuildingView from './deckbuildingView'

function App() {
  const [commander, setCommander] = useState(null);
  const [deck, setDeck] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <>
      <CommanderView commander={commander} setCommander={setCommander} />
      <DeckbuildingView deck={deck} setDeck={setDeck} commander={commander}/>
    </>
  )
}

export default App
