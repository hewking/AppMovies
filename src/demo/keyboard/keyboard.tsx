import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Button,Text, TextInput } from 'react-native';

export default class KeyboardDemo extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (<SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }} />
            <View style={{flexDirection:'row',backgroundColor:'skyblue'}}>
                <Text>
                    'Send'
                </Text>
                <TextInput style={{flex:1}}>

                </TextInput>
                <Text>
                    'Send'
                </Text>
            </View>
        </SafeAreaView>);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
    }
});