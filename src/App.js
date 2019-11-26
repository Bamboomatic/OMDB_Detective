import React, {Component} from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart } from '@fortawesome/free-solid-svg-icons';
import MovieItem from './MovieItem.js';
import Wishlist from './Wishlist.js'
import InfiniteScroll from 'react-infinite-scroller';
import Cookies from 'js-cookie'


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      movieTitle: '',
      page: '',
      numberOfPages: '',
      currentID: 'tt0372784',
      movies: [],
      favs: [],
      apikey: 'baec7aa6',
      cookies: {},
      wishlistOn: false, 
    }
    this.searchHandler= this.searchHandler.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.loadMoreHandler = this.loadMoreHandler.bind(this)
    this.generateWishlist = this.generateWishlist.bind(this)
    this.favAddHandler = this.favAddHandler.bind(this)
    this.favDelHandler = this.favDelHandler.bind(this)

  }

     //updating state with value from input 
    updateInput(e){
      this.setState({ movieTitle: e.target.value });
    }

    //button click / form submit management
    searchHandler(e){
      e.preventDefault();
      this.searchMovie(this.state.movieTitle)
    }
  
    //wishlist buttons
    favAddHandler(e){
      e.preventDefault()
      Cookies.set(e.target.id, e.target.id, { expires: 7 })
      this.generateWishlist()
      console.log(this.state.favs) 
      console.log(this.state.movies) 
    }
    favDelHandler(e){
      e.preventDefault()
      console.log(e.target.id)
      Cookies.remove(e.target.id)
      this.generateWishlist()
    }

  //function for get data from API
  searchMovie(movieTitle) {
      fetch(`http://www.omdbapi.com/?apikey=${this.state.apikey}&s=${movieTitle}`)
          .then(resp => resp.json())
          .then(movieSearchResults => {
            const result = movieSearchResults.Search;
            let movies = []
            this.setState({page: 2})
              result.forEach((movie) => {
              const movieItem = <MovieItem key={movie.imdbID} movie={movie} favAddHandler={this.favAddHandler} favDelHandler={this.favDelHandler}/>
              movies.push(movieItem)
              })    
            this.setState({movies, numberOfPages: Math.ceil(movieSearchResults.totalResults/10)})     
        
          })
          .catch(err => console.error(err));
  }

  loadMoreHandler(){
    this.state.page < this.state.numberOfPages+1 ? this.nextPageFunc() : console.log('no more movies')
  }

  //loading next pages from API
  nextPageFunc() {
    fetch(`http://www.omdbapi.com/?apikey=${this.state.apikey}&s=${this.state.movieTitle}&page=${this.state.page}`)
        .then(resp => resp.json())
        .then(movieSearchResults => {
          console.log('click')
          const result = movieSearchResults.Search;
          let moreMovies = []
          console.log("odpowiedz z API: "+result)
          
          result.forEach((movie) => {
            const moreMovieItems = <MovieItem key={movie.imdbID} movie={movie} favAddHandler={this.favAddHandler} favDelHandler={this.favDelAddHandler}/>
            moreMovies.push(moreMovieItems)
            })    
          this.setState({movies: this.state.movies.concat(moreMovies), page: this.state.page+1})       
        })
        .catch(err => console.error(err));
}

// generating wishlist based on movie imdb ID number stored in cookies
generateWishlist() {
  this.setState({favs: []});
 (Object.values(Cookies.get())).forEach(movieID =>
      fetch(`http://www.omdbapi.com/?apikey=${this.state.apikey}&i=${movieID}`)
      .then(resp => resp.json())
      .then(fav => {
        let favItem = <Wishlist key={movieID} fav={fav} favAddHandler={this.favAddHandler} favDelHandler={this.favDelHandler}/>
          this.setState({favs: this.state.favs.concat(favItem)})
        })
      .catch(err => console.error(err)),
  )
}

wishlistVisibilityHandler(){
  this.setState({wishlistOn : !this.state.wishlistOn})
  this.generateWishlist()
}

  render(){
    
    return (
      <div className="App">

        <header className="App-header">
          <FontAwesomeIcon className="icon" icon={faSearch} size="4x" />
          <span>OMDb Detective</span>
          <FontAwesomeIcon className="icon" icon={faHeart} size="4x" onClick={this.wishlistVisibilityHandler.bind(this)}/>
        </header>

       
          <form className="search-bar" ref="form" onSubmit={this.searchHandler}>
            <input className="search-bar-input" placeholder="Movie Title Here" onChange={this.updateInput}/>
            <button type="submit"><FontAwesomeIcon className="icon" icon={faSearch} /></button>
          </form>
      

        <main className={this.state.wishlistOn ? "movies wishlistOn" : "movies wishlistOf"}>
          {this.state.movies}

          {/* // infinite scroll to be implemented instead of next results button*/}

          <button type="button" onClick={this.loadMoreHandler}><FontAwesomeIcon className="icon" icon={faSearch} />Load next 10</button>
        </main>

        <section className={this.state.wishlistOn ? "movies wishlistOf" : "movies wishlistOn"}>
          <h1>my WISHLIST</h1>
          {this.state.favs}

        </section>

        <footer className="footer">

        </footer>
      </div>
    );
  }
}
export default App;
