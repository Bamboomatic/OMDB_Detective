import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">

      <header className="App-header">

      <FontAwesomeIcon className="icon" icon={faSearch} size="4x" />

       <span>OMDb Detective</span>
      </header>

      <nav className="search-bar">
<input placeholder="Tu wpisz czego szukasz" className="search-bar-input"></input>
      </nav>

      <main className="movies">

      </main>

      <footer className="footer">

      </footer>
    </div>
  );
}

export default App;
