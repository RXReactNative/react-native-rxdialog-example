/**
 * @this Overlay : 工具 - 2
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
import React, { } from 'react';
import OverlayAlertView from './OverlayAlertView'
import AlertInputView,{ AlertInputViewProperites } from './component/AlertInputView'

let key;
export default {
  showInputAlert:(config: AlertInputViewProperites) => {
    const { ...others } = config;
    key = OverlayAlertView.show( <AlertInputView {...others} dismiss={()=>OverlayAlertView.hide(key)} />  );
  },
}