import React from 'react'

class MovieItem extends React.Component {

    


    render(){
        return  <div className="movie">
                    <img alt="movie poster" src={this.props.movie.Poster} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg"}} className="movie-poster"/>
                    <div className="movie-description">
                        <h1>{this.props.movie.Title}</h1>
                        <h4>{this.props.movie.Year}</h4>
                        <button id={this.props.movie.imdbID} type="button" onClick={this.props.favAddHandler}>+</button>
                        <button id={this.props.movie.imdbID} type="button" onClick={this.props.favDelHandler}>-</button>
                    </div>
                </div>
    }
}

export default MovieItem