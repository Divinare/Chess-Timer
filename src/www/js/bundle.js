(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var Settings = React.createClass({displayName: "Settings",

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
            React.createElement("div", {className: "swiper-slide index"}, 
                React.createElement("div", {className: "settings"}, 
                    React.createElement("h1", null, "Chess Timer"), 

                    React.createElement("select", {name: "timer-setting", id: "timer-setting", tabindex: "1"}, 
                        React.createElement("option", {value: "1"}, "1 min"), 
                        React.createElement("option", {value: "3"}, "3 min"), 
                        React.createElement("option", {value: "5"}, "5 min"), 
                        React.createElement("option", {value: "10"}, "10 min"), 
                        React.createElement("option", {value: "15"}, "15 min"), 
                        React.createElement("option", {value: "20"}, "20 min"), 
                        React.createElement("option", {value: "25"}, "25 min"), 
                        React.createElement("option", {value: "30"}, "30 min"), 
                        React.createElement("option", {value: "40"}, "40 min"), 
                        React.createElement("option", {value: "50"}, "50 min"), 
                        React.createElement("option", {value: "60"}, "60 min")
                    ), 

                    React.createElement(AdvancedOptions, {incrementP1: this.state.incrementP1, incrementChanged: this.incrementChange}), 

                    React.createElement("br", null), 
                    React.createElement("a", {onClick: this.showAdvancedOptions}, this.state.showAdvancedOptions ? React.createElement("span", null, "Hide advanced options") : React.createElement("span", null, "Show advanced options")), 
                    React.createElement("br", null), 
                    React.createElement("button", {className: "settingsButton startButton", value: "", onClick: this.props.startGame}, "Start")
                )
            )
        );
    }
});

