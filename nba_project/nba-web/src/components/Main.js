import React, {Component} from 'react';
import Profile from "./Profile";
import DataViewContainer from "./DataViewContainer"
import SearchBar from "./SearchBar"

import nba from '../nba-client';
import {DEFAULT_PLAYER_INFO} from '../constants';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            // default player is Stephen Curry
            playerInfo: DEFAULT_PLAYER_INFO,
        }
    }

    // lifecycle function to fetch data
    componentDidMount() {
        window.nba = nba;
        // const curry = nba.findPlayer('Stephen Curry');
        // console.log('this player ->', curry);
        this.loadPlayerInfo(DEFAULT_PLAYER_INFO.fullName);
    }

    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId })
            .then( info => {
                // console.log("This is API calls from nba.stats.playerInfo");
                // console.log(info);
                const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
                this.setState({
                    playerInfo: playerInfo
                })
            })
    }

    handleSelectPlayer = (playerName) => {
        // console.log("From Main.js");
        // console.log(playerName);
        this.loadPlayerInfo(playerName);
    }

    render() {
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>

                <div className="player">
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}

export default Main;