/**
 * @jsx React.DOM
 */

var Settings = React.createClass({

    startGame: function() {
        console.log(mySwiper);
        mySwiper.swipeNext();
    },

    render: function () {
        
        return (
            <div className="swiper-slide settings">
                <h1>Chess Timer</h1>

                <select name="timer-setting" id="timer-setting" tabindex="1">
                    <option value="1">1 min</option>
                    <option value="3">3 min</option>
                    <option value="5">5 min</option>
                    <option value="10">10 min</option>
                    <option value="15">15 min</option>
                    <option value="20">20 min</option>
                    <option value="25">25 min</option>
                    <option value="30">30 min</option>
                    <option value="40">40 min</option>
                    <option value="50">50 min</option>
                    <option value="60">60 min</option>
                </select>
               
                <button id='startButton' value="" onClick={this.startGame}>Start!</button>

            </div>
        );
    }
});

var Timer = React.createClass({

    getInitialState: function() {
        return null;
    },

    componentDidMount: function() {

    },

    changeTurn: function(playerName) {


    },

    settings: function() {

    },

    pauseGame: function() {

    },

    newGame: function() {

    },

    render: function () {

        return (
        <div className="swiper-slide timer">
            <div className="row">
                <button className="playButton" id="player1" onClick={this.changeTurn("player1")}>123</button>
            </div>
            <div className="row">
                   <button className="menuButton" id="pauseButton" onClick={this.pauseGame()}>Pause</button>
                   <button className="menuButton" id="newGameButton" onClick={this.newGame()}>New Game</button>
                   <button className="menuButton" id="settingsButton" onClick={this.settings()}>Settings</button>
            </div>
            <div className="row">
               <button className="playButton" id="player2" onClick={this.changeTurn("player2")}>4234</button>
            </div>
        </div>
    );
    }
});



var App = React.createClass({

    getInitialState: function() {

   

        return null;
    },

        render: function () {
     //   console.log(mySwiper);
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <Settings />
                    <Timer />
                </div>
                <div className="pagination"></div>
            </div>
        );
    }
});

React.renderComponent(
    <App />,
    document.getElementById('content')
);
