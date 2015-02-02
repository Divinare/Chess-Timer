/** @jsx React.DOM */

'use strict';

var React = require('react');

var timePlayer1; // 10 of this is one second
var timePlayer2; // 10 of this is one second
var paused = false;
var turn = "";
var incrementPlayer1 = 0;
var incrementPlayer2 = 0;
var startNew = true;

module.exports = React.createClass({

    getInitialState: function() {
        return {

        };
    },

    componentDidMount: function() {
        this.initGame();
        this.timer = setInterval(this.tick, 100);

    },

    changeTurn: function(player) {
        if (startNew) {
            this.changePlayerTurn(player);
            return;
        }
        if (paused) {
            console.log("game was paused");
            return;
        }
        this.changePlayerTurn(player);
    },

    changePlayerTurn: function(player) {
        if(startNew) {
             if (player == "player1") {
                 turn = "player2";
             } else {
                 turn = "player1";
             }
             startNew = false;
             paused = false;
        } else {
            if (player == "player1") {
                if (turn == "player1") {
                    turn = "player2";
               //     timePlayer1 = (parseInt(timePlayer1) + parseInt(incrementP1));
                }        
            } else {
                if (turn == "player2") {
                    turn = "player1";
                 //   timePlayer2 = (parseInt(timePlayer2) + parseInt(incrementP2));
                }
            }
        }
    },

    setTimerToPlayer: function(player) {
        
        var playerTime;
        if (player == "player1") {
            playerTime = timePlayer1; 
        } else {
            playerTime = timePlayer2;
        }

        var mins = Math.floor(playerTime/10/60);
        var secs = (Math.floor(playerTime/10) - mins*60);
        if (secs <= 9) {
            secs = "0" + secs
        }
        var milSecs = playerTime.toString().charAt(playerTime.toString().length-1);
        
        document.getElementById(player).innerHTML = mins + ":" + secs + ":" + milSecs;
    
    },

    tick: function() {
        if (paused) {
            return;
        }
        if (startNew == true) {
            return;
        }
        if (turn == "player1") {
            timePlayer1--;
        } else {
            timePlayer2--;
        }
        this.setTimerToButtons();
        var gameEnd = this.isGameEnded();
        if (gameEnd == "gameContinues") {
           // setTimeout('Decrease()', 100);
        } else {
            this.endGame(gameEnd);
        }
    },

    setTimerToButtons: function() {
        this.setTimerToPlayer("player1");
        this.setTimerToPlayer("player2");
    },

    isGameEnded: function() {
        if (timePlayer1 <= 0) {
            return "player2wins"
        } else if (timePlayer2 <= 0) {
            return "player1wins"
        }
        return "gameContinues";
    },

    pauseGame: function() {
        console.log("game pause changed");
        if (paused) {
            this.changePausedTo(false);
        //    changePauseText("Pause");
         //   setTimeout('Decrease()',100);
        } else {
           this.changePausedTo(true);
       //     changePauseText("Unpause");
        }
        console.log("paused " + paused);
    },

    changePausedTo: function(pause) {
        if(pause) {
            paused = true;
            document.getElementById('pauseButton').innerHTML = "Unpause";
        } else {
            paused = false;
            document.getElementById('pauseButton').innerHTML = "Pause";
        }
    },

    newGame: function() {
        startNew = true;
        this.changePausedTo(false);
        this.initGame();
    },

    initGame: function() {
        var timeMin = document.getElementById("timer-setting").value * 60 * 10;
        timePlayer1 = timeMin;
        timePlayer2 = timeMin;
        this.setTimerToPlayer("player1");
        this.setTimerToPlayer("player2");
    },

    render: function () {
        if(this.props.startNew) {
            this.newGame();
        }
        return (
        <div className="swiper-slide timer">
                <button className="playButton top" id="player1" onClick={this.changeTurn.bind(this, "player1")}>123</button>
                   <button className="menuButton" id="pauseButton" onClick={this.pauseGame.bind(this, "")}>Pause</button>
                   <button className="menuButton" id="newGameButton" onClick={this.newGame.bind(this, "")}>New Game</button>
               <button className="playButton bottom" id="player2" onClick={this.changeTurn.bind(this, "player2")}>4234</button>
        </div>
    );
    }
});