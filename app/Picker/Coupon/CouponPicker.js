/**
 * @this CouponPicker
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 
 * 可调用的方法列表:
**/

'use strict'
import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity
} from 'react-native'

import RXPicker   from '../../dialogDIY/RXPicker'
import Coupon from './view/coupon'

import {RXCouponSchedule, RXCouponLookforID} from './model/couponSchedule'

import {ISIphoneX, ISIphone,ISAndroid, IFIphone, IFIphoneX,
  DeviceWidth, DeviceHeight} from 'react-native-rxdialog/src/util/PlatformType.js'


const CLOSE_IMG_SOURCE = require('../../images/icon_16x_close.png');  

const width = DeviceWidth;
const height = (DeviceHeight-IFIphoneX(88, 64, 64)) * 0.84;
const scrollHeight = height - 50

const falseDataArray = [
  {
    id: 1,
    discount : {
      amount: 0,
      type: 802,
      couponDesc: '无门槛',
      couponLimitTime: '2018.12.01-2019.12.19（使用一次作废）',
      couponName: '奖励券',
      effectiveAmount: 0, //比较的 是否为可用
      promotionalAnnualInterestRate: 0.8
    },
    amount : {
      left: 0.8
    }
  },
  {
    id: 6,
    discount : {
      amount: 6,
      type: 800,
      couponDesc: '无门槛，抵扣金额比例0.25%',
      couponLimitTime: '2018.12.01-2019.12.19（使用一次作废）',
      couponName: '抵扣券',
      effectiveAmount: 0,
      promotionalAnnualInterestRate: 1
    },
    amount : {
      left: 10
    }
  },
  {
    id: 7,
    discount : {
      amount: 60,
      type: 801,
      couponDesc: '无门槛，抵扣金额比例5.25%',
      couponLimitTime: '2018.12.01-2019.12.19（使用一次作废）',
      couponName: '抵扣券',
      effectiveAmount: 0,
      promotionalAnnualInterestRate: 1
    },
    amount : {
      left: 200
    }
  },
  {
    id: 2,
    discount : {
      amount: 2,
      type: 802,
      couponDesc: '出借满15万元可用',
      couponLimitTime: '2018.12.01-2019.12.19（使用一次作废）',
      couponName: '奖励券',
      effectiveAmount: 150000,
      promotionalAnnualInterestRate: 1.3
    },
    amount : {
      left: 1.3
    }
  },
  {
    id: 3,
    discount : {
      amount: 3,
      type: 802,
      couponDesc: '出借满10万元可用',
      couponLimitTime: '2018.12.01-2019.12.19（使用一次作废）',
      couponName: '奖励券',
      effectiveAmount: 100000,
      promotionalAnnualInterestRate: 5
    },
    amount : {
      left: 5
    }
  },
  {
    id: 4,
    discount : {
      amount: 4,
      type: 803,
      couponDesc: '特权本金 60元',
      couponLimitTime: '2018.12.01-2019.12.19（使用一次作废）',
      couponName: '特权本金',
      effectiveAmount: 60,
      promotionalAnnualInterestRate: 60
    },
    amount : {
      left: 60
    }
  },
  {
    id: 5,
    discount : {
      amount: 3,
      type: 800,
      couponDesc: '满5元，抵扣300000',
      couponLimitTime: '2018.12.01-2019.12.19（使用一次作废）',
      couponName: '抵扣券',
      effectiveAmount: 5,
      promotionalAnnualInterestRate: 300000
    },
    amount : {
      left: 300000
    }
  },

]

export default class CouponPicker extends RXPicker {
    constructor(props){
      super(props);
      this.state = ({
        newModels: [],
        clear: false,
        expandMore: false, //【可用优惠】更多
        selectedId: 0,
        selectedModel: null
      })
    }

    static defaultProps = {
      superCallBack : {},
    }

    componentWillReceiveProps(nextProps) {
      const { visible } = this.props;
      
      let newModels = RXCouponSchedule(falseDataArray, 0, this.state.selectedId);
      this.setState({newModels})

      if(this.state.selectedId > 0) { //如果 id == 0 ，就没有必要，再次查找所有数据 [fix]
        let expandMore = this.state.expandMore;
        let em = RXCouponLookforID(newModels.availArr, this.state.clear);
        if(expandMore !== em) {
          this.setState({expandMore: em})
        }
        
      }

      if (visible !== nextProps.visible && nextProps.visible) {
        this._doAnimal(1, ()=>{
        });
      }
    }

    createContentView(){
      return(
        <View style={{flex:1, height, width, backgroundColor: '#fff', overflow: 'hidden'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
            <TouchableOpacity
              style={styles.sideContainer}
              onPress={()=>{
                this._superCallBack(-1);
              }}
            >
              <Image source={CLOSE_IMG_SOURCE} style={styles.closeBtn} />
            </TouchableOpacity>
            <Text style={styles.title}>{'优惠券选择'}</Text>
            <TouchableOpacity
              style={styles.sideContainer}
              onPress={()=>{
                this.setState({clear: true})
                this._superCallBack(-2);
              }}
            >
              <Text style={styles.text}>{'不使用'}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{backgroundColor: '#F0F0F0', height:scrollHeight }} 
            showsVerticalScrollIndicator={false}
            ref={refScrollView=>this.refScrollView=refScrollView}
            >
            <View style={{paddingBottom: IFIphoneX(20, 10, 10)}}>
              <Coupon 
                clear={this.state.clear}
                couponType={1}
                models={this.state.newModels}
                superCallBack={ this._superCallBack.bind(this) }

                expandMore={this.state.expandMore}
                expandMoreBack={(expandMore)=>{
                  this.setState({expandMore})
                }}

              />
            </View>
          </ScrollView>
        </View>
      )
    }


    _superCallBack(action=0, model={}) {
      if(!model) model = {}
      var id = model.id || 0;
  
      if(!id) id = 0;
      if(action === -2) {
        this.state.selectedId = 0;
        this.state.selectedModel = null
        let props = this.props;
        let newModels = RXCouponSchedule(falseDataArray, 0, this.state.selectedId);
        this.setState({newModels, clear: true, expandMore: false, offsetY: 0})
      }
      else if(id>0) {
        let offsetY = this.state.scrollOffsetY;
        this.state.selectedId = id;
        this.state.selectedModel = model
        let props = this.props;
        let newModels = RXCouponSchedule(falseDataArray, 0, this.state.selectedId);
        this.setState({newModels, clear: false, offsetY})
      }
      else {
        this.setState({clear: false})
      }
  
      if(action != 0) {
        this._doAnimal(0, ()=>{
          if(this.props.superCallBack) {
            this.props.superCallBack(action);
          } 
        })
      }
    }
}


const styles = StyleSheet.create({
  sideContainer: {
    margin: 0, 
    width: 80, 
    height: 50, 
    alignItems: 'center', 
    justifyContent: 'center',
  },

  closeBtn: {
    marginLeft: -30,
    width: 12, 
    height: 12,
  },
  
  title: {
    flex: 1, 
    color: 'rgba(0,0,0,.9)', 
    fontSize: 18, 
    lineHeight: 50, 
    textAlign: 'center',
    fontWeight: 'bold'
  },

  text: {
    color: 'rgba(0,0,0,.6)',
    fontSize: 16,
  }

})