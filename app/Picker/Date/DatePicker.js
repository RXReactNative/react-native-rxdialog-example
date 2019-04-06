/**
 * @this DatePicker
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
	Animated,
	ScrollView,
	TouchableOpacity
} from 'react-native'

import PropTypes  from 'prop-types';

import RXPicker   from '../../dialogDIY/RXPicker'

import {ISIphoneX, ISIphone,ISAndroid, IFIphone, IFIphoneX,
  DeviceWidth, DeviceHeight} from 'react-native-rxdialog/src/util/PlatformType.js'
 

const width = DeviceWidth;
const height = 300;
const scrollHeight = height - 50

const CLOSE_IMG_SOURCE = require('../../images/icon_16x_close.png');

export default class DatePicker extends RXPicker {
    constructor(props){
      super(props);
      this.state = ({
        newModels: [],
        clear: false,
  
        selectedId: 0,
        selectedModel: null
      })
    }

    static defaultProps = {
      superCallBack : {},
    }

    componentWillReceiveProps(nextProps) {
      const { visible } = this.props;

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
            <Text style={styles.title}>{'日期选择'}</Text>
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

            </View>
          </ScrollView>
        </View>
      )
    }


    _superCallBack(action=0, model={}) {
      if(!model) model = {}
      var id = model.id || 0;
  
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