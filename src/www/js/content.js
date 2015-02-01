/**
 * @jsx React.DOM
 */

var Settings = React.createClass({

    getInitialState: function() {
        return {
            showAdvancedOptions: false,
            incrementP1: 0,
            incrementP2: 0
             };
    },

    componentDidMount: function() {
        var width = document.getElementById("timer-setting").offsetWidth;
        document.getElementById("timer-setting").style.width = (width - 50) +'px';
        
    },

    showAdvancedOptions: function() {
      if(this.state.showAdvancedOptions) {
            $("#advancedOptions").hide(300);
       } else {
            $("#advancedOptions").show(300);
       }
      this.setState({ showAdvancedOptions: !this.state.showAdvancedOptions });
    },

    incrementChange: function(value){

        console.log(" val: " + value);


    },

    render: function () {
        
        return (
            <div className="swiper-slide index">
                <div className="settings">
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

                    <AdvancedOptions incrementP1={this.state.incrementP1} incrementChanged={this.incrementChange}/>

                    <br />
                    <a onClick={this.showAdvancedOptions}>{this.state.showAdvancedOptions ? <span>Hide advanced options</span> : <span>Show advanced options</span>}</a>
                    <br />
                    <button className="settingsButton startButton" value="" onClick={this.props.startGame}>Start</button>
                </div>
            </div>
        );
    }
});

var AdvancedOptions = React.createClass({

    incrementChanged: function(event){
        this.props.incrementChanged(event.target.value);
    },

    render: function() {
        return (
            <div id="advancedOptions">
                 Increments
                    <div>
                    P1
                       <input type="number"
                          value={this.props.incrementPlayer1}
                          onChange={this.incrementChanged} />
                    </div>
                    <div>
                    P2
                        <input type="number"
                          value={this.props.incrementPlayer2}
                          onChange={this.incrementChanged} />
                    </div>
            </div>
        );
    } // http://jsbin.com/rixido/2/edit?html,js,output
});

// http://stackoverflow.com/questions/24019431/how-to-properly-validate-input-values-with-react-js

var timePlayer1; // 10 of this is one second
var timePlayer2; // 10 of this is one second
var paused = false;
var turn = "";
var incrementPlayer1 = 0;
var incrementPlayer2 = 0;
var startNew = true;


var Timer = React.createClass({

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
            <div className="row">
                <button className="playButton top" id="player1" onClick={this.changeTurn.bind(this, "player1")}>123</button>
            </div>
            <div className="row">
                   <button className="menuButton" id="pauseButton" onClick={this.pauseGame.bind(this, "")}>Pause</button>
                   <button className="menuButton" id="newGameButton" onClick={this.newGame.bind(this, "")}>New Game</button>
            </div>
            <div className="row">
               <button className="playButton bottom" id="player2" onClick={this.changeTurn.bind(this, "player2")}>4234</button>
            </div>
        </div>
    );
    }
});



var App = React.createClass({

    getInitialState: function() {

        return {startNew: false};
    },

    startGame: function() {
        mySwiper.swipeNext();
        this.setState({startNew: true });
    },

        render: function () {
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <Settings startGame={this.startGame} />
                    <Timer startNew={this.state.startNew} />
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
