## webpack-mpapp-target

[![NPM version][npm-image]][npm-url]

### 一、简介

基于`webpack`打包，将指定小程序转换成其他平台小程序的`webpack.target`。

###### 目前支持哪些平台转换?

- 微信小程序
- 支付宝小程序
- 字节跳动小程序

### 二、安装

> npm

```shell
  npm install webpack-mpapp-target --save-dev
```

> yarn

```shell
  yarn add webpack-mpapp-target --dev
```

### 三、使用

Webpack 简单配置

```js
module.exports = {
  target:require('webpack-mpapp-target')({  target:'wx' }),
}
```

> 配置详解

```js
require('webpack-mpapp-target')({  
  // 源代码小程序类型，值可以为: ['wx','alipay','bytedance']
  // wx:微信小程序
  // alipay:支付宝小程序
  // bytedance:字节跳动小程序
  // 默认为 wx
  from:'wx' ,
  // 要构建成的目标平台 值可以为: ['wx','alipay','bytedance']
  target:'alipay',
})
```

### 四、开源许可

基于 [MIT License](http://zh.wikipedia.org/wiki/MIT_License) 开源，使用代码只需说明来源，或者引用 [license.txt](https://github.com/sofish/typo.css/blob/master/license.txt) 即可。

[npm-url]: https://www.npmjs.com/package/webpack-mp-target
[npm-image]: https://img.shields.io/npm/v/webpack-mp-target.svg
