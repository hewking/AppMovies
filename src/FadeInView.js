import React,{Component} from 'react'
import {Animated,View,Text,Button,StyleSheet} from 'react-native'

export default class FadeInView extends Component {

    state = {
        fadeAnim : new Animated.Value(0) // 透明度初始值设置为0
    }

    componentDidMount(){
        // 随时间执行动画
        Animated.timing(this.state.fadeAnim,{
            toValue:1,//动画中变量值
            duration:1000,//动画持续时间
            delay:5000,//延迟执行时间
            
        }).start()//开始执行动画
    }

    render(){
        const {fadeAnim} = this.state.fadeAnim// 解构赋值

        return (<View style={styles.container}>
        {/* 专门可动画化的View */}
        {/* 透明度指定为动画变量值 */}
            <Animated.View style={{...this.props.style,opacity:fadeAnim}}>
                {this.props.children}
            </Animated.View>
        </View>)
    }

}

const styles = StyleSheet.create({
    container : {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})