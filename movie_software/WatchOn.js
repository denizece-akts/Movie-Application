import React from 'react'

class WatchOn extends React.Component {
    
    render() {
        return <div className="provider">
            <p>You can watch it on :</p>
            
            <button className="netflix" title="Netflix"><a href="https://www.netflix.com/tr/" target="_blank" rel="noreferrer">
                <img src="./netflix-logo.png" alt="netflix"/></a>
            </button>
            <button className="amazonPrime" title="Amazon Prime Video"><a href="https://www.primevideo.com/" target="_blank" rel="noreferrer">
                <img src="./prime-video-logo.png" alt="primeVideo"/></a>
            </button>
            
        </div>
    }
    
}

export default WatchOn