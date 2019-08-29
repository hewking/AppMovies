// In App.js in a new project

import React from "react";
import { View, Text, Button, ToastAndroid } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import DetailScreen from './DetailScreen'
import AnimatedScreen from './FadeInView'
import DemoListScreen from './DemoListScreen'
import TimerDemo from "./TimerDemo";
import Counter from './Counter';
import StickerPickerView from './stickerPickerView';
import ChatExample from './demo/chatExample';
import UpgradeDemo from './upgradeDemo';
import AudioDemo from './demo/AudioExample'
import PanExample from './demo/svg/PanResponder';
import SvgDemo from './demo/svg';
import CircularProgress from './demo/circularProgress'
import CircularDemo2 from './demo/circular2';
import LargeListScreen from './largelistView';
import VideoProcess from './demo/video/videoProcess';
import { getAlbum } from './common/imagePicker';
class HomeScreen extends React.Component {

  navigationOptions = ({ navigation }) => {
    title: navigation.getParam('title', 'no title')
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button title='跳转到详情>' onPress={() => this.props.navigation.navigate('Details', {
          url: 'www.baidu.com',
          title: '这个杀手不太冷',
        })} />
        <Button onPress={() => {
          // 打开相册
          this._openImagePicker();
        }} title='打开相册' />
        <AnimatedScreen style={{ width: 250, height: 50, backgroundColor: 'skyblue' }}>
          <Button title='搞一下动画' onPress={() => this.props.navigation.navigate('Animated')} />
          <Text>透明度会变吗</Text>
        </AnimatedScreen>
        <Button title='跳到demo列表' onPress={() => { this.props.navigation.navigate('DemoList') }} />
      </View>
    );
  }

  /**
   * 加载某个页面完了
   */
  componentDidMount() {
    ToastAndroid.show('加载Home页面', ToastAndroid.SHORT)
  }

  /**
   * destroy 之前被调用，应该清除网络请求，和componentDidMount创建的对象
   */
  componentWillUnmount() {
    ToastAndroid.show('离开Home页面', ToastAndroid.SHORT)
  }

  _openImagePicker = () => {
    getAlbum({})
  }

}

const AppNavigator = createStackNavigator({
  // Home: {
  //   screen: HomeScreen
  // }
  Home: HomeScreen,
  Details: DetailScreen,
  Animated: AnimatedScreen,
  DemoList: DemoListScreen,
  Timer: TimerDemo,
  Counter,
  StickerPickerView,
  Chat: ChatExample,
  UpgradeDemo,
  AudioDemo,
  PanExample,
  SvgDemo,
  CircularProgress,
  CircularDemo2,
  LargeListScreen,
  VideoProcess
  // StickerCategory,

});

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {

  render() {
    return <AppContainer />
  }
}

// export default HomeScreen