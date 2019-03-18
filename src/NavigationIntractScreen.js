/**
 * 标题栏和其所属的页面之间的交互
 */
import React, {Component} from 'react'
import {View, Image,Text, Button} from 'react-native'
import {LogoTitle} from './ProfileScreen'
export default class NavigationIntractScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <LogoTitle/>,
            headerRight:(<Button onPress={() => {
                navigation.getParam('increaseCount')
            }} title='+1' color='#fff'/>),
            // headerBackTitle 设置自定义返回按钮
        }
    }

    componentDidMount(){
        this.props.navigation.setParams({increaseCount:this._increaseCount})
    }

    state ={
        count:0,
    }

    _increaseCount=() => {
        this.setState({count : this.state.count +1});
    }

    render() {
        return (
            <View>
                <Text>{this.state.count}</Text>
                <Button title='+1' onPress={this._increaseCount}/></View>
        )
    }
}

// export default NavigationIntractScreen