import React,{Component} from 'react'
import {View,Text,Image,Button,StyleSheet,Animated} from 'react-native'
import { posix } from 'path';

export default class SequenceInScreen extends Component {

    constructor(props) {
        this.state = {
            position : Animated.Value(0)
        }
    }

    render(){
        let {position} = this.state
        const anim = Animated.sequence([
            Animated.decay(position,{
                velocity : {x : gestureState.vx,y:gestureState.y},
                deceleration:1
            }),Animated.parallel([
                Animated.spring(position,{
                    toValue:{x:0,y:0}
                })
            ]),Animated.timing(twirl,{
                toValue:360
            })
        ]).start()

        return (<View>

        </View>)
    }

}