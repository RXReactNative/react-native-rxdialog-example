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

import {
  RXDialog,
  RXDialogTopView,
  RXAlertAnimation,
} from 'react-native-rxdialog'

let OverlayView_key;

export default class OverlayAlertView extends RXDialog {

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
    let element = RXDialog.addPropsValue(this, view, 'alert', (index)=>{});
    OverlayView_key = RXDialogTopView.add(element);
    return OverlayView_key;
  }

  static getDialogAnimated() {
    let animated = new RXAlertAnimation();
    return (  animated )
  }
}