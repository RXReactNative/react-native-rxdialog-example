/**
 * @this 统一入口
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * ------------------------------
 * 
 * example
 * 
**/

'use strict'
import React, { Component } from 'react'

import RXIndex   from './app/index'

export default class App extends Component {
  render() {
    return <RXIndex />
  }
}
