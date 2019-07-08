/**
 * @this AlertInputView
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 
**/

'use strict'
import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
} from 'react-native';

import PropTypes from 'prop-types';

import {DeviceWidth, DeviceHeight} from 'react-native-rxdialog/src/util/PlatformType.js'

const InputWidth = DeviceWidth<=320?200:238;

export interface AlertInputViewProperites {
  style?: ViewProps.style;
  title?: JSX | string | number;
  detail?: string;
  titleStyle?: TextProps.style;
  detailStyle?: TextProps.style;
  bottomHeight?: number;
  isShowCloseBtn?: Boolean;
  bottomButtons?: Array<{
    title: string,
    ...ButtonProperties
  }>;
}

const DefaultProps = {
  bottomHeight: 50,
  isShowCloseBtn:true,
};

export default class OverlayAlertInputView extends Component<AlertInputViewProperites> {

  static defaultProps = {
    bottomHeight: 50,
    isShowCloseBtn: true,
  }
  constructor(props) {
    super(props);
    this.state = {
        detail: this.props.detail,
    };
  }

  renderBottom = () => {
    const { dismiss, bottomButtons, bottomHeight } = this.props;
    const views = [];
    if (bottomButtons.length === 1) {
      const { title, onPress, ...others } = bottomButtons[0];
      var titleStr = title ? title : '确定'
      views.push(
        <TouchableOpacity 
            style={{ flex: 1 }}
            activeOpacity={0.5}
            onPress={() => {
              dismiss && dismiss();
              onPress && onPress(this.state.detail);
            }}>
            <View style={styles.buttonView}>
                <Text style={styles.sureButton}>{titleStr}</Text>
            </View>
        </TouchableOpacity>
      );
    } else {
      bottomButtons.forEach(({ title, onPress, ...others }, index) => {
        var titleStr = title ? title : '确定'
        if (!index) {
          views.push(
            <TouchableOpacity 
                key={'btn'+index+1}
                style={{ flex: 1 }}
                activeOpacity={0.5}
                onPress={() => {
                    dismiss && dismiss();
                    onPress && onPress(this.state.detail);
                }}>
                <View style={styles.buttonView}>
                    <Text style={styles.cancelButton}>取消</Text>
                </View>
            </TouchableOpacity>
          );
        } else {
          views.push(
            <View
              key="line"
              style={{
                width: 0.5,
                height: bottomHeight-20,
                backgroundColor: '#DFDFDB',
              }}
            />
          );
          views.push(
            <TouchableOpacity 
                key={'btn'+index+1}
                style={{ flex: 1 }}
                activeOpacity={0.5}
                onPress={() => {
                  dismiss && dismiss();
                  onPress && onPress(this.state.detail);
                }}>
                <View style={styles.buttonView}>
                    <Text style={styles.sureButton}>{titleStr}</Text>
                </View>
            </TouchableOpacity>
          );
        }
      });
    }

    return <View style={{ height: bottomHeight, width: '100%', flexDirection: 'row' ,alignItems: 'center',justifyContent: 'center'}}>{views}</View>;
  };

  renderCloseBtn = () => {
    const { dismiss, isShowCloseBtn } = this.props;
    if (isShowCloseBtn) {
      return <TouchableOpacity 
              activeOpacity={0.5}
              onPress={() => {
                dismiss && dismiss();
              }}>
                <View style={styles.imageView}>
                  {/* <Image source={ImageMap.icon_close} /> */}
                  <Text>关闭</Text>
                </View>
            </TouchableOpacity>
    } else {
      return <View style={{height:30}}/>;
    }
    
  }

  renderInput = () => {
    return (
      <TextInput
        maxLength={18}
        style={styles.input}
        value={this.state.detail}
        underlineColorAndroid={'transparent'}
        onChangeText={(text) => { this.setState({detail: text}) }}
      />
    )
}

  render() {
    let { title, titleStyle } = this.props;
    const { children } = this.props;
    const { style } = this.props;

    // title
    if (typeof title === 'string' || typeof title === 'number') {
      titleStyle = [styles.title].concat(titleStyle);
      title = <Text style={[titleStyle]}>{title}</Text>;
    }

    return (
      <View style={[styles.container, style]}>
        {this.renderCloseBtn()}
        {title}
        {this.renderInput()}
        <View
          key="line"
          style={{
            width: '100%',
            height: 0.5,
            backgroundColor: '#DFDFDB',
          }}
        />
        {this.renderBottom()}
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: DeviceWidth - 80,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  imageView:{
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  title: {
    paddingHorizontal: 25,
    color: 'rgba(0, 0, 0, 0.9)',
    fontSize: 16,
    lineHeight: 20,
    marginTop: 5,
    marginBottom: 16,
    fontFamily: 'PingFangSC-Regular',
    textAlign:'center'
  },
  detail: {
    paddingHorizontal: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 20,
    fontFamily: 'PingFangSC-Regular',
    textAlign:'center'
  },
  sureButton: {
    color: '#30A0EB',
    fontSize: 16,
    fontFamily: 'PingFangSC-Medium',
    textAlign:'center'
  },
  cancelButton: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 16,
    fontFamily: 'PingFangSC-Medium',
    textAlign:'center'
  },
  buttonView: {
    width: '100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height:40,
    width:InputWidth,
    alignSelf: 'center',
    backgroundColor: "#F6F6F6",
    fontSize: 15,
    marginBottom:14
},
});
