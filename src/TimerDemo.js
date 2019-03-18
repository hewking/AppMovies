import React,{Component} from 'react'
import {View,Text,Button,Image,StyleSheet} from 'react-native'

export default class TimerDemo extends Component {

    
    render(){
        return (<View style={styles.container}>
            <Text style ={styles.text}>Timer Demo</Text>
        </View>)
    }

    componentDidMount(){
        this.timer = setTimeout(() => {
            // console.log('摆一个定时器的引用挂在this上')
        },500)
    }

    // startInterval(){
    //     InteractionManager.runAfterInteractions(() => {
    //         // 需要长时间执行的任务

    //     })
    // }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer)
    }

}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'skyblue',
        flex : 1,
        alignItems:'center'
    },
    text : {

    }
})