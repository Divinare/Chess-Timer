(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var Settings = React.createClass({displayName: "Settings",

    startGame: function() {
        console.log(mySwiper);
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
        var timeMin = document.getElementById("timer-setting").value * 60 * 10;
        timePlayer1 = timeMin;
        timePlayer2 = timeMin;
        this.setState({
            startTime: timeMin
        });
        this.setTimerToPlayer("player1");
        this.setTimerToPlayer("player2");
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
        
        console.log("turn changed to " + turn);
        
    },

    changePlayerTurn: function(player) {
        if(startNew) {
             if (player == "player1") {
                 turn = "player2";
             } else {
                 turn = "player1";
             }
             startNew = false;
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
        newGame = true;
        paused = true;
        timePlayer1 = this.state.startTime;
        timePlayer2 = this.state.startTime;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBqc3ggUmVhY3QuRE9NXG4gKi9cblxudmFyIFNldHRpbmdzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNldHRpbmdzXCIsXG5cbiAgICBzdGFydEdhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhteVN3aXBlcik7XG4gICAgICAgIG15U3dpcGVyLnN3aXBlTmV4dCgpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic3dpcGVyLXNsaWRlIHNldHRpbmdzXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDFcIiwgbnVsbCwgXCJDaGVzcyBUaW1lclwiKSwgXG5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHtuYW1lOiBcInRpbWVyLXNldHRpbmdcIiwgaWQ6IFwidGltZXItc2V0dGluZ1wiLCB0YWJpbmRleDogXCIxXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMVwifSwgXCIxIG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjNcIn0sIFwiMyBtaW5cIiksIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogXCI1XCJ9LCBcIjUgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMTBcIn0sIFwiMTAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMTVcIn0sIFwiMTUgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMjBcIn0sIFwiMjAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMjVcIn0sIFwiMjUgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMzBcIn0sIFwiMzAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiNDBcIn0sIFwiNDAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiNTBcIn0sIFwiNTAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiNjBcIn0sIFwiNjAgbWluXCIpXG4gICAgICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtpZDogXCJzdGFydEJ1dHRvblwiLCB2YWx1ZTogXCJcIiwgb25DbGljazogdGhpcy5zdGFydEdhbWV9LCBcIlN0YXJ0IVwiKVxuXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbnZhciB0aW1lUGxheWVyMTsgLy8gMTAgb2YgdGhpcyBpcyBvbmUgc2Vjb25kXG52YXIgdGltZVBsYXllcjI7IC8vIDEwIG9mIHRoaXMgaXMgb25lIHNlY29uZFxudmFyIHBhdXNlZCA9IGZhbHNlO1xudmFyIHR1cm4gPSBcIlwiO1xuLy92YXIgaW5jcmVtZW50UDEgPSAwO1xuLy92YXIgaW5jcmVtZW50UDIgPSAwO1xudmFyIHN0YXJ0TmV3ID0gdHJ1ZTtcblxuXG52YXIgVGltZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiVGltZXJcIixcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICBcbiAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0aW1lTWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lci1zZXR0aW5nXCIpLnZhbHVlICogNjAgKiAxMDtcbiAgICAgICAgdGltZVBsYXllcjEgPSB0aW1lTWluO1xuICAgICAgICB0aW1lUGxheWVyMiA9IHRpbWVNaW47XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc3RhcnRUaW1lOiB0aW1lTWluXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFRpbWVyVG9QbGF5ZXIoXCJwbGF5ZXIxXCIpO1xuICAgICAgICB0aGlzLnNldFRpbWVyVG9QbGF5ZXIoXCJwbGF5ZXIyXCIpO1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwodGhpcy50aWNrLCAxMDApO1xuICAgIH0sXG5cbiAgICBjaGFuZ2VUdXJuOiBmdW5jdGlvbihwbGF5ZXIpIHtcbiAgICAgICAgaWYgKHN0YXJ0TmV3KSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVBsYXllclR1cm4ocGxheWVyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF1c2VkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgd2FzIHBhdXNlZFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoYW5nZVBsYXllclR1cm4ocGxheWVyKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwidHVybiBjaGFuZ2VkIHRvIFwiICsgdHVybik7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBjaGFuZ2VQbGF5ZXJUdXJuOiBmdW5jdGlvbihwbGF5ZXIpIHtcbiAgICAgICAgaWYoc3RhcnROZXcpIHtcbiAgICAgICAgICAgICBpZiAocGxheWVyID09IFwicGxheWVyMVwiKSB7XG4gICAgICAgICAgICAgICAgIHR1cm4gPSBcInBsYXllcjJcIjtcbiAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICB0dXJuID0gXCJwbGF5ZXIxXCI7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIHN0YXJ0TmV3ID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocGxheWVyID09IFwicGxheWVyMVwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR1cm4gPT0gXCJwbGF5ZXIxXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdHVybiA9IFwicGxheWVyMlwiO1xuICAgICAgICAgICAgICAgLy8gICAgIHRpbWVQbGF5ZXIxID0gKHBhcnNlSW50KHRpbWVQbGF5ZXIxKSArIHBhcnNlSW50KGluY3JlbWVudFAxKSk7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0dXJuID09IFwicGxheWVyMlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHR1cm4gPSBcInBsYXllcjFcIjtcbiAgICAgICAgICAgICAgICAgLy8gICB0aW1lUGxheWVyMiA9IChwYXJzZUludCh0aW1lUGxheWVyMikgKyBwYXJzZUludChpbmNyZW1lbnRQMikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRUaW1lclRvUGxheWVyOiBmdW5jdGlvbihwbGF5ZXIpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBwbGF5ZXJUaW1lO1xuICAgICAgICBpZiAocGxheWVyID09IFwicGxheWVyMVwiKSB7XG4gICAgICAgICAgICBwbGF5ZXJUaW1lID0gdGltZVBsYXllcjE7IFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGxheWVyVGltZSA9IHRpbWVQbGF5ZXIyO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1pbnMgPSBNYXRoLmZsb29yKHBsYXllclRpbWUvMTAvNjApO1xuICAgICAgICB2YXIgc2VjcyA9IChNYXRoLmZsb29yKHBsYXllclRpbWUvMTApIC0gbWlucyo2MCk7XG4gICAgICAgIGlmIChzZWNzIDw9IDkpIHtcbiAgICAgICAgICAgIHNlY3MgPSBcIjBcIiArIHNlY3NcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWlsU2VjcyA9IHBsYXllclRpbWUudG9TdHJpbmcoKS5jaGFyQXQocGxheWVyVGltZS50b1N0cmluZygpLmxlbmd0aC0xKTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllcikuaW5uZXJIVE1MID0gbWlucyArIFwiOlwiICsgc2VjcyArIFwiOlwiICsgbWlsU2VjcztcbiAgICBcbiAgICB9LFxuXG4gICAgdGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChwYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnROZXcgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0dXJuID09IFwicGxheWVyMVwiKSB7XG4gICAgICAgICAgICB0aW1lUGxheWVyMS0tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGltZVBsYXllcjItLTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFRpbWVyVG9CdXR0b25zKCk7XG4gICAgICAgIHZhciBnYW1lRW5kID0gdGhpcy5pc0dhbWVFbmRlZCgpO1xuICAgICAgICBpZiAoZ2FtZUVuZCA9PSBcImdhbWVDb250aW51ZXNcIikge1xuICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCdEZWNyZWFzZSgpJywgMTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW5kR2FtZShnYW1lRW5kKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRUaW1lclRvQnV0dG9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0VGltZXJUb1BsYXllcihcInBsYXllcjFcIik7XG4gICAgICAgIHRoaXMuc2V0VGltZXJUb1BsYXllcihcInBsYXllcjJcIik7XG4gICAgfSxcblxuICAgIGlzR2FtZUVuZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRpbWVQbGF5ZXIxIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcInBsYXllcjJ3aW5zXCJcbiAgICAgICAgfSBlbHNlIGlmICh0aW1lUGxheWVyMiA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJwbGF5ZXIxd2luc1wiXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiZ2FtZUNvbnRpbnVlc1wiO1xuICAgIH0sXG5cbiAgICBwYXVzZUdhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgcGF1c2UgY2hhbmdlZFwiKTtcbiAgICAgICAgaWYgKHBhdXNlZCkge1xuICAgICAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIC8vICAgIGNoYW5nZVBhdXNlVGV4dChcIlBhdXNlXCIpO1xuICAgICAgICAgLy8gICBzZXRUaW1lb3V0KCdEZWNyZWFzZSgpJywxMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAvLyAgICAgY2hhbmdlUGF1c2VUZXh0KFwiVW5wYXVzZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcInBhdXNlZCBcIiArIHBhdXNlZCk7XG4gICAgfSxcblxuICAgIG5ld0dhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBuZXdHYW1lID0gdHJ1ZTtcbiAgICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGltZVBsYXllcjEgPSB0aGlzLnN0YXRlLnN0YXJ0VGltZTtcbiAgICAgICAgdGltZVBsYXllcjIgPSB0aGlzLnN0YXRlLnN0YXJ0VGltZTtcbiAgICAgICAgdGhpcy5zZXRUaW1lclRvUGxheWVyKFwicGxheWVyMVwiKTtcbiAgICAgICAgdGhpcy5zZXRUaW1lclRvUGxheWVyKFwicGxheWVyMlwiKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInN3aXBlci1zbGlkZSB0aW1lclwifSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicm93XCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtjbGFzc05hbWU6IFwicGxheUJ1dHRvblwiLCBpZDogXCJwbGF5ZXIxXCIsIG9uQ2xpY2s6IHRoaXMuY2hhbmdlVHVybi5iaW5kKHRoaXMsIFwicGxheWVyMVwiKX0sIFwiMTIzXCIpXG4gICAgICAgICAgICApLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJyb3dcIn0sIFxuICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJtZW51QnV0dG9uXCIsIGlkOiBcInBhdXNlQnV0dG9uXCIsIG9uQ2xpY2s6IHRoaXMucGF1c2VHYW1lLmJpbmQodGhpcywgXCJcIil9LCBcIlBhdXNlXCIpLCBcbiAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtjbGFzc05hbWU6IFwibWVudUJ1dHRvblwiLCBpZDogXCJuZXdHYW1lQnV0dG9uXCIsIG9uQ2xpY2s6IHRoaXMubmV3R2FtZS5iaW5kKHRoaXMsIFwiXCIpfSwgXCJOZXcgR2FtZVwiKVxuICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicm93XCJ9LCBcbiAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJwbGF5QnV0dG9uXCIsIGlkOiBcInBsYXllcjJcIiwgb25DbGljazogdGhpcy5jaGFuZ2VUdXJuLmJpbmQodGhpcywgXCJwbGF5ZXIyXCIpfSwgXCI0MjM0XCIpXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICApO1xuICAgIH1cbn0pO1xuXG5cblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJBcHBcIixcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG5cbiAgIFxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgIC8vICAgY29uc29sZS5sb2cobXlTd2lwZXIpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInN3aXBlci1jb250YWluZXJcIn0sIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJzd2lwZXItd3JhcHBlclwifSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2V0dGluZ3MsIG51bGwpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUaW1lciwgbnVsbClcbiAgICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicGFnaW5hdGlvblwifSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuUmVhY3QucmVuZGVyQ29tcG9uZW50KFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBwLCBudWxsKSxcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpXG4pO1xuIl19
