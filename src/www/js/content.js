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

var timePlayer1; // 10 of this is one second
var timePlayer2; // 10 of this is one second
var paused = false;
var turn = player1;
//var incrementP1 = 0;
//var incrementP2 = 0;
//var startNew = false;


var Timer = React.createClass({

    getInitialState: function() {
      
        return {
            player1: 0,
            player2: 0,
            turn: "player1",
            paused: true
        };
    },

    componentDidMount: function() {
        var timeMin = document.getElementById("timer-setting").value * 60 * 10;
        timePlayer1 = timeMin;
        timePlayer2 = timeMin;
        console.log(this.state.player1);
        console.log("vuoro " + this.state.turn);
    },

    changeTurn: function(player) {
        
        console.log("turn on " + this.state.turn);
        if (this.state.paused) {
            console.log("LOL");
            return;
        }
        console.log("PELAAJA ON " + player);
        if (player == player1) {
            console.log("WAT");   
            if (this.state.turn == "player1") {
                this.setState({turn: "player2"});
           //     timePlayer1 = (parseInt(timePlayer1) + parseInt(incrementP1));
            }
                      
        } else {
            if (this.state.turn == "player2") {
                console.log("WUT");
                this.setState({turn: "player1"});
             //   timePlayer2 = (parseInt(timePlayer2) + parseInt(incrementP2));
            
            }
        }
        
        console.log("turn on " + this.state.turn);
        
    },

    settings: function() {

    },

    pauseGame: function() {
    console.log("game pause changed");
    if (paused) {
        paused = false;
        this.setState({paused: false });
    //    changePauseText("Pause");
     //   setTimeout('Decrease()',100);
    } else {
        paused = true;
        this.setState({paused: true });
   //     changePauseText("Unpause");
    }
    console.log("paused " + paused);
    },

    newGame: function() {

    },

    render: function () {

        return (
        <div className="swiper-slide timer">
            <div className="row">
                <button className="playButton" id="player1" onClick={this.changeTurn.bind(this, "player1")}>123</button>
            </div>
            <div className="row">
                   <button className="menuButton" id="pauseButton" onClick={this.pauseGame.bind(this, "")}>Pause</button>
                   <button className="menuButton" id="newGameButton" onClick={this.newGame()}>New Game</button>
            </div>
            <div className="row">
               <button className="playButton" id="player2" onClick={this.changeTurn.bind(this, "player2")}>4234</button>
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
