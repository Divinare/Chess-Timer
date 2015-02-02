'use strict';

var React = require('react');

module.exports = React.createClass({

    getInitialState: function() {
        var aSettings = [];
        aSettings["incrementP1"] = 0;
        aSettings["incrementP2"] = 0;
        return {
            showAdvancedSettings: false,
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
        if(this.state.showAdvancedSettings) {
            $("#advancedSettings").hide(300);
        } else {
            $("#advancedSettings").show(300);
        }
        this.setState({
            showAdvancedSettings: !this.state.showAdvancedSettings
        });
    },

    resetSetting: function(id) {
        var aSettings = this.state.advancedSettings;
        aSettings[id] = 0;
        this.setState({
            advancedSettings: aSettings
        });
    },

    incrementChange: function(input, id){
         // if input is not a number and its length is > 0
       if(!parseInt("0"+input, 10) > 0 && input.length > 0) {
            return;
        }
        if(input.length == 0) {
            input = 0;
        }
        if(input > 99) {
            input = 99;
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
        this.updateAdvancedSettings();
    },

    updateAdvancedSettings: function() {
        this.props.updateAdvancedSettings(this.state.advancedSettings);
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
                    {this.state.showAdvancedSettings == false ?
                        <AdvancedSettingsText
                        advancedSettings={this.state.advancedSettings}
                        resetSetting={this.resetSetting}
                        show={true} /> : null }
                    
                    <AdvancedSettings
                    advancedSettings={this.state.advancedSettings}
                    incrementChanged={this.incrementChange} />

                    <br />
                    <a onClick={this.showAdvancedSettings}>{this.state.showAdvancedSettings ? <span>Hide advanced options</span> : <span>Show advanced options</span>}</a>
                    <br />
                    <button className="startButton" value="" onClick={this.props.startGame}>Start</button>
                </div>
            </div>
        );
    }
});

var AdvancedSettingsText = React.createClass({

    resetSetting: function(ad) {
        console.log("wat " + ad);
    },

    render: function() {
        var incrementP1 = this.props.advancedSettings["incrementP1"];
        var incrementP2 = this.props.advancedSettings["incrementP2"];
        var showSettingsText = false;
        if(incrementP1 > 0 || incrementP2 > 0) {
            showSettingsText = true;
        }
        return(
            <span>
                { incrementP1 > 0 ? <td><AdvancedSetting text={"Player1 increment " + incrementP1} id={"incrementP1"} resetSetting={this.props.resetSetting} /></td> : null}
                { incrementP2 > 0 ? <td><AdvancedSetting text={"Player2 increment " + incrementP2} id={"incrementP2"} resetSetting={this.props.resetSetting}/></td> : null}
            </span>

            );
    }
});

var AdvancedSetting = React.createClass({

    render: function() {
        return (
            <div>
                 {this.props.text + " "}<a id="advancedSetting" onClick={this.props.resetSetting.bind(null, this.props.id)}>[x]</a>
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
            <h3>Time increments:</h3>
                    <text>Player1: </text>
                    <div className="increments">
                        <input type="number"
                            id="1"
                            value={settings["incrementP1"]}
                            onChange={this.incrementChanged} />
                    </div>
                    <text> seconds</text>
                    <br />
                    <text>Player1: </text>
                    <div className="increments">
                        <input type="number"
                            id="2"
                            value={settings["incrementP2"]}
                            onChange={this.incrementChanged} />
                    </div>
                    <text> seconds</text>
            </div>
        );
    }
});
