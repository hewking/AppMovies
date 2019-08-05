import React, { Component } from 'react';
import {Text,View,Image,StyleSheet,Button} from 'react-native';
import { ProcessingManager } from 'react-native-video-processing';

export default class VideoProcess extends Component {

    render(){
        return (<View>
            <Button
            onPress={() => {
                this.printInfo();
            }}
            />

        </View>);
    }

    printInfo = async () => {
        const source = '';
        const info = await ProcessingManager.getVideoInfo(source);
        console.log(JSON.stringify(info));

    }

}

const styles = StyleSheet.create({

});