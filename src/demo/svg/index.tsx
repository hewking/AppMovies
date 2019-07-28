import React, { Component } from "react";
import { View, StyleSheet } from 'react-native';
import RecordView from './RecordView';

export default class SvgDemo extends Component {

    render() {
        return <View style={style.contaner}>
            <RecordView />
        </View>
    }

}

const style = StyleSheet.create({
    contaner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink'
    }
});