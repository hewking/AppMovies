
import React,{Component} from 'react'
import {View,StyleSheet,Text,Button,ToastAndroid,JSON} from 'react-native'
import {createAppContainer,createStackNavigator} from 'react-navigation'
// import HomeScreen from './homescreen'

/**
 * <AppContainer />组件不接受任何 props -- 所有配置都在createStackNavigator 函数的可选参数中指定。 我们将options留空，所以它只使用默认配置
 */
class DetailScreen extends Component {

    static navigationOptions = ({navigation}) => {
        /**
         * 设置标题返回样式
         */
        return {
            title:navigation.getParam('title','no title'),
                headerStyle: {
                    backgroundColor:'#f4511e',
                },
                headerTintColor:'#fff',
                headerTitleStyle:{
                    fontWeight:'bold',
                },

        }
    }

    render(){
        // 解构赋值
        const {navigation} = this.props
        const url = navigation.getParam('url','')
        const title = navigation.getParam('title','')

        return (<View style={{flex : 1,alignItems:'center',justifyContent:'center'}}>
            <Text>Detail Screen</Text>
            {/* 这里的this.props的this指向Comonent也就是DetailScreen,所以props是在
            引用DetailScreen的地方指定的属性，当在Stack Navigator 设置DetailScreen的时候，应该设置了
            navigation属性 */}
            {/* {JSON.stringify({url})} */}
            <Text>url : {url}</Text>
            <Text>title : {title} 直接从params获取参数:{this.props.navigation.state.params.title}</Text>
            <Button title='再次到详情页面' onPress={() => this.props.navigation.push('Details')}/>
            <Button title='返回' onPress={() => this.props.navigation.goBack()}/>
            {/* 更新param */}
            <Button title='更新标题' onPress={() => this.props.navigation.setParams({title:'新的标题'})}/>
        </View>)
    }

    componentWillUnmount(){
        ToastAndroid.show('Detail 页面销毁',ToastAndroid.SHORT)
    }
    
}

// const AppNavigator = createStackNavigator({
//     Home:HomeScreen,
//     Details: DetailScreen
// },{
//     // 属性
//     //如果要指定堆栈中的初始路由，请在堆栈选项对象上设置initialRouteName。
//     initialRouteName:'Home'

// })

// export default createAppContainer(AppNavigator)
export default DetailScreen 