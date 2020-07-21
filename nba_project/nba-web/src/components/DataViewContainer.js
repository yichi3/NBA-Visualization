import React, {Component} from 'react';
import _ from 'lodash'
import { Radio, Row, Col, Switch } from 'antd';

import ShotChart from "./ShotChart"
import CounterSlider from "./CounterSlider"

class DataViewContainer extends Component {
    state = {
        minCount: 1,
        chartType: 'hexbin',
        displayTooltip: true,
    }

    render() {
        return (
            <div className="data-view">

                <ShotChart
                    playerId={this.props.playerId}
                    minCount={this.state.minCount}
                    chartType={this.state.chartType}
                    displayTooltip={this.state.displayTooltip}
                />

                <div className="filters">
                    {
                        // we only need the filter slider in the hexbin mode
                        this.state.chartType === "hexbin" ?
                            <CounterSlider
                                minCount={this.state.minCount}
                                onCountSliderChange={
                                    _.debounce(this.onCountSliderChange, 500)
                                }
                            />
                            : null
                    }
                    <br/>
                    <Row>
                        <Col span={9}>
                            <Radio.Group
                                onChange={this.onChartTypeChange}
                                value={this.state.chartType}
                            >
                                <Radio value={'hexbin'}>Hexbin</Radio>
                                <Radio value={'scatter'}>Scatter</Radio>
                            </Radio.Group>
                        </Col>

                        <Col span={4}>
                            <Switch checkedChildren="on"
                                    unCheckedChildren="off"
                                    defaultChecked
                                    onChange={this.OnTooltipChange}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    onCountSliderChange = (count) => {
        this.setState({ minCount: count });
    }

    onChartTypeChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            chartType: e.target.value,
        });
    }

    OnTooltipChange = (checked) => {
        // console.log(checked)
        // I need to transfer this checked data to ShotChart component
        this.setState({
            displayTooltip: checked,
        })
    }
}

export default DataViewContainer;