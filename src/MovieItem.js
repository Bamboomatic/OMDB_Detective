import React from 'react'

// movies db http://www.omdbapi.com/?apikey=baec7aa6&
// poster http://img.omdbapi.com/?apikey=baec7aa6&

class MovieItem extends React.Component {
    render(){
        return  <div className="movie">
                    <img alt="movie poster" src={this.props.movie.Poster} className="movie-poster"/>
                    <div className="movie-description">
                        <h1>{this.props.movie.Title}</h1>
                        <h4>{this.props.movie.Year}</h4>
                        <h3>{this.props.movie.overwiev}</h3>
                    </div>
                </div>
    }
}

export default MovieItem