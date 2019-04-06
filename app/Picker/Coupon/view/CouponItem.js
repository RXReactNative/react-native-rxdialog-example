/**
 * @this couponDCBInvest
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 可用的参数列表:
 * @param inputMoney    (int/String)
 * @param model         (Dictionary) 
 * 
 * 可用的方法列表: 
 * @function superCallBack (function) 
 * 
 * 优惠券的UI
 * `可以看做 cell`
**/

'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native'

import PropTypes from 'prop-types';

import {ISIphoneX, ISIphone,ISAndroid, IFIphone, IFIphoneX,
  DeviceWidth, DeviceHeight} from 'react-native-rxdialog/src/util/PlatformType.js'


const icon = require('../../../images/coupon_prefix.png');
const btnImgNomal = require('../../../images/coupon_pick_no.png');
const btnImgSelected = require('../../../images/coupon_pick_yes.png');

export default class couponDCBInvest extends Component {
  constructor(props){
    super(props);
    this.state = ({
      selectedItem: null
    });
  }

  static defaultProps = {
    superCallBack : {},
    model : {},
  }

  render(){
    let viewModel = this.props.model || {};

    let prefix = viewModel.prefix || '';
    let promotionRate = viewModel.promotionRate || 0.00;
    
    let couponName = viewModel.couponName || ''
    let couponDesc = viewModel.couponDesc || ''
    let dateDesc = viewModel.dateDesc || ''
    let isPicked = viewModel.isPicked || false;

    return(
      <TouchableWithoutFeedback
            onLayout={(event)=>{
              let y = Math.ceil(event.nativeEvent.layout.y)
              console.log('y='+ y);
            }}
            onPress={()=>{
              if(this.props.superCallBack) {
                this.props.superCallBack(1, viewModel.id)
              }
            }}
       >
          <View  style={styles.container} >
            <ImageBackground
              style={styles.icon}
              source={icon}
              >
              <Text style={styles.iconText} numberOfLines={0} >{couponName}</Text>
            </ImageBackground>

            <View style={styles.rightBg}>
              <Text style={styles.textPrefix} numberOfLines={1} >{prefix}
                <Text style={styles.textNum} numberOfLines={1} >{promotionRate}</Text>
              </Text>
              <Text style={styles.textDesc} numberOfLines={1} >{couponDesc}</Text>
              <Text style={styles.textDate} numberOfLines={1} >{dateDesc}</Text>
              
              <View  style={styles.btn}>
                <Image style={styles.btnImg} source={isPicked?btnImgSelected:btnImgNomal}/>
              </View>
            </View>
          </View>
      </TouchableWithoutFeedback>
    )
  }
}




const styles = StyleSheet.create({
  container: {
      marginTop: 10,
      marginLeft: 16,
      marginRight: 15,
      height: 84,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'transparent',
  },

  icon: {
    width: 52,
    height: 84,
    justifyContent:'center',
  },

  iconText: {
    marginLeft: 8,
    color: 'white',
    width: 20,
    fontSize: 15,
    lineHeight: 20,
    textAlign:'center',
  },

  rightBg: {
    flex: 1,
    height: 84,
    backgroundColor: 'white',
    marginLeft: 0,
    paddingRight: 40,
    borderWidth: 0, 
    borderRadius: 4,
    borderColor: 'transparent',
  },

  textPrefix: {
    marginLeft: -3,
    marginTop: 10,
    fontSize: 18,
    lineHeight: 33,
    color: '#FC8936',
  },
  
  textNum: {
    fontSize: 24,
    height: 28,
  },

  textDesc: {
    marginTop: 0,
    fontSize: 12,
    color: 'rgba(0,0,0,.9)',
    lineHeight: 17,
  },

  textDate: {
    marginTop: 0,
    fontSize: 10,
    lineHeight: 14,
    color: 'rgba(0,0,0,.3)',
  },

  btn: {
    position:'absolute',
    marginLeft: DeviceWidth - 15 - 20 - 40 - 52,
    width: 40,
    height: 84,
    alignItems: 'center',
    justifyContent:'center',
  },

  btnImg: {
    width: 20,
    height: 20,
  },
})