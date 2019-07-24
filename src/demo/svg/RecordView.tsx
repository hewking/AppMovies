import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
    Circle
} from 'react-native-svg';

export default class RecordView extends Component {

    render() {
        return <Svg
            height="100"
            width="100"
        >
            <Circle
                cx="50"
                cy="50"
                r="40"
                stroke="#FFFFFF"
                strokeOpacity="0.5"
                strokeWidth="20"
                fill="#FFFFFF"
            />
        </Svg>;
    }
}