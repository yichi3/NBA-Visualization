import React, {Component} from 'react';
import {Icon, Input, AutoComplete} from 'antd';
import nba from '../nba-client';
import { PROFILE_PIC_URL_PREFIX } from '../constants';

const {Option} = AutoComplete;


class SearchBar extends Component {
    // store the auto-complete data source
    state = {
        dataSource: [],
    };

    render() {
        const {dataSource} = this.state;
        const options = dataSource.map(player => (
                <Option key={player.playerId}
                        value={player.fullName}
                        className="player-option">
                    <img src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}
                         alt={player.fullName}
                         className="player-option-image"/>
                    <span className="player-option-label">{player.fullName}</span>
                </Option>
        ));
        return (
            <AutoComplete
                className="search-bar"
                dataSource={options}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search NBA Player"
                size="large"
                optionLabelProp="value"
            >
                <Input
                    suffix={
                        <Icon type="search" className="certain-category-icon"/>
                    }
                />
            </AutoComplete>
        );
    }

    handleSearch = value => {
        // console.log(value);
        // const players = nba.searchPlayers(value);
        this.setState({
            dataSource: !value ?
                [] : nba.searchPlayers(value).map(player => ({
                    fullName: player.fullName,
                    playerId: player.playerId,
                }))
        });
    }

    onSelect = (name) => {
        console.log(name);
        this.props.handleSelectPlayer(name);
    }

}

export default SearchBar;