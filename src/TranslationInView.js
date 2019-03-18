import React,{Component} from 'react'
import {View,Text,Animated,Easing} from 'react-native'

export default class TranslationInView extends Component{

    constructor(props){
        this.state = {
            xPosition : new Animated.Value(0)

        }
    }   

    render(){

        const anim = Animated.timing(this.state.xPosition,{
            toValue:100,
            easing:Easing.back(),
            duration:2000
        })
        return (<View>
            
        </View>)
    }

}