/**
 * @this RXSheet
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
  TouchableOpacity,
} from 'react-native'


import {ISIphoneX, ISIphone,ISAndroid, IFIphone, IFIphoneX,
  DeviceWidth, DeviceHeight} from 'react-native-rxdialog/src/util/PlatformType.js'

import SlideAnimation from 'react-native-rxdialog/src/animations/SlideAnimation'
import Dialog         from 'react-native-rxdialog/src/main/Dialog'
import DialogTopView  from 'react-native-rxdialog/src/level/DialogTopView'


const width = DeviceWidth;
const borderRadius = 10;
const DEFAULT_TITLE_FONT_SIZE = 16;
const DEFAULT_CONTENT_FONT_SIZE = 14;
const DEFAULT_BUTTON_FONT_SIZE = 16;


const LinebackgroundColor = 'rgba(0,0,0,0)';
const backgroundColor = 'white';



export default class RXSheet extends Dialog {

  static show(title, tip, buttons, Callback, tipOptions, titleOptions, cancelTitle, cancelOptions) {
    title = title || 'RXSheet';
    tip = tip || 'react-native-rxdialog';
    buttons = buttons || [];
    Callback = Callback || {};
    tipOptions = tipOptions || {};
    titleOptions = titleOptions || {};

    cancelTitle = cancelTitle || '取消';
    cancelOptions = cancelOptions || {}

    if (!Array.isArray(buttons) || buttons.length < 1) {
      buttons = [{ text: '确定', style: { color: '#fd521d', fontWeight: 'bold' } }]
    }

    let key;
    const sheetView = (
      <View style={{ width: width, borderRadius, backgroundColor: 'transparent', overflow: 'hidden' , paddingBottom: IFIphoneX(20, 20, 0) }}>
          {
            title.length > 0 ?
              <View>
                <View style={{
                  padding: tip.length < 1 ? 20 : 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor,
                  borderTopLeftRadius: borderRadius,
                  borderTopRightRadius: borderRadius
                }}>
                  <Text style={[{ fontSize: DEFAULT_TITLE_FONT_SIZE, color: '#483C1D'},
                  { ...titleOptions.titleTextStyle }]}>{title}</Text>
                </View>
              </View>
              :
              <View style={{
                height: borderRadius + 5,
                backgroundColor,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius
              }} />
          }
          {
            tip.length > 0 ?
             <View>
                <Text style={[{
                  fontSize: DEFAULT_CONTENT_FONT_SIZE,
                  padding: 20,
                  paddingTop: 5,
                  textAlign: 'center',
                  color: '#d0d5d9',
                  backgroundColor,
                }, { ...tipOptions.contentTextStyle }]}>
                  {tip}
                </Text>
                <View style={{height: 1,backgroundColor: LinebackgroundColor, width}} />
              </View>
              : title.length > 0 ?
                   <View style={{height: 1,backgroundColor: LinebackgroundColor, width}} />
                 : null
          }

          {
              <View style={{
                alignItems: 'center',
                backgroundColor: LinebackgroundColor,
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius
              }}>
                {
                  buttons.map((item, index) => {
                    return (
                      <TouchableOpacity activeOpacity={0.5} key={'alert-button-' + index} style={{
                        height: 44,
                        width: width,
                        marginTop: index == 0 ? 0 : 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor,
                        borderBottomLeftRadius: index == buttons.length - 1 ? borderRadius : 0,
                        borderBottomRightRadius: index == buttons.length - 1 ? borderRadius : 0
                      }} onPress={() => {
                        DialogTopView.remove(key);
                        Callback && Callback(index);
                      }} >
                        <Text style={[{ fontSize: DEFAULT_BUTTON_FONT_SIZE }, { ...item.style }]}>{item.text}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
          }
          <View style={{height: 10, backgroundColor: LinebackgroundColor}} />
          <TouchableOpacity activeOpacity={0.5} style={{
                height: 44,
                width: width,
                marginTop: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor,
                borderRadius: 2,
              }} onPress={() => {
                DialogTopView.remove(key);
                Callback && Callback(-1);
              }} >
                <Text>{cancelTitle}</Text>
              </TouchableOpacity>
        </View>
    )
    let element = Dialog.addPropsValue(this, sheetView, 'sheet', Callback);
    key = DialogTopView.add(element);
    return key;
  }

  static getDialogAnimated() {
    let animated = new SlideAnimation({slideFrom: 'bottom'})
    return (  animated )
  }

  // 弹框 样式
  static getDialogStyles() {
    return {
      justifyContent: 'flex-end',
    }
  }

  // 遮罩层 是否可以点击
  static getOverlayEnable() {
    return true;
  }
}