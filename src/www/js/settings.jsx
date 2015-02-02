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


    showAdvancedSettings: function() {
        if(this.state.showAdvancedOptions) {
            $("#advancedSettings").hide(300);
        } else {
            $("#advancedSettings").show(300);
        }
        this.setState({
            showAdvancedOptions: !this.state.showAdvancedOptions
        });
    },

    createAdvancedSettingsText: function() {



    },


    incrementChange: function(input, id){
         // if input is not a number and its length is > 0
       if(!parseInt("0"+input, 10) > 0 && input.length > 0) {
            return;
        }
        if(input.length == 0) {
            input = 0;
        }
        input = parseInt(input, 10);
        var aSettings = this.state.advancedSettings;
        if(id == 1) {
            aSettings["incrementP1"] = input;
        }
        if(id == 2) {
            aSettings["incrementP2"] = input;
        }

        this.setState({
            advancedSettings: aSettings
        });
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
                    <AdvancedSettings advancedSettings={this.state.advancedSettings} incrementChanged={this.incrementChange}/>

                    <br />
                    <a onClick={this.showAdvancedSettings}>{this.state.showAdvancedSettings ? <span>Hide advanced options</span> : <span>Show advanced options</span>}</a>
                    <br />
                    <button className="startButton" value="" onClick={this.props.startGame}>Start</button>
                </div>
            </div>
        );
    }
});

var AdvancedSettings = React.createClass({

    incrementChanged: function(event){
        this.props.incrementChanged(event.target.value, event.target.id);
    },

    render: function() {
        var settings = this.props.advancedSettings;
        return (
            <div id="advancedSettings">
            <h3>Increments:</h3>
                    <text>Player1: </text>
                    <div className="increments">
                       <input type="number"
                          id="1"
                          value={settings["incrementP1"]}
                          onChange={this.incrementChanged} />
                    </div>
                    <br />
                    <text>Player1: </text>
                    <div className="increments">
                        <input type="number"
                          id="2"
                          value={settings["incrementP2"]}
                          onChange={this.incrementChanged} />
                    </div>
            </div>
        );
    } // http://jsbin.com/rixido/2/edit?html,js,output
});

// http://stackoverflow.com/questions/24019431/how-to-properly-validate-input-values-with-react-js
