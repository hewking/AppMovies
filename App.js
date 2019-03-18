/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,FlatList
  ,ToolbarAndroid
  ,ToastAndroid} from 'react-native';
// import {createStackNavigator,createAppContainer} from 'react-navigation'

const MOCKEC_MOVIA_DATA = [{
  title : "标题",
  year : '2019',
  posters : {thumbnail : 'http://i.imgur.com/UePbdph.jpg'},
}]

const REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json'

const LOGO_PATH = 'res/imgs/app_logo.png'

// const MainNavigatior = createStackNavigator({
//   Home : {screen : App},
  
// })

// const MainContainer = createAppContainer(MainNavigatior)

export default class App extends Component {

  name = 'zhang';

  platform = Platform.OS;

  constructor(props){
      super(props)// 有父类必须添加super
      this.state = {data : []
                    ,loaded:false}
      // bind 不太明白干嘛的? 不过去除之后也没有问题
      this.fetchData = this.fetchData.bind(this)
  }

 fetchData(){
   fetch(REQUEST_URL).then((resp) => {
     return resp.json()
   }).then((respData) => {
     this.setState({data :this.state.data.concat(respData.movies) 
      ,loaded:true})
   })
  }

  render() {
    // const item = MOCKEC_MOVIA_DATA[0]
    return this.renderToolbar()
  }

  renderContent(){
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }

    const datas = this.state.data

    return this.renderMovieList(datas)
  }

  renderToolbar(){
    return (<View style={{flexDirection:'column',flex:1}}>
      <ToolbarAndroid style={styles.toolbar}
      logo={this.LOGO_PATH}
      actions={[{title:'Setting', icon :this.LOGO_PATH,show:'always'}]}
      onActionSelected={this.onActionSelected}
      title={'好看的电影' + this.platformMsg().msg}>

      </ToolbarAndroid>
      {this.renderContent()}
    </View>)
  }

  platformMsg(){
    return Platform.select({
      'ios' : {
        msg : 'IOS'
      },
      'android' : {
        msg : 'Android'
      }
    })
  }

  onActionSelected(){
    ToastAndroid.show('设置点击了',ToastAndroid.SHORT)
  } 

  renderLoadingView(){
    return (<View style = {styles.container}>
      <Text>
        正在加载电影数据...
      </Text>
    </View>)
  }

  renderMovieList(datas) {
    return (<View style={styles.container}>
        <FlatList
          data={datas}
          renderItem={({item}) => this.renderMovie(item)}
          keyExtractor={(item) => item.id}
        />
    </View>)
  }

  renderMovie(item) {
    return (
      <View style={styles.container}>
      <View style={{backgroundColor:'skyblue',flexDirection:'row'}}>
          <Image style={styles.thumbnail} source={{uri : item.posters.thumbnail}}></Image>
          <View style = {styles.rightContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.year + this.name}</Text>
          </View>
          </View>
      </View>
    );
  }

  componentDidMount(){
    this.fetchData()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection :'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  rightContainer : {
    flex : 1,
    justifyContent:'center',
    alignItems : 'center',
  },  

  title: {
    marginBottom : 8
  },  
  thumbnail : {
    margin:10,
    width : 53,
    height : 81,
  },
  toolbar : {
    backgroundColor:'steelblue',
    height : 48,
    flexDirection:'row',
    fontSize : 16
  },
});
