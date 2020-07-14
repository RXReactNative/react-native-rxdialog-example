/**
 * @this DateItem
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
* */


import React  from 'react';
import {
  StyleSheet ,
  Text ,
  View ,
  TouchableWithoutFeedback ,
} from 'react-native';


export default class DateItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = ({
      selectedItem: null ,
    });
  }

  static defaultProps = {
    model: {} ,
    onPress: {} ,
  }

  render() {
    const model = this.props.model || {};
    const txt = model.title || '';
    const { selected } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (this.props.onPress) {
            this.props.onPress();
          }
        }}
      >
        <View style={[
          styles.container ,
          { backgroundColor: selected ? 'red' : 'yellow' } ,
        ]}
        >
          <Text>{txt}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    marginTop: 10 ,
    alignItems: 'center' ,
    justifyContent: 'center' ,
  } ,

});
