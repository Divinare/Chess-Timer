'use strict';

var React = require('react');
var Settings = require('./settings.jsx');
var Timer = require('./timer.jsx');
var Swiper = require('swiper');

var Content = React.createClass({
    getInitialState: function() {
    var aSettings = [];
    aSettings["incrementP1"] = 0;
    aSettings["incrementP2"] = 0;
		return {
			startNew: false,
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
      advancedSettings: aSettings
		};

	},

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
    this.handleUpdate();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
 
	handleUpdate: function() {
		  $(".playButton").css({"height": (this.state.windowHeight*0.43) + "px"});	
    	$(".playButton").css({"width": this.state.windowWidth + "px"});
    	$(".menuButton").css({"height": (this.state.windowHeight*0.14) + "px"});
	    $(".menuButton").css({"width": (this.state.windowWidth*0.5) + "px"});
  },

  updateAdvancedSettings: function(aSettings) {
      this.setState({
         advancedSettings: aSettings
      });
  },

  handleResize: function(e) {
    this.setState({
    	windowWidth: window.innerWidth,
    	windowHeight: window.innerHeight
    });
  },


	startGame: function() {
		swiper.swipeNext();
		this.setState({startNew: true });
	},
	render: function() {
		this.handleUpdate();
		return (
        <div className="swiper-container">
            <div className="swiper-wrapper">
                <Settings startGame={this.startGame}
                   updateAdvancedSettings={this.updateAdvancedSettings}
                   windowHeight={this.state.windowHeight}
                   windowWidth={this.state.windowWidth} />
                <Timer startNew={this.state.startNew}
                  advancedSettings={this.state.advancedSettings} />
        </div>
        <div className="pagination"></div>
        </div>
			
		);
	}
});

React.renderComponent(
  <Content />,
  document.getElementById('content')
);