var AdvancedOptions = React.createClass({displayName: "AdvancedOptions",

    incrementChanged: function(event){
        this.props.incrementChanged(event.target.value);
    },

    render: function() {
        return (
            React.createElement("div", {id: "advancedOptions"}, 
                 "Increments", 
                    React.createElement("div", null, 
                    "P1", 
                       React.createElement("input", {type: "number", 
                          value: this.props.incrementPlayer1, 
                          onChange: this.incrementChanged})
                    ), 
                    React.createElement("div", null, 
                    "P2", 
                        React.createElement("input", {type: "number", 
                          value: this.props.incrementPlayer2, 
                          onChange: this.incrementChanged})
                    )
            )
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


var Timer = React.createClass({displayName: "Timer",

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
        React.createElement("div", {className: "swiper-slide timer"}, 
            React.createElement("div", {className: "row"}, 
                React.createElement("button", {className: "playButton top", id: "player1", onClick: this.changeTurn.bind(this, "player1")}, "123")
            ), 
            React.createElement("div", {className: "row"}, 
                   React.createElement("button", {className: "menuButton", id: "pauseButton", onClick: this.pauseGame.bind(this, "")}, "Pause"), 
                   React.createElement("button", {className: "menuButton", id: "newGameButton", onClick: this.newGame.bind(this, "")}, "New Game")
            ), 
            React.createElement("div", {className: "row"}, 
               React.createElement("button", {className: "playButton bottom", id: "player2", onClick: this.changeTurn.bind(this, "player2")}, "4234")
            )
        )
    );
    }
});



var App = React.createClass({displayName: "App",

    getInitialState: function() {

        return {startNew: false};
    },

    startGame: function() {
        mySwiper.swipeNext();
        this.setState({startNew: true });
    },

        render: function () {
        return (
            React.createElement("div", {className: "swiper-container"}, 
                React.createElement("div", {className: "swiper-wrapper"}, 
                    React.createElement(Settings, {startGame: this.startGame}), 
                    React.createElement(Timer, {startNew: this.state.startNew})
                ), 
                React.createElement("div", {className: "pagination"})
            )
        );
    }
});

React.renderComponent(

    React.createElement(App, null),
    document.getElementById('content')


);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAanN4IFJlYWN0LkRPTVxuICovXG5cbnZhciBTZXR0aW5ncyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTZXR0aW5nc1wiLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNob3dBZHZhbmNlZE9wdGlvbnM6IGZhbHNlLFxuICAgICAgICAgICAgaW5jcmVtZW50UDE6IDAsXG4gICAgICAgICAgICBpbmNyZW1lbnRQMjogMFxuICAgICAgICAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHdpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lci1zZXR0aW5nXCIpLm9mZnNldFdpZHRoO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyLXNldHRpbmdcIikuc3R5bGUud2lkdGggPSAod2lkdGggLSA1MCkgKydweCc7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBzaG93QWR2YW5jZWRPcHRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmKHRoaXMuc3RhdGUuc2hvd0FkdmFuY2VkT3B0aW9ucykge1xuICAgICAgICAgICAgJChcIiNhZHZhbmNlZE9wdGlvbnNcIikuaGlkZSgzMDApO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiI2FkdmFuY2VkT3B0aW9uc1wiKS5zaG93KDMwMCk7XG4gICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dBZHZhbmNlZE9wdGlvbnM6ICF0aGlzLnN0YXRlLnNob3dBZHZhbmNlZE9wdGlvbnMgfSk7XG4gICAgfSxcblxuICAgIGluY3JlbWVudENoYW5nZTogZnVuY3Rpb24odmFsdWUpe1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIHZhbDogXCIgKyB2YWx1ZSk7XG5cblxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic3dpcGVyLXNsaWRlIGluZGV4XCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic2V0dGluZ3NcIn0sIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDFcIiwgbnVsbCwgXCJDaGVzcyBUaW1lclwiKSwgXG5cbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7bmFtZTogXCJ0aW1lci1zZXR0aW5nXCIsIGlkOiBcInRpbWVyLXNldHRpbmdcIiwgdGFiaW5kZXg6IFwiMVwifSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogXCIxXCJ9LCBcIjEgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjNcIn0sIFwiMyBtaW5cIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiNVwifSwgXCI1IG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogXCIxMFwifSwgXCIxMCBtaW5cIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMTVcIn0sIFwiMTUgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjIwXCJ9LCBcIjIwIG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogXCIyNVwifSwgXCIyNSBtaW5cIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMzBcIn0sIFwiMzAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjQwXCJ9LCBcIjQwIG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogXCI1MFwifSwgXCI1MCBtaW5cIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiNjBcIn0sIFwiNjAgbWluXCIpXG4gICAgICAgICAgICAgICAgICAgICksIFxuXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQWR2YW5jZWRPcHRpb25zLCB7aW5jcmVtZW50UDE6IHRoaXMuc3RhdGUuaW5jcmVtZW50UDEsIGluY3JlbWVudENoYW5nZWQ6IHRoaXMuaW5jcmVtZW50Q2hhbmdlfSksIFxuXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJiclwiLCBudWxsKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtvbkNsaWNrOiB0aGlzLnNob3dBZHZhbmNlZE9wdGlvbnN9LCB0aGlzLnN0YXRlLnNob3dBZHZhbmNlZE9wdGlvbnMgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkhpZGUgYWR2YW5jZWQgb3B0aW9uc1wiKSA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiU2hvdyBhZHZhbmNlZCBvcHRpb25zXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJiclwiLCBudWxsKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJzZXR0aW5nc0J1dHRvbiBzdGFydEJ1dHRvblwiLCB2YWx1ZTogXCJcIiwgb25DbGljazogdGhpcy5wcm9wcy5zdGFydEdhbWV9LCBcIlN0YXJ0XCIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG52YXIgQWR2YW5jZWRPcHRpb25zID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkFkdmFuY2VkT3B0aW9uc1wiLFxuXG4gICAgaW5jcmVtZW50Q2hhbmdlZDogZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICB0aGlzLnByb3BzLmluY3JlbWVudENoYW5nZWQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcImFkdmFuY2VkT3B0aW9uc1wifSwgXG4gICAgICAgICAgICAgICAgIFwiSW5jcmVtZW50c1wiLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcbiAgICAgICAgICAgICAgICAgICAgXCJQMVwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcIm51bWJlclwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMuaW5jcmVtZW50UGxheWVyMSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmluY3JlbWVudENoYW5nZWR9KVxuICAgICAgICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcbiAgICAgICAgICAgICAgICAgICAgXCJQMlwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJudW1iZXJcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLmluY3JlbWVudFBsYXllcjIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5pbmNyZW1lbnRDaGFuZ2VkfSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH0gLy8gaHR0cDovL2pzYmluLmNvbS9yaXhpZG8vMi9lZGl0P2h0bWwsanMsb3V0cHV0XG59KTtcblxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNDAxOTQzMS9ob3ctdG8tcHJvcGVybHktdmFsaWRhdGUtaW5wdXQtdmFsdWVzLXdpdGgtcmVhY3QtanNcblxudmFyIHRpbWVQbGF5ZXIxOyAvLyAxMCBvZiB0aGlzIGlzIG9uZSBzZWNvbmRcbnZhciB0aW1lUGxheWVyMjsgLy8gMTAgb2YgdGhpcyBpcyBvbmUgc2Vjb25kXG52YXIgcGF1c2VkID0gZmFsc2U7XG52YXIgdHVybiA9IFwiXCI7XG52YXIgaW5jcmVtZW50UGxheWVyMSA9IDA7XG52YXIgaW5jcmVtZW50UGxheWVyMiA9IDA7XG52YXIgc3RhcnROZXcgPSB0cnVlO1xuXG5cbnZhciBUaW1lciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJUaW1lclwiLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIFxuICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5pbml0R2FtZSgpO1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwodGhpcy50aWNrLCAxMDApO1xuXG4gICAgfSxcblxuICAgIGNoYW5nZVR1cm46IGZ1bmN0aW9uKHBsYXllcikge1xuICAgICAgICBpZiAoc3RhcnROZXcpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlUGxheWVyVHVybihwbGF5ZXIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXVzZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSB3YXMgcGF1c2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlUGxheWVyVHVybihwbGF5ZXIpO1xuICAgIH0sXG5cbiAgICBjaGFuZ2VQbGF5ZXJUdXJuOiBmdW5jdGlvbihwbGF5ZXIpIHtcbiAgICAgICAgaWYoc3RhcnROZXcpIHtcbiAgICAgICAgICAgICBpZiAocGxheWVyID09IFwicGxheWVyMVwiKSB7XG4gICAgICAgICAgICAgICAgIHR1cm4gPSBcInBsYXllcjJcIjtcbiAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICB0dXJuID0gXCJwbGF5ZXIxXCI7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIHN0YXJ0TmV3ID0gZmFsc2U7XG4gICAgICAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocGxheWVyID09IFwicGxheWVyMVwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR1cm4gPT0gXCJwbGF5ZXIxXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdHVybiA9IFwicGxheWVyMlwiO1xuICAgICAgICAgICAgICAgLy8gICAgIHRpbWVQbGF5ZXIxID0gKHBhcnNlSW50KHRpbWVQbGF5ZXIxKSArIHBhcnNlSW50KGluY3JlbWVudFAxKSk7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0dXJuID09IFwicGxheWVyMlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHR1cm4gPSBcInBsYXllcjFcIjtcbiAgICAgICAgICAgICAgICAgLy8gICB0aW1lUGxheWVyMiA9IChwYXJzZUludCh0aW1lUGxheWVyMikgKyBwYXJzZUludChpbmNyZW1lbnRQMikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRUaW1lclRvUGxheWVyOiBmdW5jdGlvbihwbGF5ZXIpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBwbGF5ZXJUaW1lO1xuICAgICAgICBpZiAocGxheWVyID09IFwicGxheWVyMVwiKSB7XG4gICAgICAgICAgICBwbGF5ZXJUaW1lID0gdGltZVBsYXllcjE7IFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGxheWVyVGltZSA9IHRpbWVQbGF5ZXIyO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1pbnMgPSBNYXRoLmZsb29yKHBsYXllclRpbWUvMTAvNjApO1xuICAgICAgICB2YXIgc2VjcyA9IChNYXRoLmZsb29yKHBsYXllclRpbWUvMTApIC0gbWlucyo2MCk7XG4gICAgICAgIGlmIChzZWNzIDw9IDkpIHtcbiAgICAgICAgICAgIHNlY3MgPSBcIjBcIiArIHNlY3NcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWlsU2VjcyA9IHBsYXllclRpbWUudG9TdHJpbmcoKS5jaGFyQXQocGxheWVyVGltZS50b1N0cmluZygpLmxlbmd0aC0xKTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllcikuaW5uZXJIVE1MID0gbWlucyArIFwiOlwiICsgc2VjcyArIFwiOlwiICsgbWlsU2VjcztcbiAgICBcbiAgICB9LFxuXG4gICAgdGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChwYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnROZXcgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0dXJuID09IFwicGxheWVyMVwiKSB7XG4gICAgICAgICAgICB0aW1lUGxheWVyMS0tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGltZVBsYXllcjItLTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFRpbWVyVG9CdXR0b25zKCk7XG4gICAgICAgIHZhciBnYW1lRW5kID0gdGhpcy5pc0dhbWVFbmRlZCgpO1xuICAgICAgICBpZiAoZ2FtZUVuZCA9PSBcImdhbWVDb250aW51ZXNcIikge1xuICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCdEZWNyZWFzZSgpJywgMTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW5kR2FtZShnYW1lRW5kKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRUaW1lclRvQnV0dG9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0VGltZXJUb1BsYXllcihcInBsYXllcjFcIik7XG4gICAgICAgIHRoaXMuc2V0VGltZXJUb1BsYXllcihcInBsYXllcjJcIik7XG4gICAgfSxcblxuICAgIGlzR2FtZUVuZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRpbWVQbGF5ZXIxIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcInBsYXllcjJ3aW5zXCJcbiAgICAgICAgfSBlbHNlIGlmICh0aW1lUGxheWVyMiA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJwbGF5ZXIxd2luc1wiXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiZ2FtZUNvbnRpbnVlc1wiO1xuICAgIH0sXG5cbiAgICBwYXVzZUdhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgcGF1c2UgY2hhbmdlZFwiKTtcbiAgICAgICAgaWYgKHBhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYXVzZWRUbyhmYWxzZSk7XG4gICAgICAgIC8vICAgIGNoYW5nZVBhdXNlVGV4dChcIlBhdXNlXCIpO1xuICAgICAgICAgLy8gICBzZXRUaW1lb3V0KCdEZWNyZWFzZSgpJywxMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICB0aGlzLmNoYW5nZVBhdXNlZFRvKHRydWUpO1xuICAgICAgIC8vICAgICBjaGFuZ2VQYXVzZVRleHQoXCJVbnBhdXNlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGF1c2VkIFwiICsgcGF1c2VkKTtcbiAgICB9LFxuXG4gICAgY2hhbmdlUGF1c2VkVG86IGZ1bmN0aW9uKHBhdXNlKSB7XG4gICAgICAgIGlmKHBhdXNlKSB7XG4gICAgICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhdXNlQnV0dG9uJykuaW5uZXJIVE1MID0gXCJVbnBhdXNlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXVzZUJ1dHRvbicpLmlubmVySFRNTCA9IFwiUGF1c2VcIjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBuZXdHYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RhcnROZXcgPSB0cnVlO1xuICAgICAgICB0aGlzLmNoYW5nZVBhdXNlZFRvKGZhbHNlKTtcbiAgICAgICAgdGhpcy5pbml0R2FtZSgpO1xuICAgIH0sXG5cbiAgICBpbml0R2FtZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0aW1lTWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lci1zZXR0aW5nXCIpLnZhbHVlICogNjAgKiAxMDtcbiAgICAgICAgdGltZVBsYXllcjEgPSB0aW1lTWluO1xuICAgICAgICB0aW1lUGxheWVyMiA9IHRpbWVNaW47XG4gICAgICAgIHRoaXMuc2V0VGltZXJUb1BsYXllcihcInBsYXllcjFcIik7XG4gICAgICAgIHRoaXMuc2V0VGltZXJUb1BsYXllcihcInBsYXllcjJcIik7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZih0aGlzLnByb3BzLnN0YXJ0TmV3KSB7XG4gICAgICAgICAgICB0aGlzLm5ld0dhbWUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic3dpcGVyLXNsaWRlIHRpbWVyXCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJyb3dcIn0sIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJwbGF5QnV0dG9uIHRvcFwiLCBpZDogXCJwbGF5ZXIxXCIsIG9uQ2xpY2s6IHRoaXMuY2hhbmdlVHVybi5iaW5kKHRoaXMsIFwicGxheWVyMVwiKX0sIFwiMTIzXCIpXG4gICAgICAgICAgICApLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJyb3dcIn0sIFxuICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJtZW51QnV0dG9uXCIsIGlkOiBcInBhdXNlQnV0dG9uXCIsIG9uQ2xpY2s6IHRoaXMucGF1c2VHYW1lLmJpbmQodGhpcywgXCJcIil9LCBcIlBhdXNlXCIpLCBcbiAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtjbGFzc05hbWU6IFwibWVudUJ1dHRvblwiLCBpZDogXCJuZXdHYW1lQnV0dG9uXCIsIG9uQ2xpY2s6IHRoaXMubmV3R2FtZS5iaW5kKHRoaXMsIFwiXCIpfSwgXCJOZXcgR2FtZVwiKVxuICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicm93XCJ9LCBcbiAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJwbGF5QnV0dG9uIGJvdHRvbVwiLCBpZDogXCJwbGF5ZXIyXCIsIG9uQ2xpY2s6IHRoaXMuY2hhbmdlVHVybi5iaW5kKHRoaXMsIFwicGxheWVyMlwiKX0sIFwiNDIzNFwiKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgKTtcbiAgICB9XG59KTtcblxuXG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiQXBwXCIsXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiB7c3RhcnROZXc6IGZhbHNlfTtcbiAgICB9LFxuXG4gICAgc3RhcnRHYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbXlTd2lwZXIuc3dpcGVOZXh0KCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXJ0TmV3OiB0cnVlIH0pO1xuICAgIH0sXG5cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic3dpcGVyLWNvbnRhaW5lclwifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInN3aXBlci13cmFwcGVyXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZXR0aW5ncywge3N0YXJ0R2FtZTogdGhpcy5zdGFydEdhbWV9KSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGltZXIsIHtzdGFydE5ldzogdGhpcy5zdGF0ZS5zdGFydE5ld30pXG4gICAgICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInBhZ2luYXRpb25cIn0pXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cblJlYWN0LnJlbmRlckNvbXBvbmVudChcblxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBwLCBudWxsKSxcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpXG5cblxuKTtcbiJdfQ==
