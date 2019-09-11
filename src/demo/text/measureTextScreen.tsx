import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import MeasureText from 'react-native-measure-text';
import { number } from 'prop-types';

const texts = [
    'This is an example',
    'This is the second line'
];
const width = 100;
const fontSize = 15;
// const fontFamily = 'Arvo';

export interface MeasureHeight {
    height?: number;
    layoutHeight?: number;
}

export default class MeasureTextScreen extends Component {

    state = {
        heights: [],
    }

    async componentDidMount() {
        const heights = await MeasureText.measure({
            texts, /* texts to measure */
            width, /* container width */
            fontSize,
            // fontFamily /* fontFamily is optional! */,
            // fontWeight: 'normal',
        });
        // const measuredHeights = heights.map((item: any) => ({
        //     height: item,
        // }));
        this.setState({ heights });
    }

    render() {
        const { heights } = this.state;

        return (<View style={{ flex: 1, justifyContent: 'center' }}>
            {texts.map((text, i) => (
                <Text
                    key={`text-${i}`}
                    style={{
                        width,
                        fontSize,
                        // fontFamily,
                        // fontWeight: 'normal',
                        // height: heights[i],
                    }}
                    onLayout={(event) => {
                        const layoutHeight = event.nativeEvent.layout.height;
                        console.debug('layoutHeight', layoutHeight,'height', heights[i]);
                    }}
                >
                    {text}
                </Text>
            ))}
        </View>);
    }

}


const styles = StyleSheet.create({
    text: {
        fontSize: 14,

    },
});