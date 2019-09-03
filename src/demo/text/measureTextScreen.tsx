import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import MeasureText from 'react-native-measure-text';

const texts = [
    'This is an example',
    'This is the second line'
];
const width = 100;
const fontSize = 15;
const fontFamily = 'Arvo';

export default class MeasureTextScreen extends Component {

    state = {
        heights: [],
    }

    async componentDidMount() {
        const heights = await MeasureText.heights({
            texts, /* texts to measure */
            width, /* container width */
            fontSize,
            fontFamily /* fontFamily is optional! */
        });
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
                        fontFamily,
                        height: heights[i],
                    }}
                >
                    {text + ' height: ' + heights[i]}
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