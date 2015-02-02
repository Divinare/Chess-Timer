/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({

    getInitialState: function() {
        var aSettings = [];
        aSettings["incrementP1"] = 0;
        aSettings["incrementP2"] = 0;
        return {
            showAdvancedOptions: false,
            advancedSettings: aSettings
             };
    },

    componentDidMount: function() {
        this.handleUpdate();
    },

    handleUpdate: function() {
        $("#timer-setting").css({"width": (this.props.windowWidth-100) + "px"});
    },


    showAdvancedOptions: function() {
        if(this.state.showAdvancedOptions) {
            $("#advancedOptions").hide(300);
        } else {
            $("#advancedOptions").show(300);
        }
        this.setState({
            showAdvancedOptions: !this.state.showAdvancedOptions
        });
    },

    incrementChange: function(value){
       // console.log("thasd " + this.state.advancedSettings["incrementP1"]);
       // var advancedSettings = this.state.advancedSettings;
       // advancedSettings["incrementP1"] = value; ...

      //  this.setState({
          //  advancedSettings["incrementP1"] = value;
   //     });
        console.log(" val: " + value);


    },

    render: function () {
        this.handleUpdate();
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

                    <AdvancedOptions advancedSettings={this.state.advancedSettings} incrementChanged={this.incrementChange}/>

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
        var settings = this.props.advancedSettings;
        return (
            <div id="advancedOptions">
                 Increments
                    <div className="increments">
                    P1
                       <input type="number"
                          value={settings["incrementP1"]}
                          onChange={this.incrementChanged} />
                    </div>
                    <div className="increments">
                    P2
                        <input type="number"
                          value={settings["incrementP2"]}
                          onChange={this.incrementChanged} />
                    </div>
            </div>
        );
    } // http://jsbin.com/rixido/2/edit?html,js,output
});

// http://stackoverflow.com/questions/24019431/how-to-properly-validate-input-values-with-react-js
