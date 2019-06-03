`webpack+vue`���ã������`webpack`��`webpack-dev-server`�������ã����ڴ˻��������ҵ���߼���

���أ�
```cmd
git clone https://github.com/mandyshen97/vue-webpack.git
```
��װ������
```$xslt
npm install
```
���У�
```cmd
npm run dev
```
<hr/>
<hr/>

# `vue+webpack`��Ŀ��������
## ����`webpack`��Ŀ

### ��Ŀ��ʼ��

- ������Ŀ�ļ��У����ն�

```cmd
npm init
```

���� `package.json`

- ��װ��������

```cmd
npm install webpack vue vue-loader
```

- ��װ������һЩ���ѣ��������Ѱ���Ҫ������װ��ȥ

```cmd
npm i css-loader vue-template-compiler 
```

��ʱ��Ŀ�ͳ�ʼ�����ˡ�

## `webpack`��Ŀ����

### ��д�����

- �����ļ��� `src` ���ļ���`src/assets`���ļ�`src/App.vue`������ļ�`src/index.js`

��`App.vue`��д���¼�������룺

```javascript
// App.vue

<template>
  <div id="test">{{text}}</div>
</template>

<script>
export default {
  data() {
    return {
      text: 'abcd'
    }
  }
}
</script>

<style>
  #test {
    color: red;
  }
</style>
```

��Ȼ���������޷����������ֱ�����еģ�����Ĳ���ʹ���������С�

- ��`index.js`�н�`App`������ص�`dom`�ڵ��С�

```javascript
// index.js

/**
 * ����ļ�
 */
import Vue from 'vue';
import App from './App.vue';

const root = document.createElement('div');
document.body.appendChild(root);

// ����Vue���󣬽�App������ص�root�ڵ�
new Vue({
  render: (h) => h(App)
}).$mount(root)
```

> `webpack`�ǰ����Ǵ��ǰ����Դ�ģ����ǵ�ǰ����Դ�кܶ����ͣ�����˵`javascript` , `css `,`images`������ȣ���Щ����Ҫͨ��`http`����ȥ���ص����ݡ�

- �� `package.json`ͬ��λ�ý���`webpack.config.js`�ļ���

```javascript
// webpack.config.js

// path��nodejs�е�һ������������������·����
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // �������,entryʹ�þ���·������֤��������
  entry: path.join(__dirname, 'src/index.js'),
  mode: 'production',
  // ����
  output: {
    // �������ļ�������index.js�Լ�����������Դ�����bundle.js��
    filename: 'bundle.js',
    // ���·��
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /.css$/,
        loader:['css-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

- ��`package.json`�����`build`:

> ֻ��������������`webpack`���Ż�������ǰ�װ����Ŀ�����`webpack`���������������ӣ�ֱ���������������䣬��ʹ�õ���ȫ�ֵ�`webpack`���汾���ܲ�һ����Ӧ����������ӡ�

```json
// package.json

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+   "build": "webpack --config webpack.config.js"
  },
```

- ����

```cmd
npm run build
```

��ʱ����Ŀ�ļ���������`dist`�ļ��м�`dist/bundle.js`

### һЩ`loader`����

- �� `webpack.config.js`������������ݣ�

```javascript
module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader:  'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  }
```

��װ�����Ӧ��`loader`

```cmd
npm i style-loader url-loader file-loader
```

- �� `assets`�ļ����д���`assets/images`,`assets/styles`

- �� `styles`�´���`test.css`

```css
body{
     color: red;
     background-image: url('../images/do.jpg');
 }
```

- ��`index.js`��`import`���`test.css`��ͼƬ�ļ�

```javascript
// index.js

import './assets/styles/test.css';
import './assets/images/bg.jpg';
```

- ִ��

```cmd
npm run build
```

���Կ���ͼƬ���������`dist�ļ�����`��`bundle.js`��Ҳ����`test.css`������.

- �� `webpack.config.js`��moduleģ���rules�����cssԤ�������Ĺ���

```javascript
{
  test: /\.styl/,
  use: [
  	'style-loader',
  	'css-loader',
  	'stylus-loader'
	]
}
```

```cmd
npm i stylus-loader stylus
```

- �� `styles`Ŀ¼���½�`test-stylus.styl`�ļ�

```stylus
// test-stylus.styl

body
  font-size 20px
