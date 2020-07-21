import React, {Component} from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

class CounterSlider extends Component {
    state = {
        inputValue: 1,
    };

    onChange = value => {
        const cleanValue = Number(value) ? value : this.state.inputValue;
        // console.log(value);
        this.setState({
            inputValue: cleanValue,
        });
        this.props.onCountSliderChange(cleanValue);
    };

    render() {
        // const { inputValue } = this.state;
        const inputValue = this.props.minCount;
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Slider
                            min={1}
                            max={20}
                            onChange={this.onChange}
                            value={inputValue}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1}
                            max={20}
                            style={{ marginLeft: 16 }}
                            value={inputValue}
                            onChange={this.onChange}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CounterSlider;