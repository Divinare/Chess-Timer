var React = require('react');
var Settings = require('./settings.jsx');
var Timer = require('./timer.jsx');
var Swiper = require('swiper');

var Content = React.createClass({
	getInitialState: function() {
		return {
			startNew: false,
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
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



  handleResize: function(e) {
  	console.log("resized: " + this.state.windowWidth);
    this.setState({
    	windowWidth: window.innerWidth,
    	windowHeight: window.innerHeight
    });
  //  this.forceUpdate();
  },


	startGame: function() {
		mySwiper.swipeNext();
		this.setState({startNew: true });
	},
	render: function() {
		this.handleUpdate();
		return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <Settings startGame={this.startGame} windowHeight={this.state.windowHeight} windowWidth={this.state.windowWidth} />
                    <Timer startNew={this.state.startNew} />
                    </div>
                <div className="pagination"></div>
            </div>
			
		);
	}
});

//React.renderComponent(<Content />, document.getElementById('content'));

React.renderComponent(
  <Content />,
  document.getElementById('content')
);