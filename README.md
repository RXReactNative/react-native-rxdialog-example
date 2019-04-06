# react-native-rxdialog-example

javaScript --> dialog [ Alert、toash、sheet ... ]

## [react-native-rxdialog](https://github.com/RXReactNative/react-native-rxdialog)

## Getting started

`$ npm install react-native-rxdialog --save`

### Mostly automatic installation

`$ react-native link react-native-rxdialog`

#### 框架默认支持
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/1.png)
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/2.png)

#### 二次开发 demo ( rxdialog-example )
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/3.png)
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/4.png)
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/5.png)
![srxboys](https://github.com/RXReactNative/react-native-rxdialog-example/blob/master/screen_img/6.png)

<br /><br />


```js
  //default write
  RXAlert.show(
        '标题 RXAlert 支持自定义样式',
        '内容 ---- 不可以 [ 背景点击 ]',
        [
          { text: '确认', style:{color: 'green', fontSize: 30} },
          { text: '取消', style:{color: 'brown', fontSize: 8}  }
        ], (index)=>{
          console.log('click index='+ index);
        },{
          contentTextStyle: { color: 'blue', fontSize: 30}
        },{
          titleTextStyle: { color: 'orange' }
        }
  );
```      

<br /><br />