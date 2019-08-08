srxboys 2019-4-12


### 一、ESLint javascript代码检测工具 

(官方：https://eslint.org) 
<br />
(中文翻译：https://cn.eslint.org)
<br />
[美团技术团队ESLint实践](https://tech.meituan.com/2019/08/01/eslint-application-practice-in-medium-and-large-teams.html)

-------------------------------------------------------------------------------------------------------
   代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格。
对大多数编程语言来说都会有代码检查，一般来说编译程序会内置检查工具。

   JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。

-------------------------------------------------------------------------------------------------------

### 二、作用： 

    1、静态分析、检查
    2、编码风格(定义规则)
    3、支持代码格式化(代码规范)

-------------------------------------------------------------------------------------------------------

### 三、eslint配置视频教程

[GitHub](https://github.com/HandlebarLabs/currency-converter-starter)
<br>
[React-Native 教程](http://learn.handlebarlabs.com/p/react-native-basics-build-a-currency-converter)
<br>
[eslint配置视频地址](https://learn.handlebarlabs.com/courses/react-native-basics-build-a-currency-converter/lectures/2643145)

-------------------------------------------------------------------------------------------------------
### 四、eslint规则使用

官方: https://eslint.org/docs/user-guide/configuring
<br>
中文翻译: https://cn.eslint.org/docs/rules/
<br>
blog解释说明(注意这个可能不是最新的)：https://www.jianshu.com/p/f8d2ef372adf

-------------------------------------------------------------------------------------------------------
### 五、eslint 安装

npm install eslint -g
eslint --init   //会有一些引导方式安装，每个版本都不同，不再说明，可以《边翻译，边安装》，看`三 视频教程的比较详细`

-------------------------------------------------------------------------------------------------------
### 六、eslint 针对 React-Native 需要的库：

npm install --save-dev eslint-config-airbnb
<br />
npm install --save-dev eslint-plugin-import
<br />
npm install --save-dev eslint-plugin-react
<br />
npm install --save-dev babel-eslint
<br />
npm install --save-dev eslint-plugin-jsx-a11y
<br />
npm install --save-dev prettier
<br />
npm install --save-dev prettier-eslint
<br />
<br />

eslint-config-airbnb    &nbsp;&nbsp;&nbsp;&nbsp;// 2012-10-28  `爱彼迎` JS 样式指南
<br>
eslint-plugin-import     &nbsp;&nbsp;&nbsp;&nbsp;// 2015-3-8      给elint设置规则，方便代码排错和格式化
<br />
eslint-plugin-react        &nbsp;&nbsp;&nbsp;&nbsp;// 2014-12-24  与babel-eslint配套的eslint规则插件
<br />
babel-eslint                   &nbsp;&nbsp;&nbsp;&nbsp;// 2015-2-22    用于eslint的babel分析器的包装器
<br />
eslint-plugin-jsx-a11y   &nbsp;&nbsp;&nbsp;&nbsp;// 2016-2-14    JSX元素上A11Y规则的静态AST检查器。
<br />
prettier                           &nbsp;&nbsp;&nbsp;&nbsp;// 2016-11-27  prettier是一个固执己见的代码格式化程序。
<br />
prettier-eslint                 &nbsp;&nbsp;&nbsp;&nbsp; // 2017-1-8      eslint --fix ➡️ 运行脚本格式代码
<br />

上面的库，都可以在 https://www.npmjs.com 搜索到

-------------------------------------------------------------------------------------------------------

### 七、运行检查:

npm run lint

-------------------------------------------------------------------------------------------------------

### 八、修复写法错误，删除无用的属性等等(危险操作):

npm run lint:flx

-------------------------------------------------------------------------------------------------------
