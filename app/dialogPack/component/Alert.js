/**
 * @this Alert : Pack 的 alert 
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
**/
'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';

export default class Alert extends Component {

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    message: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    leftTitle: PropTypes.string,
    rightTitle: PropTypes.string,
    onLeftPress: PropTypes.func,
    onRightPress: PropTypes.func,
  }

  static defaultProps = {
    type: 'zoomIn',
    onLeftPress: () => { },
    onRightPress: () => { },
  }

  constructor(props) {
    super(props);
  }

  onLeftPress = () => {
    const { onLeftPress, dismiss } = this.props;
    onLeftPress && onLeftPress();
    dismiss && dismiss();
  }

  onRightPress = () => {
    const { onRightPress, dismiss } = this.props;
    onRightPress && onRightPress();
    dismiss && dismiss();
  }

  renderButton = (title, style, titleStyle, onPress) => {
    return(
      <TouchableOpacity style={[{justifyContent: 'center'},style]} onPress={()=>{onPress && onPress()}}>
        <Text style={[{textAlign:'center'}, titleStyle]} numberOfLines={1}>{title}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    let { title, message, leftTitle, rightTitle, ...others } = this.props;

    if (typeof title === 'string' || typeof title === 'number') {
      title = title ? <Text style={styles.title} >{title}</Text> : undefined;
    }

    if (typeof message === 'string' || typeof message === 'number') {
      message = message ? <Text style={styles.message} >{message}</Text> : undefined;
    }

    let btnStyle = { flex: 1 }, leftStyle;
    if (leftTitle && rightTitle) {
      btnStyle = { flex: 2 };
      leftStyle = { borderRightColor: '#f2f2f2', borderRightWidth: 1 };
    }
    return(
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>
          {title}
          {message}
          <View style={styles.bottomContainer} >
            {leftTitle ? this.renderButton(leftTitle, [btnStyle, leftStyle], styles.btnCancel, this.onLeftPress) : null}
            {rightTitle ? this.renderButton(rightTitle, btnStyle, styles.btnSure, this.onRightPress) : null}
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: 270,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 13,
  },
  title: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 13,
    textAlign: 'center',
    color: '#32312D',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    color: '#32312D',
    fontSize: 16,
    marginTop: 15,
  },
  bottomContainer: {
    height: 50,
    borderColor: '#f2f2f2',
    borderTopWidth: 1,
    flexDirection: 'row',
    marginTop: 13,
  },
  btnCancel: {
    fontSize: 18,
    color: '#64625B',
  },
  btnSure: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E3800',
  }
});