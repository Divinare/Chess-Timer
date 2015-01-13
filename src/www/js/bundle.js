(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var Settings = React.createClass({displayName: "Settings",

    componentDidMount: function() {
        var width = document.getElementById("timer-setting").offsetWidth;
        document.getElementById("timer-setting").style.width = (width - 50) +'px';
        
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
                    React.createElement("br", null), 
                    React.createElement("button", {className: "startButton", value: "", onClick: this.props.startGame}, "Start!")
                )
            )
        );
    }
});

var timePlayer1; // 10 of this is one second
var timePlayer2; // 10 of this is one second
var paused = false;
var turn = "";
//var incrementP1 = 0;
//var incrementP2 = 0;
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
        console.log("starting new game!!");
        mySwiper.swipeNext();
        this.setState({startNew: true });
    },

        render: function () {
     //   console.log(mySwiper);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBqc3ggUmVhY3QuRE9NXG4gKi9cblxudmFyIFNldHRpbmdzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNldHRpbmdzXCIsXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB3aWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXItc2V0dGluZ1wiKS5vZmZzZXRXaWR0aDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lci1zZXR0aW5nXCIpLnN0eWxlLndpZHRoID0gKHdpZHRoIC0gNTApICsncHgnO1xuICAgICAgICBcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInN3aXBlci1zbGlkZSBpbmRleFwifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInNldHRpbmdzXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImgxXCIsIG51bGwsIFwiQ2hlc3MgVGltZXJcIiksIFxuXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwge25hbWU6IFwidGltZXItc2V0dGluZ1wiLCBpZDogXCJ0aW1lci1zZXR0aW5nXCIsIHRhYmluZGV4OiBcIjFcIn0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMVwifSwgXCIxIG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogXCIzXCJ9LCBcIjMgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjVcIn0sIFwiNSBtaW5cIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMTBcIn0sIFwiMTAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjE1XCJ9LCBcIjE1IG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogXCIyMFwifSwgXCIyMCBtaW5cIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMjVcIn0sIFwiMjUgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjMwXCJ9LCBcIjMwIG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogXCI0MFwifSwgXCI0MCBtaW5cIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiNTBcIn0sIFwiNTAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjYwXCJ9LCBcIjYwIG1pblwiKVxuICAgICAgICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7Y2xhc3NOYW1lOiBcInN0YXJ0QnV0dG9uXCIsIHZhbHVlOiBcIlwiLCBvbkNsaWNrOiB0aGlzLnByb3BzLnN0YXJ0R2FtZX0sIFwiU3RhcnQhXCIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG52YXIgdGltZVBsYXllcjE7IC8vIDEwIG9mIHRoaXMgaXMgb25lIHNlY29uZFxudmFyIHRpbWVQbGF5ZXIyOyAvLyAxMCBvZiB0aGlzIGlzIG9uZSBzZWNvbmRcbnZhciBwYXVzZWQgPSBmYWxzZTtcbnZhciB0dXJuID0gXCJcIjtcbi8vdmFyIGluY3JlbWVudFAxID0gMDtcbi8vdmFyIGluY3JlbWVudFAyID0gMDtcbnZhciBzdGFydE5ldyA9IHRydWU7XG5cblxudmFyIFRpbWVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlRpbWVyXCIsXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgXG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmluaXRHYW1lKCk7XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCh0aGlzLnRpY2ssIDEwMCk7XG5cbiAgICB9LFxuXG4gICAgY2hhbmdlVHVybjogZnVuY3Rpb24ocGxheWVyKSB7XG4gICAgICAgIGlmIChzdGFydE5ldykge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VQbGF5ZXJUdXJuKHBsYXllcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhdXNlZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIHdhcyBwYXVzZWRcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFuZ2VQbGF5ZXJUdXJuKHBsYXllcik7XG4gICAgfSxcblxuICAgIGNoYW5nZVBsYXllclR1cm46IGZ1bmN0aW9uKHBsYXllcikge1xuICAgICAgICBpZihzdGFydE5ldykge1xuICAgICAgICAgICAgIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXIxXCIpIHtcbiAgICAgICAgICAgICAgICAgdHVybiA9IFwicGxheWVyMlwiO1xuICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIHR1cm4gPSBcInBsYXllcjFcIjtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgc3RhcnROZXcgPSBmYWxzZTtcbiAgICAgICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXIxXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAodHVybiA9PSBcInBsYXllcjFcIikge1xuICAgICAgICAgICAgICAgICAgICB0dXJuID0gXCJwbGF5ZXIyXCI7XG4gICAgICAgICAgICAgICAvLyAgICAgdGltZVBsYXllcjEgPSAocGFyc2VJbnQodGltZVBsYXllcjEpICsgcGFyc2VJbnQoaW5jcmVtZW50UDEpKTtcbiAgICAgICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHR1cm4gPT0gXCJwbGF5ZXIyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdHVybiA9IFwicGxheWVyMVwiO1xuICAgICAgICAgICAgICAgICAvLyAgIHRpbWVQbGF5ZXIyID0gKHBhcnNlSW50KHRpbWVQbGF5ZXIyKSArIHBhcnNlSW50KGluY3JlbWVudFAyKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFRpbWVyVG9QbGF5ZXI6IGZ1bmN0aW9uKHBsYXllcikge1xuICAgICAgICBcbiAgICAgICAgdmFyIHBsYXllclRpbWU7XG4gICAgICAgIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXIxXCIpIHtcbiAgICAgICAgICAgIHBsYXllclRpbWUgPSB0aW1lUGxheWVyMTsgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbGF5ZXJUaW1lID0gdGltZVBsYXllcjI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWlucyA9IE1hdGguZmxvb3IocGxheWVyVGltZS8xMC82MCk7XG4gICAgICAgIHZhciBzZWNzID0gKE1hdGguZmxvb3IocGxheWVyVGltZS8xMCkgLSBtaW5zKjYwKTtcbiAgICAgICAgaWYgKHNlY3MgPD0gOSkge1xuICAgICAgICAgICAgc2VjcyA9IFwiMFwiICsgc2Vjc1xuICAgICAgICB9XG4gICAgICAgIHZhciBtaWxTZWNzID0gcGxheWVyVGltZS50b1N0cmluZygpLmNoYXJBdChwbGF5ZXJUaW1lLnRvU3RyaW5nKCkubGVuZ3RoLTEpO1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxheWVyKS5pbm5lckhUTUwgPSBtaW5zICsgXCI6XCIgKyBzZWNzICsgXCI6XCIgKyBtaWxTZWNzO1xuICAgIFxuICAgIH0sXG5cbiAgICB0aWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHBhdXNlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydE5ldyA9PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR1cm4gPT0gXCJwbGF5ZXIxXCIpIHtcbiAgICAgICAgICAgIHRpbWVQbGF5ZXIxLS07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aW1lUGxheWVyMi0tO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0VGltZXJUb0J1dHRvbnMoKTtcbiAgICAgICAgdmFyIGdhbWVFbmQgPSB0aGlzLmlzR2FtZUVuZGVkKCk7XG4gICAgICAgIGlmIChnYW1lRW5kID09IFwiZ2FtZUNvbnRpbnVlc1wiKSB7XG4gICAgICAgICAgIC8vIHNldFRpbWVvdXQoJ0RlY3JlYXNlKCknLCAxMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbmRHYW1lKGdhbWVFbmQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFRpbWVyVG9CdXR0b25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRUaW1lclRvUGxheWVyKFwicGxheWVyMVwiKTtcbiAgICAgICAgdGhpcy5zZXRUaW1lclRvUGxheWVyKFwicGxheWVyMlwiKTtcbiAgICB9LFxuXG4gICAgaXNHYW1lRW5kZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGltZVBsYXllcjEgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwicGxheWVyMndpbnNcIlxuICAgICAgICB9IGVsc2UgaWYgKHRpbWVQbGF5ZXIyIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcInBsYXllcjF3aW5zXCJcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJnYW1lQ29udGludWVzXCI7XG4gICAgfSxcblxuICAgIHBhdXNlR2FtZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBwYXVzZSBjaGFuZ2VkXCIpO1xuICAgICAgICBpZiAocGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVBhdXNlZFRvKGZhbHNlKTtcbiAgICAgICAgLy8gICAgY2hhbmdlUGF1c2VUZXh0KFwiUGF1c2VcIik7XG4gICAgICAgICAvLyAgIHNldFRpbWVvdXQoJ0RlY3JlYXNlKCknLDEwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIHRoaXMuY2hhbmdlUGF1c2VkVG8odHJ1ZSk7XG4gICAgICAgLy8gICAgIGNoYW5nZVBhdXNlVGV4dChcIlVucGF1c2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJwYXVzZWQgXCIgKyBwYXVzZWQpO1xuICAgIH0sXG5cbiAgICBjaGFuZ2VQYXVzZWRUbzogZnVuY3Rpb24ocGF1c2UpIHtcbiAgICAgICAgaWYocGF1c2UpIHtcbiAgICAgICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGF1c2VCdXR0b24nKS5pbm5lckhUTUwgPSBcIlVucGF1c2VcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhdXNlQnV0dG9uJykuaW5uZXJIVE1MID0gXCJQYXVzZVwiO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG5ld0dhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdGFydE5ldyA9IHRydWU7XG4gICAgICAgIHRoaXMuY2hhbmdlUGF1c2VkVG8oZmFsc2UpO1xuICAgICAgICB0aGlzLmluaXRHYW1lKCk7XG4gICAgfSxcblxuICAgIGluaXRHYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRpbWVNaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyLXNldHRpbmdcIikudmFsdWUgKiA2MCAqIDEwO1xuICAgICAgICB0aW1lUGxheWVyMSA9IHRpbWVNaW47XG4gICAgICAgIHRpbWVQbGF5ZXIyID0gdGltZU1pbjtcbiAgICAgICAgdGhpcy5zZXRUaW1lclRvUGxheWVyKFwicGxheWVyMVwiKTtcbiAgICAgICAgdGhpcy5zZXRUaW1lclRvUGxheWVyKFwicGxheWVyMlwiKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuc3RhcnROZXcpIHtcbiAgICAgICAgICAgIHRoaXMubmV3R2FtZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJzd2lwZXItc2xpZGUgdGltZXJcIn0sIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInJvd1wifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7Y2xhc3NOYW1lOiBcInBsYXlCdXR0b24gdG9wXCIsIGlkOiBcInBsYXllcjFcIiwgb25DbGljazogdGhpcy5jaGFuZ2VUdXJuLmJpbmQodGhpcywgXCJwbGF5ZXIxXCIpfSwgXCIxMjNcIilcbiAgICAgICAgICAgICksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInJvd1wifSwgXG4gICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7Y2xhc3NOYW1lOiBcIm1lbnVCdXR0b25cIiwgaWQ6IFwicGF1c2VCdXR0b25cIiwgb25DbGljazogdGhpcy5wYXVzZUdhbWUuYmluZCh0aGlzLCBcIlwiKX0sIFwiUGF1c2VcIiksIFxuICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJtZW51QnV0dG9uXCIsIGlkOiBcIm5ld0dhbWVCdXR0b25cIiwgb25DbGljazogdGhpcy5uZXdHYW1lLmJpbmQodGhpcywgXCJcIil9LCBcIk5ldyBHYW1lXCIpXG4gICAgICAgICAgICApLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJyb3dcIn0sIFxuICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7Y2xhc3NOYW1lOiBcInBsYXlCdXR0b24gYm90dG9tXCIsIGlkOiBcInBsYXllcjJcIiwgb25DbGljazogdGhpcy5jaGFuZ2VUdXJuLmJpbmQodGhpcywgXCJwbGF5ZXIyXCIpfSwgXCI0MjM0XCIpXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICApO1xuICAgIH1cbn0pO1xuXG5cblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJBcHBcIixcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgcmV0dXJuIHtzdGFydE5ldzogZmFsc2V9O1xuICAgIH0sXG5cbiAgICBzdGFydEdhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIG5ldyBnYW1lISFcIik7XG4gICAgICAgIG15U3dpcGVyLnN3aXBlTmV4dCgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGFydE5ldzogdHJ1ZSB9KTtcbiAgICB9LFxuXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAvLyAgIGNvbnNvbGUubG9nKG15U3dpcGVyKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJzd2lwZXItY29udGFpbmVyXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic3dpcGVyLXdyYXBwZXJcIn0sIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNldHRpbmdzLCB7c3RhcnRHYW1lOiB0aGlzLnN0YXJ0R2FtZX0pLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUaW1lciwge3N0YXJ0TmV3OiB0aGlzLnN0YXRlLnN0YXJ0TmV3fSlcbiAgICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicGFnaW5hdGlvblwifSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuUmVhY3QucmVuZGVyQ29tcG9uZW50KFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBwLCBudWxsKSxcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpXG4pO1xuIl19
