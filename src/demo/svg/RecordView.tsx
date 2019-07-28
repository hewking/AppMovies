import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
    Circle
} from 'react-native-svg';

export default class RecordView extends Component {

    // render() {
    //     return <Svg
    //         height="100"
    //         width="100"
    //     >
    //         <Circle
    //             cx="50"
    //             cy="50"
    //             r="40"
    //             stroke="#FFFFFF"
    //             strokeOpacity="0.5"
    //             strokeWidth="20"
    //             fill="#FFFFFF"
    //         />
    //     </Svg>;
    // }

    render() {
        return <Svg
            height="100"
            width="100"
        >
            <Circle
                cx="50"
                cy="50"
                r="40"
                fill="#ddd"
            />
            <Circle
                origin="50, 50"
                rotate="-90"
                cx="50"
                cy="50"
                r="38"
                stroke="#0074d9"
                strokeWidth="5"
                fill="none"
                strokeDasharray="25%,10"
            // strokeDashoffset='200'
            />

            <Circle
                cx="50"
                cy='50'
                r='20'
                fill='#FFFFFF'
            />
        </Svg>;
    }

}