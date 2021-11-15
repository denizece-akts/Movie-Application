import React from 'react'
import PopUp from './PopUp'
import $ from 'jquery'

const API_KEY = "b539c36de3ac351990a2521409145810"

class MovieResults extends React.Component {

  constructor() {
    super();
    this.state = {
      show: false,
      trailerKey: null
    }
  }

  getServices() {

    const providers = "https://api.themoviedb.org/3/movie/" + this.props.movie.id + "/watch/providers?api_key=" + API_KEY
    /* trailer: https://www.youtube.com/watch?v= + key 
    https://api.themoviedb.org/3/movie/13/videos?api_key=b539c36de3ac351990a2521409145810
    type: Trailer
    */

    $.ajax({

        url: providers,
        success: (res) => {

          const providerList = res.results
          const trProviders = providerList.TR

          var streamingList = []
          var payList = []

          if (trProviders == null){
            console.log(this.props.movie.title + " Not available in TR")
          }
          else {
            const streaming = trProviders.flatrate
            if (streaming != null) {
              console.log("Streaming on: ")
              streaming.forEach(service => {

                console.log(service.provider_name)
                streamingList.push(service.provider_name)
              });

              this.setState({streamServices: streamingList})
            }
            else {
              console.log("Rent:")
              trProviders.rent.forEach(service => {

                console.log(service.provider_name)
                payList.push(service.provider_name)
              });

              console.log("Buy:")
              trProviders.buy.forEach(service => {

                console.log(service.provider_name)
                payList.push(service.provider_name)
              });

              //this.setState({streamServices: streamingList})

            }
          }
          /* rent or buy : apple or google 
            flatrate : netflix or amazon , blutv
          */
        }
    })
  }

  getTrailer() {

    const videos = "https://api.themoviedb.org/3/movie/" + this.props.movie.id + "/videos?api_key=" + API_KEY
    /* trailer: https://www.youtube.com/watch?v= + key
    type: Trailer
    */

    $.ajax({

        url: videos,
        success: (res) => {

          const videoList = res.results
          videoList.forEach(vid => {

            if (vid.type === "Trailer"){
              this.setState({trailerKey: vid.key})
            }
          });
        }
    })
  }

  togglePopup() {
    this.setState({
      show: !this.state.show
    });
    this.getServices()
    this.getTrailer()
  }

  render() {
    return <div className="film">
      <img alt={this.props.movie.title} src={this.props.movie.poster_path} onClick={this.togglePopup.bind(this)}/>
      <div className="movie-info">
        <h4>{this.props.movie.original_title}</h4>
        <span>{this.props.movie.vote_average}</span>
      </div>
      {this.state.show ? <PopUp closePopup={this.togglePopup.bind(this)} title={this.props.movie.title} text={this.props.movie.overview} 
      movie_id={this.props.movie.id} trailer={"https://www.youtube.com/watch?v=" + this.state.trailerKey} ss={this.state.streamServices}/> : null }
    
    </div>
  }
}

export default MovieResults