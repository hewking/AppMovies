/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import AppContainer from './src/homescreen'
// import AppContainer from './src/DetailScreen'
import Main from './src/MainScreen'

AppRegistry.registerComponent(appName, () => Main);
