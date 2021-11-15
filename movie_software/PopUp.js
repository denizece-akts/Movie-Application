import React from 'react';
import ReactPlayer from 'react-player'
import WatchOn from './WatchOn';
import $ from 'jquery'

var backdrop_path;

class PopUp extends React.Component {
    
    getBackgroundImg(movId) {
        
        const testUrl = "https://api.themoviedb.org/3/movie/" + movId + "/images?api_key=b539c36de3ac351990a2521409145810"
    
        $.ajax({

            url: testUrl,
            success: (res) => {

                //console.log("test")
                const imgs = res.backdrops
                backdrop_path = imgs[0].file_path
            }
        })
    }

    mystyle() {
        return {
            backgroundImage: "url(https://image.tmdb.org/t/p/w1280" + backdrop_path + ")"
        }
        //onLoad={this.getBackgroundImg(this.props.movie_id)}
    }
    /* <img src="./star.png" alt="ratings" width="30" height="30"/>
    */

    render() {
      return <div className="modal">
        <div className="modal_content" >
            <span className="close" onClick={this.props.closePopup}>&times;</span>
            <h2>{this.props.title}</h2>
            <p>{this.props.text}</p>
            <p>{this.props.ss}</p>
            
            <ReactPlayer
                url={this.props.trailer}
                controls
                playbackRate = {2}
                width = "640px"
                height = "360px"
            />
            <WatchOn />

        </div>

    </div>
    }
}

export default PopUp