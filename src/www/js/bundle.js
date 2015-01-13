(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var Settings = React.createClass({displayName: "Settings",

    startGame: function() {
        mySwiper.swipeNext();
    },

    render: function () {
        
        return (
            React.createElement("div", {className: "swiper-slide settings"}, 
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
               
                React.createElement("button", {id: "startButton", value: "", onClick: this.startGame}, "Start!")

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
        console.log("START NEW IS " +startNew);
        if (startNew) {
            this.changePlayerTurn(player);
            return;
        }
        if (paused) {
            console.log("game was paused");
            return;
        }
        this.changePlayerTurn(player);
        
        console.log("turn changed to " + turn);
        
    },

    changePlayerTurn: function(player) {
        if(startNew) {
             if (player == "player1") {
                 turn = "player2";
             } else {
                 turn = "player1";
             }
             console.log("changed to false");
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
            paused = false;
        //    changePauseText("Pause");
         //   setTimeout('Decrease()',100);
        } else {
            paused = true;
       //     changePauseText("Unpause");
        }
        console.log("paused " + paused);
    },

    newGame: function() {
        startNew = true;
        paused = true;
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

        return (
        React.createElement("div", {className: "swiper-slide timer"}, 
            React.createElement("div", {className: "row"}, 
                React.createElement("button", {className: "playButton", id: "player1", onClick: this.changeTurn.bind(this, "player1")}, "123")
            ), 
            React.createElement("div", {className: "row"}, 
                   React.createElement("button", {className: "menuButton", id: "pauseButton", onClick: this.pauseGame.bind(this, "")}, "Pause"), 
                   React.createElement("button", {className: "menuButton", id: "newGameButton", onClick: this.newGame.bind(this, "")}, "New Game")
            ), 
            React.createElement("div", {className: "row"}, 
               React.createElement("button", {className: "playButton", id: "player2", onClick: this.changeTurn.bind(this, "player2")}, "4234")
            )
        )
    );
    }
});



var App = React.createClass({displayName: "App",

    getInitialState: function() {

   

        return null;
    },

        render: function () {
     //   console.log(mySwiper);
        return (
            React.createElement("div", {className: "swiper-container"}, 
                React.createElement("div", {className: "swiper-wrapper"}, 
                    React.createElement(Settings, null), 
                    React.createElement(Timer, null)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBqc3ggUmVhY3QuRE9NXG4gKi9cblxudmFyIFNldHRpbmdzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNldHRpbmdzXCIsXG5cbiAgICBzdGFydEdhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBteVN3aXBlci5zd2lwZU5leHQoKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInN3aXBlci1zbGlkZSBzZXR0aW5nc1wifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImgxXCIsIG51bGwsIFwiQ2hlc3MgVGltZXJcIiksIFxuXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7bmFtZTogXCJ0aW1lci1zZXR0aW5nXCIsIGlkOiBcInRpbWVyLXNldHRpbmdcIiwgdGFiaW5kZXg6IFwiMVwifSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjFcIn0sIFwiMSBtaW5cIiksIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogXCIzXCJ9LCBcIjMgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiNVwifSwgXCI1IG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjEwXCJ9LCBcIjEwIG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjE1XCJ9LCBcIjE1IG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjIwXCJ9LCBcIjIwIG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjI1XCJ9LCBcIjI1IG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjMwXCJ9LCBcIjMwIG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjQwXCJ9LCBcIjQwIG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjUwXCJ9LCBcIjUwIG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjYwXCJ9LCBcIjYwIG1pblwiKVxuICAgICAgICAgICAgICAgICksIFxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7aWQ6IFwic3RhcnRCdXR0b25cIiwgdmFsdWU6IFwiXCIsIG9uQ2xpY2s6IHRoaXMuc3RhcnRHYW1lfSwgXCJTdGFydCFcIilcblxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG52YXIgdGltZVBsYXllcjE7IC8vIDEwIG9mIHRoaXMgaXMgb25lIHNlY29uZFxudmFyIHRpbWVQbGF5ZXIyOyAvLyAxMCBvZiB0aGlzIGlzIG9uZSBzZWNvbmRcbnZhciBwYXVzZWQgPSBmYWxzZTtcbnZhciB0dXJuID0gXCJcIjtcbi8vdmFyIGluY3JlbWVudFAxID0gMDtcbi8vdmFyIGluY3JlbWVudFAyID0gMDtcbnZhciBzdGFydE5ldyA9IHRydWU7XG5cblxudmFyIFRpbWVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlRpbWVyXCIsXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgXG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmluaXRHYW1lKCk7XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCh0aGlzLnRpY2ssIDEwMCk7XG4gICAgfSxcblxuICAgIGNoYW5nZVR1cm46IGZ1bmN0aW9uKHBsYXllcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNUQVJUIE5FVyBJUyBcIiArc3RhcnROZXcpO1xuICAgICAgICBpZiAoc3RhcnROZXcpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlUGxheWVyVHVybihwbGF5ZXIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXVzZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSB3YXMgcGF1c2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlUGxheWVyVHVybihwbGF5ZXIpO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCJ0dXJuIGNoYW5nZWQgdG8gXCIgKyB0dXJuKTtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIGNoYW5nZVBsYXllclR1cm46IGZ1bmN0aW9uKHBsYXllcikge1xuICAgICAgICBpZihzdGFydE5ldykge1xuICAgICAgICAgICAgIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXIxXCIpIHtcbiAgICAgICAgICAgICAgICAgdHVybiA9IFwicGxheWVyMlwiO1xuICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIHR1cm4gPSBcInBsYXllcjFcIjtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2VkIHRvIGZhbHNlXCIpO1xuICAgICAgICAgICAgIHN0YXJ0TmV3ID0gZmFsc2U7XG4gICAgICAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocGxheWVyID09IFwicGxheWVyMVwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR1cm4gPT0gXCJwbGF5ZXIxXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdHVybiA9IFwicGxheWVyMlwiO1xuICAgICAgICAgICAgICAgLy8gICAgIHRpbWVQbGF5ZXIxID0gKHBhcnNlSW50KHRpbWVQbGF5ZXIxKSArIHBhcnNlSW50KGluY3JlbWVudFAxKSk7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0dXJuID09IFwicGxheWVyMlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHR1cm4gPSBcInBsYXllcjFcIjtcbiAgICAgICAgICAgICAgICAgLy8gICB0aW1lUGxheWVyMiA9IChwYXJzZUludCh0aW1lUGxheWVyMikgKyBwYXJzZUludChpbmNyZW1lbnRQMikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRUaW1lclRvUGxheWVyOiBmdW5jdGlvbihwbGF5ZXIpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBwbGF5ZXJUaW1lO1xuICAgICAgICBpZiAocGxheWVyID09IFwicGxheWVyMVwiKSB7XG4gICAgICAgICAgICBwbGF5ZXJUaW1lID0gdGltZVBsYXllcjE7IFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGxheWVyVGltZSA9IHRpbWVQbGF5ZXIyO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1pbnMgPSBNYXRoLmZsb29yKHBsYXllclRpbWUvMTAvNjApO1xuICAgICAgICB2YXIgc2VjcyA9IChNYXRoLmZsb29yKHBsYXllclRpbWUvMTApIC0gbWlucyo2MCk7XG4gICAgICAgIGlmIChzZWNzIDw9IDkpIHtcbiAgICAgICAgICAgIHNlY3MgPSBcIjBcIiArIHNlY3NcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWlsU2VjcyA9IHBsYXllclRpbWUudG9TdHJpbmcoKS5jaGFyQXQocGxheWVyVGltZS50b1N0cmluZygpLmxlbmd0aC0xKTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllcikuaW5uZXJIVE1MID0gbWlucyArIFwiOlwiICsgc2VjcyArIFwiOlwiICsgbWlsU2VjcztcbiAgICBcbiAgICB9LFxuXG4gICAgdGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChwYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnROZXcgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0dXJuID09IFwicGxheWVyMVwiKSB7XG4gICAgICAgICAgICB0aW1lUGxheWVyMS0tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGltZVBsYXllcjItLTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFRpbWVyVG9CdXR0b25zKCk7XG4gICAgICAgIHZhciBnYW1lRW5kID0gdGhpcy5pc0dhbWVFbmRlZCgpO1xuICAgICAgICBpZiAoZ2FtZUVuZCA9PSBcImdhbWVDb250aW51ZXNcIikge1xuICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCdEZWNyZWFzZSgpJywgMTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW5kR2FtZShnYW1lRW5kKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRUaW1lclRvQnV0dG9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0VGltZXJUb1BsYXllcihcInBsYXllcjFcIik7XG4gICAgICAgIHRoaXMuc2V0VGltZXJUb1BsYXllcihcInBsYXllcjJcIik7XG4gICAgfSxcblxuICAgIGlzR2FtZUVuZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRpbWVQbGF5ZXIxIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcInBsYXllcjJ3aW5zXCJcbiAgICAgICAgfSBlbHNlIGlmICh0aW1lUGxheWVyMiA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJwbGF5ZXIxd2luc1wiXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiZ2FtZUNvbnRpbnVlc1wiO1xuICAgIH0sXG5cbiAgICBwYXVzZUdhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgcGF1c2UgY2hhbmdlZFwiKTtcbiAgICAgICAgaWYgKHBhdXNlZCkge1xuICAgICAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIC8vICAgIGNoYW5nZVBhdXNlVGV4dChcIlBhdXNlXCIpO1xuICAgICAgICAgLy8gICBzZXRUaW1lb3V0KCdEZWNyZWFzZSgpJywxMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAvLyAgICAgY2hhbmdlUGF1c2VUZXh0KFwiVW5wYXVzZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcInBhdXNlZCBcIiArIHBhdXNlZCk7XG4gICAgfSxcblxuICAgIG5ld0dhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdGFydE5ldyA9IHRydWU7XG4gICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaW5pdEdhbWUoKTtcbiAgICB9LFxuXG4gICAgaW5pdEdhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGltZU1pbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXItc2V0dGluZ1wiKS52YWx1ZSAqIDYwICogMTA7XG4gICAgICAgIHRpbWVQbGF5ZXIxID0gdGltZU1pbjtcbiAgICAgICAgdGltZVBsYXllcjIgPSB0aW1lTWluO1xuICAgICAgICB0aGlzLnNldFRpbWVyVG9QbGF5ZXIoXCJwbGF5ZXIxXCIpO1xuICAgICAgICB0aGlzLnNldFRpbWVyVG9QbGF5ZXIoXCJwbGF5ZXIyXCIpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic3dpcGVyLXNsaWRlIHRpbWVyXCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJyb3dcIn0sIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJwbGF5QnV0dG9uXCIsIGlkOiBcInBsYXllcjFcIiwgb25DbGljazogdGhpcy5jaGFuZ2VUdXJuLmJpbmQodGhpcywgXCJwbGF5ZXIxXCIpfSwgXCIxMjNcIilcbiAgICAgICAgICAgICksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInJvd1wifSwgXG4gICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7Y2xhc3NOYW1lOiBcIm1lbnVCdXR0b25cIiwgaWQ6IFwicGF1c2VCdXR0b25cIiwgb25DbGljazogdGhpcy5wYXVzZUdhbWUuYmluZCh0aGlzLCBcIlwiKX0sIFwiUGF1c2VcIiksIFxuICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJtZW51QnV0dG9uXCIsIGlkOiBcIm5ld0dhbWVCdXR0b25cIiwgb25DbGljazogdGhpcy5uZXdHYW1lLmJpbmQodGhpcywgXCJcIil9LCBcIk5ldyBHYW1lXCIpXG4gICAgICAgICAgICApLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJyb3dcIn0sIFxuICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7Y2xhc3NOYW1lOiBcInBsYXlCdXR0b25cIiwgaWQ6IFwicGxheWVyMlwiLCBvbkNsaWNrOiB0aGlzLmNoYW5nZVR1cm4uYmluZCh0aGlzLCBcInBsYXllcjJcIil9LCBcIjQyMzRcIilcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICk7XG4gICAgfVxufSk7XG5cblxuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkFwcFwiLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcblxuICAgXG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgLy8gICBjb25zb2xlLmxvZyhteVN3aXBlcik7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic3dpcGVyLWNvbnRhaW5lclwifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInN3aXBlci13cmFwcGVyXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZXR0aW5ncywgbnVsbCksIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRpbWVyLCBudWxsKVxuICAgICAgICAgICAgICAgICksIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJwYWdpbmF0aW9uXCJ9KVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5SZWFjdC5yZW5kZXJDb21wb25lbnQoXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChBcHAsIG51bGwpLFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jylcbik7XG4iXX0=
