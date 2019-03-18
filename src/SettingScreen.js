import React,{Component} from 'react'
import {View,Image,Text,Button} from 'react-native'
import {createStackNavigator,createAppContainer,createBottomTabNavigator} from 'react-navigation'

class SettingScreen extends Component{

    render(){
        return (<View style={{justifyContent:'center',alignItems:'center'}}
        ><Text>Setting</Text>
        <Button title='跳转到个人资料' onPress={()=>this.props.navigation.navigate('Profile')}/>
        <Button title ='Navigation Screen 测试' onPress={() => this.props.navigation.navigate('Navigation')}/>
        </View>)
    }

}

export default SettingScreen