/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Dimensions,
  Button,
  Image,
  ActivityIndicator
} from 'react-native';


// import rnTextSize, { TSFontSpecs } from 'react-native-text-size'
// import { Colors } from 'react-native/Libraries/NewAppScreen';

class App extends React.PureComponent<any, any> {
  _flatList = null;
  maxIndex = 50;
  keepFlatListPositionData = [];
  oldData = null;
  lastScrollPosition = 0;


  constructor(props: any) {
    super(props);
    var data: any[] = [];
    for (var i = 0; i < this.maxIndex; i++) {
      data.push({ index: i, text: "asfdsf ddddddddddd Index" + i });
    }

    this.state = {
      data: [],
      isLoadingPrev: false,
      isLoadingLast: false,
    }

    setTimeout(() => {
      this.setState({
        data: data,
      });
    }, 1000);
  }

  setIsLoadPrev = (val: boolean) => {
    if (val != this.state.isLoadingPrev) {
      this.setState({
        isLoadingPrev: val
      })
    }
  }

  setIsLoadLast = (val: boolean) => {
    if (val != this.state.isLoadingLast) {
      this.setState({
        isLoadingLast: val
      })
    }
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={{ height: 50 }}>
        <Text>{item.text}</Text>
      </View>
    )
  }

  loadPrevDataInner = async () => {
    let newData = [];
    for (var i = 0; i < 100; i++) {
      this.maxIndex++;
      var item = { index: this.maxIndex, text: "Important: KeyboardIndex" + this.maxIndex };
      newData.push(item);
    }

    newData = [...newData.reverse(), ...this.state.data || []];
    this.keepFlatListPositionData.push(newData);
    this.setState({ data: newData });
  }


  loadLastDataInner = async () => {
    let newData = [];
    for (var i = 0; i < 100; i++) {
      this.maxIndex++;
      var item = { index: this.maxIndex, text: "Important: KeyboardIndex" + this.maxIndex };
      newData.push(item);
    }

    newData = [...this.state.data || [], ...newData];
    this.setState({ data: newData });
  }


  async componentDidMount() {

  }

  handleScroll = (event) => {
    this.lastScrollPosition = event.nativeEvent.contentOffset.y;
  }

  handleScrollEnd = (event) => {
    this.lastScrollPosition = event.nativeEvent.contentOffset.y;
    if (this.lastScrollPosition === 0) {
      this.loadPrevData();
    }
  }

  loadPrevData = () => {
    if (!this.state.isLoadingPrev
      && !this.state.isLoadingLast) {
      this.setIsLoadPrev(true);
      setTimeout(() => {
        this.loadPrevDataInner();
        // delay set state to false;
        setTimeout(() => {
          this.setIsLoadPrev(false);
        }, 10);

      }, 3000);
    }
  }

  loadLastData = () => {
    if (!this.state.isLoadingPrev
      && !this.state.isLoadingLast) {
      this.setIsLoadLast(true);
      setTimeout(() => {
        this.loadLastDataInner();
        setTimeout(() => {
          this.setIsLoadLast(false);
        }, 10);
      }, 3000);
    }
  }

  render() {
    const comingData = this.state.data;
    const matchIndex = this.keepFlatListPositionData.indexOf(comingData);
    if (matchIndex >= 0) {
      this.keepFlatListPositionData.splice(matchIndex, 1);
      let oldCount = this.oldData ? this.oldData.length : 0;
      let newCount = this.state.data ? this.state.data.length : 0;
      if (newCount > oldCount) {
        let offsetHeight = (newCount - oldCount) * 50;
        this.lastScrollPosition = offsetHeight + this.lastScrollPosition;
        this._flatList.scrollToOffset({
          offset: this.lastScrollPosition,
          animated: false
        })
      }
    }

    this.oldData = this.state.data;

    return (<Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          inverted={true}
          ref={(flatList) => this._flatList = flatList}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => {
            return "item-" + index;
          }}
          windowSize={20}
          initialNumToRender={20}
          getItemLayout={this.getItemLayout}
          onEndReached={this.loadLastData}
          ListHeaderComponent={() => {
            return this.state.isLoadingPrev ? (
              <View
                style={{
                  width: '100%',
                  height: 40,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <ActivityIndicator size="small" />
              </View>
            ) : null;
          }}
          ListFooterComponent={() => {
            return this.state.isLoadingLast ? (
              <View
                style={{
                  width: '100%',
                  height: 40,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <ActivityIndicator size="small" />
              </View>
            ) : null;
          }}
          onScroll={this.handleScroll}
          onMomentumScrollEnd={this.handleScrollEnd}
          data={this.state.data}>
        </FlatList>

      </SafeAreaView>
    </Fragment>)
  }

  getItemLayout = (data, index) => {
    var result = { length: 50, offset: 50 * index, index };
    return result;
  }
};

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },

// });

export default App;
