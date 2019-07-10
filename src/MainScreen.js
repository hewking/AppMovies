import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import HomeScreen from './homescreen'
import DetailScreen from './DetailScreen'
import SettingScreen from './SettingScreen'
import ProfileScreen from './ProfileScreen';
import AnimatedScreen from './FadeInView'
import NavigationScreen from './NavigationIntractScreen'
import DemoListScreen from './DemoListScreen'

class MainScreen extends Component {

    render() {
        return (<View styles={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>MainScreen</Text>
        </View>)
    }
}

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailScreen,
    Animated: AnimatedScreen,
    DemoListScreen,
}, {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'skyblue'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    })

const SettingStack = createStackNavigator({
    Setting: SettingScreen,
    Profile: ProfileScreen,
    Navigation: NavigationScreen

}, {
        initialRouteName: 'Setting',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'skyblue'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    })

const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Setting: SettingStack,
}, {
        defaultNavigationOptions: ({ Navigation }) => {
            // tabBarIcon:({focused,horizontal,tintColor}) => {
            //     const {routeName} = Navigation.state;
            //     let IconCompat = Iconicons;
            //     let iconName;
            //     if (routeName === 'Home') {
            //         iconName = `ios-information-circle${focused?'' : '-outline'}`
            //         IconCompat = HomeIconWithBadge;
            //     }
            // }
        }
    })

export default createAppContainer(TabNavigator)
