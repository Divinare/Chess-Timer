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

var Timer = React.createClass({displayName: "Timer",

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
        React.createElement("div", {className: "swiper-slide timer"}, 
            React.createElement("div", {className: "row"}, 
                React.createElement("button", {className: "playButton", id: "player1", onClick: this.changeTurn("player1")}, "123")
            ), 
            React.createElement("div", {className: "row"}, 
                   React.createElement("button", {className: "menuButton", id: "pauseButton", onClick: this.pauseGame()}, "Pause"), 
                   React.createElement("button", {className: "menuButton", id: "newGameButton", onClick: this.newGame()}, "New Game"), 
                   React.createElement("button", {className: "menuButton", id: "settingsButton", onClick: this.settings()}, "Settings")
            ), 
            React.createElement("div", {className: "row"}, 
               React.createElement("button", {className: "playButton", id: "player2", onClick: this.changeTurn("player2")}, "4234")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBqc3ggUmVhY3QuRE9NXG4gKi9cblxudmFyIFNldHRpbmdzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNldHRpbmdzXCIsXG5cbiAgICBzdGFydEdhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhteVN3aXBlcik7XG4gICAgICAgIG15U3dpcGVyLnN3aXBlTmV4dCgpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic3dpcGVyLXNsaWRlIHNldHRpbmdzXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDFcIiwgbnVsbCwgXCJDaGVzcyBUaW1lclwiKSwgXG5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHtuYW1lOiBcInRpbWVyLXNldHRpbmdcIiwgaWQ6IFwidGltZXItc2V0dGluZ1wiLCB0YWJpbmRleDogXCIxXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMVwifSwgXCIxIG1pblwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcIjNcIn0sIFwiMyBtaW5cIiksIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogXCI1XCJ9LCBcIjUgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMTBcIn0sIFwiMTAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMTVcIn0sIFwiMTUgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMjBcIn0sIFwiMjAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMjVcIn0sIFwiMjUgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiMzBcIn0sIFwiMzAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiNDBcIn0sIFwiNDAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiNTBcIn0sIFwiNTAgbWluXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiNjBcIn0sIFwiNjAgbWluXCIpXG4gICAgICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtpZDogXCJzdGFydEJ1dHRvblwiLCB2YWx1ZTogXCJcIiwgb25DbGljazogdGhpcy5zdGFydEdhbWV9LCBcIlN0YXJ0IVwiKVxuXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbnZhciBUaW1lciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJUaW1lclwiLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcblxuICAgIH0sXG5cbiAgICBjaGFuZ2VUdXJuOiBmdW5jdGlvbihwbGF5ZXJOYW1lKSB7XG5cblxuICAgIH0sXG5cbiAgICBzZXR0aW5nczogZnVuY3Rpb24oKSB7XG5cbiAgICB9LFxuXG4gICAgcGF1c2VHYW1lOiBmdW5jdGlvbigpIHtcblxuICAgIH0sXG5cbiAgICBuZXdHYW1lOiBmdW5jdGlvbigpIHtcblxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic3dpcGVyLXNsaWRlIHRpbWVyXCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJyb3dcIn0sIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJwbGF5QnV0dG9uXCIsIGlkOiBcInBsYXllcjFcIiwgb25DbGljazogdGhpcy5jaGFuZ2VUdXJuKFwicGxheWVyMVwiKX0sIFwiMTIzXCIpXG4gICAgICAgICAgICApLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJyb3dcIn0sIFxuICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJtZW51QnV0dG9uXCIsIGlkOiBcInBhdXNlQnV0dG9uXCIsIG9uQ2xpY2s6IHRoaXMucGF1c2VHYW1lKCl9LCBcIlBhdXNlXCIpLCBcbiAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtjbGFzc05hbWU6IFwibWVudUJ1dHRvblwiLCBpZDogXCJuZXdHYW1lQnV0dG9uXCIsIG9uQ2xpY2s6IHRoaXMubmV3R2FtZSgpfSwgXCJOZXcgR2FtZVwiKSwgXG4gICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7Y2xhc3NOYW1lOiBcIm1lbnVCdXR0b25cIiwgaWQ6IFwic2V0dGluZ3NCdXR0b25cIiwgb25DbGljazogdGhpcy5zZXR0aW5ncygpfSwgXCJTZXR0aW5nc1wiKVxuICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicm93XCJ9LCBcbiAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJwbGF5QnV0dG9uXCIsIGlkOiBcInBsYXllcjJcIiwgb25DbGljazogdGhpcy5jaGFuZ2VUdXJuKFwicGxheWVyMlwiKX0sIFwiNDIzNFwiKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgKTtcbiAgICB9XG59KTtcblxuXG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiQXBwXCIsXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuXG4gICBcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAvLyAgIGNvbnNvbGUubG9nKG15U3dpcGVyKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJzd2lwZXItY29udGFpbmVyXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic3dpcGVyLXdyYXBwZXJcIn0sIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNldHRpbmdzLCBudWxsKSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGltZXIsIG51bGwpXG4gICAgICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInBhZ2luYXRpb25cIn0pXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cblJlYWN0LnJlbmRlckNvbXBvbmVudChcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEFwcCwgbnVsbCksXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxuKTtcbiJdfQ==
