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

var paused = false;

var Timer = React.createClass({displayName: "Timer",

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
        this.setState({
            player1: timeMin,
            player2: timeMin,
            paused: false
        });
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
        React.createElement("div", {className: "swiper-slide timer"}, 
            React.createElement("div", {className: "row"}, 
                React.createElement("button", {className: "playButton", id: "player1", onClick: this.changeTurn.bind(this, "player1")}, "123")
            ), 
            React.createElement("div", {className: "row"}, 
                   React.createElement("button", {className: "menuButton", id: "pauseButton", onClick: this.pauseGame.bind(this, "")}, "Pause"), 
                   React.createElement("button", {className: "menuButton", id: "newGameButton", onClick: this.newGame()}, "New Game")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBqc3ggUmVhY3QuRE9NXG4gKi9cblxudmFyIFNldHRpbmdzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNldHRpbmdzXCIsXG5cbiAgICBzdGFydEdhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhteVN3aXBlcik7XG4gICAgICAgIG15U3dpcGVyLnN3aXBlTmV4dCgpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic3dpcGVyLXNsaWRlIHNldHRpbmdzXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDFcIiwgbnVsbCwgXCJDaGVzcyBUaW1lclwiKSwgXG5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHtuYW1lOiBcInRpbWVyLXNldHRpbmdcIiwgaWQ6IFwidGltZXItc2V0dGluZ1wiLCB0YWJpbmRleDogXCIxXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMVwifSwgXCIxIG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjNcIn0sIFwiMyBtaW5cIiksIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogXCI1XCJ9LCBcIjUgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMTBcIn0sIFwiMTAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMTVcIn0sIFwiMTUgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMjBcIn0sIFwiMjAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMjVcIn0sIFwiMjUgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMzBcIn0sIFwiMzAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiNDBcIn0sIFwiNDAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiNTBcIn0sIFwiNTAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiNjBcIn0sIFwiNjAgbWluXCIpXG4gICAgICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtpZDogXCJzdGFydEJ1dHRvblwiLCB2YWx1ZTogXCJcIiwgb25DbGljazogdGhpcy5zdGFydEdhbWV9LCBcIlN0YXJ0IVwiKVxuXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbnZhciBwYXVzZWQgPSBmYWxzZTtcblxudmFyIFRpbWVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlRpbWVyXCIsXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwbGF5ZXIxOiAwLFxuICAgICAgICAgICAgcGxheWVyMjogMCxcbiAgICAgICAgICAgIHR1cm46IFwicGxheWVyMVwiLFxuICAgICAgICAgICAgcGF1c2VkOiB0cnVlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRpbWVNaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyLXNldHRpbmdcIikudmFsdWUgKiA2MCAqIDEwO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBsYXllcjE6IHRpbWVNaW4sXG4gICAgICAgICAgICBwbGF5ZXIyOiB0aW1lTWluLFxuICAgICAgICAgICAgcGF1c2VkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5wbGF5ZXIxKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJ2dW9ybyBcIiArIHRoaXMuc3RhdGUudHVybik7XG4gICAgfSxcblxuICAgIGNoYW5nZVR1cm46IGZ1bmN0aW9uKHBsYXllcikge1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCJ0dXJuIG9uIFwiICsgdGhpcy5zdGF0ZS50dXJuKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucGF1c2VkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxPTFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlBFTEFBSkEgT04gXCIgKyBwbGF5ZXIpO1xuICAgICAgICBpZiAocGxheWVyID09IHBsYXllcjEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV0FUXCIpOyAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUudHVybiA9PSBcInBsYXllcjFcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3R1cm46IFwicGxheWVyMlwifSk7XG4gICAgICAgICAgIC8vICAgICB0aW1lUGxheWVyMSA9IChwYXJzZUludCh0aW1lUGxheWVyMSkgKyBwYXJzZUludChpbmNyZW1lbnRQMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUudHVybiA9PSBcInBsYXllcjJcIikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV1VUXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3R1cm46IFwicGxheWVyMVwifSk7XG4gICAgICAgICAgICAgLy8gICB0aW1lUGxheWVyMiA9IChwYXJzZUludCh0aW1lUGxheWVyMikgKyBwYXJzZUludChpbmNyZW1lbnRQMikpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwidHVybiBvbiBcIiArIHRoaXMuc3RhdGUudHVybik7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBzZXR0aW5nczogZnVuY3Rpb24oKSB7XG5cbiAgICB9LFxuXG4gICAgcGF1c2VHYW1lOiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcImdhbWUgcGF1c2UgY2hhbmdlZFwiKTtcbiAgICBpZiAocGF1c2VkKSB7XG4gICAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtwYXVzZWQ6IGZhbHNlIH0pO1xuICAgIC8vICAgIGNoYW5nZVBhdXNlVGV4dChcIlBhdXNlXCIpO1xuICAgICAvLyAgIHNldFRpbWVvdXQoJ0RlY3JlYXNlKCknLDEwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cGF1c2VkOiB0cnVlIH0pO1xuICAgLy8gICAgIGNoYW5nZVBhdXNlVGV4dChcIlVucGF1c2VcIik7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwicGF1c2VkIFwiICsgcGF1c2VkKTtcbiAgICB9LFxuXG4gICAgbmV3R2FtZTogZnVuY3Rpb24oKSB7XG5cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInN3aXBlci1zbGlkZSB0aW1lclwifSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicm93XCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtjbGFzc05hbWU6IFwicGxheUJ1dHRvblwiLCBpZDogXCJwbGF5ZXIxXCIsIG9uQ2xpY2s6IHRoaXMuY2hhbmdlVHVybi5iaW5kKHRoaXMsIFwicGxheWVyMVwiKX0sIFwiMTIzXCIpXG4gICAgICAgICAgICApLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJyb3dcIn0sIFxuICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJtZW51QnV0dG9uXCIsIGlkOiBcInBhdXNlQnV0dG9uXCIsIG9uQ2xpY2s6IHRoaXMucGF1c2VHYW1lLmJpbmQodGhpcywgXCJcIil9LCBcIlBhdXNlXCIpLCBcbiAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtjbGFzc05hbWU6IFwibWVudUJ1dHRvblwiLCBpZDogXCJuZXdHYW1lQnV0dG9uXCIsIG9uQ2xpY2s6IHRoaXMubmV3R2FtZSgpfSwgXCJOZXcgR2FtZVwiKVxuICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicm93XCJ9LCBcbiAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJwbGF5QnV0dG9uXCIsIGlkOiBcInBsYXllcjJcIiwgb25DbGljazogdGhpcy5jaGFuZ2VUdXJuLmJpbmQodGhpcywgXCJwbGF5ZXIyXCIpfSwgXCI0MjM0XCIpXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICApO1xuICAgIH1cbn0pO1xuXG5cblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJBcHBcIixcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG5cbiAgIFxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgIC8vICAgY29uc29sZS5sb2cobXlTd2lwZXIpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInN3aXBlci1jb250YWluZXJcIn0sIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJzd2lwZXItd3JhcHBlclwifSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2V0dGluZ3MsIG51bGwpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUaW1lciwgbnVsbClcbiAgICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicGFnaW5hdGlvblwifSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuUmVhY3QucmVuZGVyQ29tcG9uZW50KFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBwLCBudWxsKSxcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpXG4pO1xuIl19
