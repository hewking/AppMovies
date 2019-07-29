import React, { Component } from "react";
import { GestureResponderEvent, PanResponder, PanResponderInstance, StyleSheet, View } from "react-native";
import { BaseProps } from "../../common/baseProps";

interface Props extends BaseProps{
  onTouchStart: () => void;
  onTouchMove: (event: GestureResponderEvent) => void;
  onTouchEnd: () => void;
}

export default class GestureTouchable extends Component<Props> {

  panResponder: PanResponderInstance | null = null;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onPanResponderGrant: (evt) => {
        console.log("onPanResponderGrant");
        if (this.props.onTouchStart) {
          this.props.onTouchStart();
        }
      },
      onPanResponderMove: (evt) => {
        console.log(`pageX : ${evt.nativeEvent.pageX}   pageY : ${evt.nativeEvent.pageY}`);
        // this.setState({
        //         marginLeft: evt.nativeEvent.pageX ,
        //         marginTop: evt.nativeEvent.pageY,
        // });
        if (this.props.onTouchMove) {
          this.props.onTouchMove(evt);
        }
      },
      onPanResponderRelease: (evt) => {
        console.log("onPanResponderGrant");
        if (this.props.onTouchEnd) {
          this.props.onTouchEnd();
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.log("onPanResponderTerminate");
      },
      onPanResponderReject: (evt) => {
        console.log("onResponderReject");
      }
    });
  }

  render() {
    return (<View
      {...this.props}
      {...this.panResponder}
    >
    </View>);
  }
}
