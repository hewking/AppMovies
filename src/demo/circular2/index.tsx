/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, ToastAndroid } from "react-native";
import RecordView from './recordView'

export default class CircularDemo2 extends Component {
  render() {
    const percentage = 40;
    return (
      <View style={styles.base}>
        <Text style={styles.text}>Curcular Progress</Text>
        <RecordView size={100} percentage={percentage}
        // onRecordStart={() => {
        //   ToastAndroid.show('onRecordStart', ToastAndroid.SHORT);
        // }}
        // onRecording={(isRecording) => {
        //   ToastAndroid.show('onRecording', ToastAndroid.SHORT);
        // }}
        // onRecordFinish={(allow: boolean) => {
        //   ToastAndroid.show('onRecordFinish', ToastAndroid.SHORT);
        // }}
        >
          <View>
            <Text>{percentage}%</Text>
          </View>
        </RecordView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { marginBottom: 10 }
});
