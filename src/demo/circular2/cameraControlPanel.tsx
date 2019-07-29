import React, { Component } from "react";
import {
  findNodeHandle
  , StyleSheet
  , Text
  , UIManager
  , View
  , Image
  , TouchableWithoutFeedback
  , TouchableOpacity
} from "react-native";
import { Colors } from "../../util/designSystem";
import GestureTouchable from "./gestureTouchable";

interface Props {
  onRecordStart: () => void;
  onRecordFinish: (arrow: boolean) => void;
  onRecording: (isRecord: boolean) => void;
  onTakePhote: () => void;
}

interface State {
  isVideo: boolean;
}

interface StateProps {
  source: string;
}

// 毫秒，长按判断，大于1000毫秒
const longPressLimit = 250;

export default class CameraControlPanel extends Component<Props, State> {

  // layout: any;
  // isView = true 是录制视频 否则拍照
  // 是否开始录音了，控制对话框显示
  // 是否取消录音，还是发送录音
  allow = false;
  gestureTouchable: GestureTouchable | null = null;
  private time: number = 0;
  private touchMoveFirst: boolean = false;

  constructor(props) {
    super(props);
    this.state = {
      isVideo: false,
    };
  }

  render() {
    console.debug(`isVideo : ${this.state.isVideo}`);
    return (<GestureTouchable style={[styles.holdRecordContainer]} onTouchStart={() => {
      this.initRecordUI();
      this.time = new Date().getTime();
      this.touchMoveFirst = false;
    }}
      onTouchMove={(evt) => {
        const curTime = new Date().getTime();
        const diff = curTime - this.time;
        if (diff > longPressLimit) {
          // 大于 1s 长按，开始录制
          if (!this.touchMoveFirst && this.props.onRecordStart) {
            this.props.onRecordStart();
            this.touchMoveFirst = true;
            this.changeState(true);
          }
        }
      }}
      onTouchEnd={() => {
        Toast.show('onTouchEnd');
        const curTime = new Date().getTime();
        const diff = curTime - this.time;
        if (diff > longPressLimit) {
          // 结束录制
          if (this.props.onRecordFinish) {
            this.props.onRecordFinish(this.allow);
          }
        } else {
          // 小于1s 说明是点击 拍照
          this.props.onTakePhote();
        }
        this.changeState(false);
      }}
      ref={(ref) => {
        this.gestureTouchable = ref;
      }}
    >
      <StateIcon
        source={!this.state.isVideo ? 'icon_shutter' : 'icon_video_record'}
        style={styles.image}
      />
    </GestureTouchable>);
  }

  private changeState = (state) => {
    this.setState({
      isVideo: state
    });
  }

  private initRecordUI = () => {
    this.allow = true;
    if (this.props.onRecording) {
      this.props.onRecording(true);
    }
  }

}

const styles = StyleSheet.create({
  holdRecordText: {
    color: Colors.white,
    textAlign: "center"
  },
  holdRecordContainer: {
    backgroundColor: Colors.transparent,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: 'cover',
    width: 65,
    height: 65,
  }
});
