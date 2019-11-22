import React, {Component} from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MovieItem from './MovieItem.js';


class App extends Component {
  constructor(props){
    super(props)
    this.state={}
    

  }

  searchMovie(movieTitle) {
      fetch(`http://www.omdbapi.com/?apikey=baec7aa6&s=${movieTitle}`)
          .then(resp => resp.json())
          .then(movieSearchResults => {
            const result = movieSearchResults.Search;
            let movies = []

            result.forEach((movie) => {
              const movieItem = <MovieItem key={movie.imdbID} movie={movie}/>
              movies.push(movieItem)
              })    
            this.setState({movies})       
          })
          .catch(err => console.error(err));
  }
  
  searchHandler(event){
    
    const searchTitle = event.target.value
    this.searchMovie(searchTitle)
    console.log(event.target.value)

  }

  render(){
    
    return (
      <div className="App">

        <header className="App-header">

          <FontAwesomeIcon className="icon" icon={faSearch} size="4x" />
          <span>OMDb Detective</span>

        </header>

        <nav className="search-bar">
          <input className="search-bar-input" onChange={this.searchHandler.bind(this)} placeholder="Tu wpisz czego szukasz" />
       
        </nav>

        <main className="movies">
          {this.state.movies}
        </main>

        <footer className="footer">

        </footer>
      </div>
    );
  }
}
export default App;
