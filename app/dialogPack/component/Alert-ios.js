/**
 * 
 * 
 * @flow
 */
'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

export default class OverlayAlert extends Component {
  static propTypes = {
    ...View.propTypes,
    title: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.oneOfType([
        PropTypes.shape({
          uri: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
        }),
      ]),
      PropTypes.string,
      PropTypes.number,
    ]),
    titleStyle: PropTypes.any,
    detail: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.number,
    ]),
    detailStyle: PropTypes.any,
    bottomHeight: PropTypes.number,
    bottomButtons: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        style: PropTypes.any,
        onPress: PropTypes.func,
      })
    ),
    width: PropTypes.number,
  }

  static defaultProps = {
    ...View.defaultProps,
    bottomHeight: 50,
    width: 270,
  }

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  onConfirm( e=()=>{})  {
    if(e && typeof e === 'function') {
      e();
    }
  }

  onCancle( e=()=>{} ) {
    if(e && typeof e === 'function') {
      e();
    }
  }

  dismiss() {
    const { dismiss } = this.props;
    dismiss && dismiss();
  }

  _renderBtn = (label='', style={}, tag=1, isSure=false, callback=()=>{}) => {
    const { bottomHeight, dismiss } = this.props;
    const btnStyle = isSure?styles.sureButton: styles.cancelButton;
    let sure = isSure;
    return (
      <TouchableOpacity
        key={'btn' + tag + 1}
        style={{ flex: 1 }}
        activeOpacity={callback?0.5:1}
        onPress={() => {
          dismiss && dismiss();
          if(sure) {
            this.onConfirm(callback);
          }
          else {
            this.onCancle(callback);
          }
        }}>
        <View style={[styles.buttonView, {height: bottomHeight}]}>
          <Text style={[btnStyle, style]}>{label}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderBottoms = () => {
    let { bottomButtons, bottomHeight } = this.props;
    bottomButtons = bottomButtons || [];
    var btns = [];
    const length = bottomButtons.length;

    if (length <= 1) {
      let  { title, style, onPress} = bottomButtons[0] || {};
      title = title || '确定';
      style = style || {};
      const tempOnPress = ()=>{};
      onPress = onPress || tempOnPress;
      btns.push(this._renderBtn(title, style, 100, true, onPress));
    }
    else {
      for(var i=0; i<length; i++) {
        if(length<=2) {
          if(i%2 != 0) {
            let padH = bottomHeight/3 || 0.5;
            let middleLine = <View style={{width: 1, paddingVertical: padH}} key={'v-line-'+i + 200}>
                              <View style={{flex: 1, backgroundColor: '#f2f2f2'}} />
                            </View>
            btns.push(middleLine);
          }
        }
        else if(i){
          let middleLine = <View style={{height: 1, backgroundColor: '#f2f2f2'}} key={'h-line-'+i + 200} />
          btns.push(middleLine);
        }
        const item = bottomButtons[i] || {};
        const title = i === 0?item.title||'取消': item.title||'确定';
        let view = this._renderBtn(title, item.style, i, i === 1, item.onPress);
        btns.push(view);
      }
    }

    var btnsStyle = {flexDirection: 'row', height: bottomHeight};
    if(length > 2) {
      let height = (length * bottomHeight) + length;
      btnsStyle = {minHeight: height};
    }

    return (
      <View style={[styles.buttonArrayView, btnsStyle]}>
        {btns}
      </View>
    )
  } 

  renderTile() {
    return null;
  }

  renderDetail() {
    return null;
  }


  render() {
    let { style, title, titleStyle, detail, detailStyle,width, ...other } = this.props;
    // title
    if (title && typeof title === 'string' || typeof title === 'number') {
      let tempStyle = detail ? { marginTop: 20 } : { marginTop: 30, marginBottom: 30 };
      titleStyle = [styles.title, tempStyle].concat(titleStyle);
      title = <Text style={[titleStyle]}>{title}</Text>;
    }
    else if (title && React.isValidElement(title)) {

    }
    else if (title && typeof title === 'object') {
      let uri = title.uri;
      if (uri && typeof uri === 'string' && uri.length) {
        let tempTitle = title;
        let tempStyle = detail ? { marginTop: 20 } : { marginTop: 30, marginBottom: 30 };
        try {
          title = <View style={[{alignItems: "center"}, tempStyle]}><Image source={tempTitle} /></View>
        } catch (error) {
          console.warn('alert title not image');
          title = tempTitle;
        }
      }
    }
    else {
      title = this.renderTile();
    }

    // detail
    if (detail && (typeof detail === 'string' || typeof detail === 'number')) {
      detailStyle = [styles.detail].concat(detailStyle);
      detail = <Text style={[detailStyle]}>{detail}</Text>;
    }
    else if (detail && React.isValidElement(detail)) {

    }
    else {
      detail = this.renderDetail();
    }

    style = [styles.container].concat(style);
    style = [style].concat({width});

    return (
      <View style={style}>
        {title}
        {detail}
        <View style={styles.line} />
        {this._renderBottoms()}
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
  },
  title: {
    paddingHorizontal: 25,
    color: '#4E3800',
    fontSize: 18,
    textAlign: 'center',
  },
  detail: {
    paddingHorizontal: 20,
    color: '#4E3800',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#f2f2f2',
  },
  buttonArrayView: {
    width: '100%',
    backgroundColor: '#DCDCDC',
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
  },
  sureButton: {
    color: 'blue',
    fontSize: 18,
  },
  cancelButton: {
    color: '#696969',
    fontSize: 18,
  },
});