/**
 * @this rxdialog
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 
 * 弊端：(待解决)
 * 1、DialogTopView 同时多个弹框 出现/消失 动画不准确( 特别是：消失的动画 ) 
 * 
**/

'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import PropTypes from 'prop-types';
import RXAlert   from 'react-native-rxdialog/src/UI/RXAlert'

// 二次开发demo
import RXSheet   from './dialogDIY/RXSheet'
import RXToash   from './dialogDIY/RXToash'
import RXPicker  from './dialogDIY/RXPicker'
import CouponPicker from './Picker/Coupon/CouponPicker'
import DatePicker from './Picker/Date/DatePicker'

import { DeviceWidth, DeviceHeight } from 'react-native-rxdialog/src/util/PlatformType.js'

export default class RXDialogTest extends Component {
  constructor(props){
    super(props);
    this.state = ({
      pickerVisible: false,
      couponPickerVisible: false,
      datePickerVisible: false
    })
  }

 /**
  * 点击事件
  * @param {*} action 第几个点击
  */
  click(action = 0) {
    if(action === 0) {
      RXAlert.show(
            'Alert title(标题)',
            'content (Can`t click on the background) \n内容 ---- 不可以 [ 点击背景]',
            [
              {text: 'confirm(确认)', style:{color: 'red'}},
              {text: 'cancel(取消)'}
            ], (index)=>{
              console.log('click index='+ index);
            }
      );
    }
    else if(action === 1) {
      RXAlert.show(
        'DIY Alert title(标题)',
        'content (Can`t click on the background) \n内容 ---- 不可以 [ 点击背景]',
        [
          { text: 'confirm(确认)', style:{color: 'green', fontSize: 20} },
          { text: 'cancel(取消)', style:{color: 'brown', fontSize: 10}  }
        ], (index)=>{
          console.log('click index='+ index);
        },{
          // in Android , text多行的 fontSize 必须有 lineHeight
          contentTextStyle: { color: 'blue', fontSize: 16, lineHeight: 20}
        },{
          titleTextStyle: { color: 'orange', fontSize: 20 }
        }
      );
    }
    else if(action === 2){

      RXSheet.show(
        'Sheet => head portrait(头像管理)', 
        'You can [click on the background - disappear] (可以 [点击背景-消失 ])',
        [
          {text: 'take a photo(拍照)'},
          {text: 'Album(相册)'},
        ]
        , (index)=>{
          console.log('click index='+ index);
        }
      );
    }
    else if(action === 3) {
      RXToash.show('toash \n吐司~~  不可以 [ 背景点击 ]');
    }
    else if(action === 4) {
      RXToash.show('toash close ( Close manually, please. )\nRXToash 动画样式，可以手动关闭。', null, true, ()=>{
        console.log('click cancel')
      });
    }
    else if(action === 5) {
      this.setState({ pickerVisible: true})
    }
    else if(action === 6) {
      this.setState({ couponPickerVisible: true})
    }
    else if(action === 7) {
      this.setState({ datePickerVisible: true})
    }
  }

  _getTipText(title='') {
    return(
      <Text style={{height: 20, backgroundColor: 'orange', color: 'black',
                    marginTop: 40, textAlign: 'center',
                    fontSize: 14, lineHeight: 20}}>
      {title}
      </Text>
    )
  }

  _getView(title='', action=0) {
    return (
      <TouchableOpacity onPress={()=>{this.click(action)}}>
            <View style={styles.container}>
                <Text style={styles.text}> {title} </Text>
            </View>
        </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{width: DeviceWidth, height: DeviceHeight-20, backgroundColor: '#f0f4f7'}}>
        <ScrollView style={{flex: 1}}>
        <View style={{paddingTop: 40}}>
          <TouchableOpacity onPress={()=>{this.click(0)}}>
              <View style={[styles.container]}>
                  <Text style={styles.text}>  RXAlert (default style) </Text>
              </View>
          </TouchableOpacity>

          {this._getView(' Alert (diy style)', 1)}

          {this._getTipText('Support extensions')}
          {this._getView('Sheet', 2)}
          {this._getView('Toash', 3)}
          {this._getView('Toash animal', 4)}

          {this._getTipText('Picker [ base class ]')}
          {this._getView('Picker (base style)', 5)}
          {this._getView('CouponPicker', 6)}
          {this._getView('DataPicker', 7)}

          <View style={{flex: 1,height: 20}} />
        </View>
      </ScrollView>
      <RXPicker 
        visible={this.state.pickerVisible}
        superCallBack={(index)=>{
          this.setState({ pickerVisible: false })
        }}
      />
      <CouponPicker 
        visible={this.state.couponPickerVisible}
        superCallBack={(index)=>{
          this.setState({ couponPickerVisible: false })
        }}
      />

      <DatePicker 
        visible={this.state.datePickerVisible}
        superCallBack={(index)=>{
          this.setState({ datePickerVisible: false })
        }}
      />
    </View>
    )
  }


}



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, 
    marginLeft: 40, 
    marginRight: 40, 
    height: 40, 
    backgroundColor: 'white',
  },

  text: {
    fontSize: 24, 
    color: 'blue',
    lineHeight: 30,
  }

})