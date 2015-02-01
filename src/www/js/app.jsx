
var React = require('react');
var Settings = require('./settings.jsx');
var Timer = require('./timer.jsx');
var Swiper = require('swiper');

var Content = React.createClass({
	getInitialState: function() {

		return {startNew: false};
	},

	startGame: function() {
		mySwiper.swipeNext();
		this.setState({startNew: true });
	},
	render: function() {

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

//React.renderComponent(<Content />, document.getElementById('content'));

React.renderComponent(
  <Content />,
  document.getElementById('content')
);