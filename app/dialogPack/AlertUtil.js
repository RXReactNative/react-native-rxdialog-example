/**
 * @this AlertUtil : 工具 - 1
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 1、方便 - 项目的定制
 * 2、公用工具
 * 3、使用更加简洁、明了 (和 dialogDIY文件里面 想必)
 * 
**/
'use strict'
import React, { Component } from 'react';
import { } from 'react-native';

import OverlayAlertView from './OverlayAlertView'
import Alert from './component/Alert'

const alert = (title, message, leftTitle, rightTitle, onLeftPress, onRightPress) => {
  var key = null,
  dismiss = () => { OverlayAlertView.hide(key) },
  key = OverlayAlertView.show(
    <Alert 
      title={title} message={message}
      leftTitle={leftTitle}
      rightTitle={rightTitle}
      onLeftPress={onLeftPress}
      onRightPress={onRightPress}
      dismiss={dismiss}
    />
  )
}

export default {
  activity: (callback) => {
    alert('', '仅右侧按钮点击有回调', '取消', '确定', () => { }, callback);
  },

  action: (callback) => {
    alert('', '仅左侧按钮点击有回调', '确定', '取消', callback, () => { })
  },
}