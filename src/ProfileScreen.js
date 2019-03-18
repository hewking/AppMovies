import React,{Component} from 'react'
import {View,Text,Button,Image} from 'react-native'


export class LogoTitle extends Component{

    render(){
        return (<View>
            <Image source={require('../res/imgs/app_logo.png')} style={{width:30,height:30}}/>
        </View>)
    }
}

export default class ProfileScreen extends Component {  

    // 覆盖共享的navigationOptions
    static navigationOptions = ({navigation,navigationOptions}) => {
        const {params} = navigation.state;
        return {
            title:params ? prams.otherParam:'A Nested Detail Screen',
            headerStyle: {
                backgorundColor:navigationOptions.headerTintColor,
            },
            headerStyle:{
                backgorundColor:navigationOptions.headerTintColor
            },
            headerTintColor:navigationOptions.headerStyle.backgorundColor,
            headerTitle:<LogoTitle/>
        }
    }
    
    render(){
        return (<View style={{justifyContent:'center',alignItems:'center'}}>
            <Text>ProfileScreen</Text>
        </View>)
    }
}