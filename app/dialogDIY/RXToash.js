/**
 * @this RXToash
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 
 * 可调用的方法列表:
 * @function hiddenAll   隐藏所有
 * @function show        显示(子类实现 【必须】)
 * @function hide        隐藏
**/

'use strict'
import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'


import {ISIphoneX, ISIphone,ISAndroid, IFIphone, IFIphoneX,
  DeviceWidth, DeviceHeight} from 'react-native-rxdialog/src/util/PlatformType.js'

import Dialog         from 'react-native-rxdialog/src/main/Dialog'
import DialogTopView  from 'react-native-rxdialog/src/level/DialogTopView'

const borderRadius = 4;

export default class RXToash extends Dialog {

  /**
   * @param {*} message       内容
   * @param {*} messageOption 内容样式
   * @param {*} showLoading   显示，加载动画，这个就只能手动移除了
   * @param {*} cacelAction   点击取消
   */
  static show(message, messageOption, showLoading, cancelAction) {
    message = message || '';
    messageOption = messageOption || {};
    showLoading = showLoading || false
    cancelAction = cancelAction || null;

    if (message.length < 1 ) {
      console.log('message 不能同时为空', message);
      return;
    }

    let key;
    const toashView = (
       <View style={{borderRadius, backgroundColor: 'rgba(0,0,0,.6)', overflow: 'hidden', justifyContent: 'center'}}>
          {
            showLoading?
            <View>
              <Text 
              onPress={()=>{
                DialogTopView.remove(key)
                if(cancelAction) {
                  cancelAction();
                }
              }}
              style={{marginTop: 1, width: 60,backgroundColor: 'red', textAlign: 'center', color: 'white'}}> 关闭 </Text>
              <ActivityIndicator size="small" color="#00ff00" style={{marginTop: 20}} />
            </View>
            : null
          }
          <Text style={[{fontSize: 14, color: 'white', height: 40, lineHeight: 40, textAlign: 'center'},
           {...messageOption.messageTextStyle}]}>{'  '+ message + '   '}</Text>
       </View>
    )
    let element = Dialog.addPropsValue(this, toashView, 'toash', (index)=>{});
    key = DialogTopView.add(element);

    if(!showLoading) {
      setTimeout(
        () => {
          DialogTopView.remove(key)
       },
      2000
      )
    }

    return key;
  }


  // 遮罩层 样式
  static getOverlayStyles() {
    return {
      backgroundColor: 'rgba(0,0,0,0.0)'
    }
  }
}