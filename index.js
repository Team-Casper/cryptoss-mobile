/**
 * @format
 */
import { registerRootComponent } from 'expo';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
registerRootComponent(App);
AppRegistry.registerComponent(appName, () => App);
