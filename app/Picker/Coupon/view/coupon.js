/**
 * @this coupon
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 可用的参数列表:
 * @param inputMoney    (int/String)
 * @param couponType    (String)
 * @param model         (Dictionary) 
 * 
 * 可用的方法列表: 
 * @function superCallBack (function) 
 * 
 * -------------------------------------------
 * @info 优惠券UI 的外层 ， ui层级如下：
 *  可用
 *  {array}
 *  更多 
 *  增加出借金额  
 *  {array}    
**/

'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  LayoutAnimation,
  TouchableWithoutFeedback,
  Platform
} from 'react-native'

import CouponItem from './CouponItem'
import ImageMap from '../../images/ImageMap';

const iconMore = ImageMap.coupon_more;

const LINE_ARRAY = [
                      {
                        width: 80,
                        title: '当前可用'
                      },
                      {
                        width: 200,
                        title: '增加出借金额，可享更多优惠'
                      }
                    ];

export default class coupon extends Component {
  constructor(props){
    super(props);
    this.state = ({
      selectedItem: null,
      showMore: true,
    });
  }

  static defaultProps = {
    inputMoney: 0,
    superCallBack : {},
    models : {},
    couponType: 0
  }

  componentDidMount(){
    
  }

  componentWillUnmount() {
    if(this.props.superCallBack) {
      this.props.superCallBack(-1)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { clear } = nextProps;
    if(clear) {
      this._switchShowMore(true)
    }
  }

  // ---- `text` ----
  _getCoupon_line_use(action){
    if(action < 0) return null;
    let dict = LINE_ARRAY.length > action ? LINE_ARRAY[action] : {width: 0, title: ''};
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', height: 20, marginTop: 15, marginLeft:20, marginRight: 20}}>
        <View style={styles.line} />
        <Text style={{width: dict.width, fontSize: 14, color: 'rgba(0,0,0,.6)', lineHeight: 20, textAlign: 'center'}}>{dict.title}</Text>
        <View style={styles.line} />
      </View>
    )
  }

  _getShowMore(showMore=false) {
    //需要写样式
    if(!showMore) return null;
    return (
      <TouchableWithoutFeedback
        onPress={()=>{
          LayoutAnimation.linear();
          this._switchShowMore()
        }}
      >
      <View style={styles.more}>
        <Text style={styles.moreText}>更多</Text>
        <Image source={iconMore} style={styles.moreImage} />
      </View>
      </TouchableWithoutFeedback>
    )
  }

  _switchShowMore(_switch=false) {
    let showMore = this.state.showMore;
    if(showMore !== _switch) {
      this.setState({ showMore: _switch })
    }
  }

  _setPropsExpandMoreBack(expandMore) {
    if(this.props.expandMoreBack) {
      this.props.expandMoreBack(expandMore)
    }
  }

  _getCouponModelUI(model, key, use_avail=false) {
    if(!model) model = {}
    let couponType = this.props.couponType;
    let viewModel = model.viewModel || {}
    //根据类型选UI 
    if(couponType === 1) {
      return(
        <CouponItem 
          key={key} //这个是 view上绑定，不是传值
          model={viewModel}
          superCallBack={(action = 1, id)=> {
              if(id > 0 && use_avail && key>1) { //如果点击可用里面 > 前2个元素的 ， 就记录下次，不用显示更多
                this._switchShowMore();
                this._setPropsExpandMoreBack(true);
              }
              else if(id > 0){ //数据异常处理 - [以防万一]
                this._setPropsExpandMoreBack(false);
              }

              if(this.props.superCallBack) {
                this.props.superCallBack(action, model);
              }
          }}
        />
      )
    }
    else {
      return(null)
    }
  }

  _getCouponArrayUI(array, use_avail=false) {
    if(!array) return null;
    var new_array = [];
    for(var i = 0; i < array.length; i ++) {
      let super_model = array[i];
      let model = super_model || null;
      if(model) {
        new_array.push(this._getCouponModelUI(model, i, use_avail));
      }
    }
    return new_array;
  }

  render(){
    let models = this.props.models
    let availArr = models.availArr || []
    let unAvailArr = models.unAvailArr || []
    var new_availArr = availArr;

    var showMore = false;

    if(!this.props.expandMore) {
      if(this.state.showMore && availArr.length > 2 && unAvailArr.length) {
        new_availArr = availArr.slice(0, 2);
        showMore = true
      }
    }

    var availArr_ui = this._getCouponArrayUI(new_availArr, true);
    var unAvailArr_ui = this._getCouponArrayUI(unAvailArr);

    return(
      <View style={{flex:1}}>
      {
        availArr.length  ? 
          this._getCoupon_line_use(0)
        : null
      }
      {availArr_ui}
      {this._getShowMore(showMore)}
      {
        availArr.length && unAvailArr.length ? 
          this._getCoupon_line_use(1)
        : null
      }
      {unAvailArr_ui}
      </View>
    )
  }
}



const styles = StyleSheet.create({
  line: {
      flex: 1,
      marginLeft: 3,
      marginRight: 3,
      height: 0.5,
      backgroundColor: '#D8D8D8'
  },

  more: {
    marginTop: 10,
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 20,
    justifyContent: 'center',
  },

  moreText: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(0,0,0,0.30)',
  },

  moreImage: {
    marginLeft: 7,
    width: 16,
    height: 16,
  }

})