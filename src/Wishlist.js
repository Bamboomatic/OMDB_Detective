import React from 'react'

class Wishlist extends React.Component {

    render() {
        return <div className="fav-movie">
            <img alt="movie poster" src={this.props.fav.Poster} onError={(e) => { e.target.onerror = null; e.target.src = "https://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg" }} className="fav-movie-poster" />
            <div className="fav-movie-description">
                <h3>{this.props.fav.Title}</h3>
                <h5>{this.props.fav.Year}</h5>
                <h5><b>Director: </b>{this.props.fav.Director}</h5>
                <h5><b>IMDB rating: </b>{this.props.fav.imdbRating}</h5>
                <h5><b>Genre: </b>{this.props.fav.Genre}</h5>
                <h5><b>Plot: </b>{this.props.fav.Plot}</h5>

                <button id={this.props.fav.imdbID} type="button" onClick={this.props.favDelHandler}>Remove</button>
            </div>
        </div>
    }
}

export default Wishlist