```

- �� `index.js`������`test-stylus.styl`

```javascript
import './assets/styles/test-stylus.styl';
```

- ����

```cmd
npm run build
```

��ʱ��Ŀ��Ŀ¼�ṹ���£�
![](./src/assets/images/Ŀ¼�ṹ1.png)

## ����`webpack-dev-server`

- `webpack-dev-server`��һ��`webpack`�İ������ܷǳ�ǿ�󣬿���ȥ`webpack`����<https://webpack.docschina.org/configuration/>�鿴��ϸ���á����Ȱ�װ��

```cmd
npm i webpack-dev-server
```

- ��`package.json`�����"dev"

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js",
+   "dev": "webpack-dev-server --config webpack.config.js"
  },
```

�޸�`webpack.config.js`����������Ӧ`webpack-dev-server`�Ŀ���ģʽ��

```javascript
module.exports = {
  // ����Ŀ����webƽ̨
+ target: 'web',
```

��Ϊ�ڲ�ͬ��ƽ̨�����û��������ķ�ʽ�ǲ�һ���ģ�ʹ��`cross-env`���ڲ�ͬ�Ļ�����ʹ��ͬ���Ľű���

```cmd
npm i cross-env
```

�޸�`package.json`

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
-   "build": "webpack --config webpack.config.js",
+   "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
-   "dev": "webpack-dev-server --config webpack.config.js",
+   "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
  },
```

��`webpack.config.js`���жϣ�

```javascript
// webpack.config.js
// path��nodejs�е�һ������������������·����
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

- module.exports = {
+ const isDev = process.env.NODE_ENV === 'development';

+ const config = {
  ...
}

+ if(isDev){
+  config.devServer = {
    // �˿�
    port: 8080,
    // ����
    host: '0.0.0.0',
    // ʹwebpack������ʾ��ҳ����
    overlay: {
      error: true,
    }
  }
}


```

- ���`html`�ļ�ʹ��Ŀ����������ܴ򿪡�
- ���`html`���

```cmd
npm i html-webpack-plugin
```

���ò����

```javascript
+ const HTMLPlugin = require('html-webpack-plugin');

plugins: [
+   new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
+   new HTMLPlugin()
  ]
```

���У� 

```cmd
npm run dev
```

��������з��ʣ�<http://127.0.0.1:8080/>��<http://localhost:8080/>

��ʱ�ı�ҳ�����ݣ�**����**�����������ʾ�����Զ�ˢ�£���

- ������滻��`devtool`

```javascript
// ����ǿ���ģʽ���������������
if(isDev){
  // �����Ƿ����ɣ��Լ�������� source map
+ config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    // �˿�
    port: 8080,
    // ����
    host: '0.0.0.0',
    // ʹwebpack������ʾ��ҳ����
    overlay: {
      error: true,
    },
    // �Զ��������
    // open: true,
    // ģ�����滻��ֻ���¸��ĵĲ���
+   hot: true
  };
  // ��Ӳ��
+ config.plugins.push(
    // ��ģ���滻���
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}
```

- ����

```cmd
npm run dev
```

�ı����ݣ�ҳ��ֲ�ˢ�¡�

### �������

��ʱ���ļ����ݣ�

```javascript
// webpack.config.js

// path��nodejs�е�һ������������������·����
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  // ����Ŀ����webƽ̨
  target: 'web',
  // �������,entryʹ�þ���·������֤��������
  entry: path.join(__dirname, 'src/index.js'),
  mode: 'production',
  // ����
  output: {
    // �������ļ�������index.js�Լ�����������Դ�����bundle.js��
    filename: 'bundle.js',
    // ���·��
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader:  'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}

// ����ǿ���ģʽ���������������
if(isDev){
  // �����Ƿ����ɣ��Լ�������� source map
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    // �˿�
    port: 8080,
    // ����
    host: '0.0.0.0',
    // ʹwebpack������ʾ��ҳ����
    overlay: {
      error: true,
    },
    // �Զ��������
    // open: true,
    // ģ�����滻��ֻ���¸��ĵĲ���
    hot: true
  };
  // ��Ӳ��
  config.plugins.push(
    // ��ģ���滻���
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

module.exports = config;
```

��ʱ���ļ����ݣ�

```json
// package.json

{
  "name": "vue-todo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cross-env": "^5.2.0",
    "css-loader": "^2.1.1",
    "file-loader": "^3.0.1",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^0.23.1",
    "stylus": "^0.54.5",
    "stylus-loader": "^3.0.2",
    "url-loader": "^1.1.2",
    "vue": "^2.6.10",
    "vue-loader": "^15.7.0",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.32.2",
    "webpack-dev-server": "^3.5.1"
  },
  "devDependencies": {
    "webpack-cli": "^3.3.2"
  }
}
```
����ʱΪֹ����Ŀ���û�����ɣ�֮��дҵ���߼���
