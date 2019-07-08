/**
 * @this OverlayAlertView
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 
**/

'use strict'
import React, {Component} from 'react'
import {} from 'react-native'

import Dialog         from 'react-native-rxdialog/src/main/Dialog'
import DialogTopView  from 'react-native-rxdialog/src/level/DialogTopView'

import AlertAnimation from 'react-native-rxdialog/src/animations/AlertAnimation'

import {DeviceWidth, DeviceHeight} from 'react-native-rxdialog/src/util/PlatformType.js'

const width = DeviceWidth;
const height = DeviceHeight;

let OverlayView_key;

export default class OverlayAlertView extends Dialog {

  static dismiss() {
    if(OverlayView_key) {
      this.hide(OverlayView_key);
    }
  }

  static show(view) { 
    if (!React.isValidElement(view)) {
      OverlayView_key=null; 
      return null;
    }
    let element = Dialog.addPropsValue(this, view, 'alert', (index)=>{});
    OverlayView_key = DialogTopView.add(element);
    return OverlayView_key;
  }

  static getDialogAnimated() {
    let animated = new AlertAnimation();
    return (  animated )
  }
}