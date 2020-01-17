# react-native-rxdialog-example

javaScript --> dialog [ Alert、toash、sheet ... ]

## [react-native-rxdialog](https://github.com/RXReactNative/react-native-rxdialog)

## Getting started

`$ npm install react-native-rxdialog --save`


`演示 web` / `show web`
https://rxreactnative.github.io/react-native-rxdialog-example/

#### default Support
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/1.png)
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/2.png)

#### Support extensions ( rxdialog-example )
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/3.png)
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/4.png)
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/5.png)
![srxboys](https://github.com/RXReactNative/react-native-rxdialog-example/blob/master/screen_img/6.png)

```sh
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
```
<br /><br />  

#### Support dialog pack ( rxdialog-example )
![srxboys](https://github.com/RXReactNative/react-native-rxdialog-example/blob/master/screen_img/8.png)
![srxboys](https://github.com/RXReactNative/react-native-rxdialog-example/blob/master/screen_img/9.png)
  
```sh
# writing is more convenient
AlertUtil.activity(()=>{
  console.log('9 - right - click sure')
})

AlertUtil.action(()=>{
  console.log('10 - left - click sure')
})
```

<br /><br />


web work
```sh
npm run web-nginx-dev
# or
npm run web-build-prod
```