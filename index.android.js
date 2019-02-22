/**
 * @Author: srxboys
 * @Date:   2019-2-22
 * @Project: App
 * @flow
 */

'use strict'
import { AppRegistry } from 'react-native';

import {name as appName} from './app.json';
import App from './App'

AppRegistry.registerComponent(appName, () => App);
