import React from 'react'

class Wishlist extends React.Component {

    render(){
        return  <div className="movie">
                    <img alt="movie poster" src={this.props.fav.Poster} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg"}} className="movie-poster"/>
                    <div className="movie-description">
                        <h1>{this.props.fav.Title}</h1>
                        <h4>{this.props.fav.Year}</h4>
                        <h5>{this.props.fav.Plot}</h5>
                        <button id={this.props.fav.imdbID} type="button" onClick={this.props.favDelHandler}>-</button>
                    </div>
                </div>
    }
}

export default Wishlist