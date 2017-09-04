# vue-multiple-page-cnode

A multiple page demo based on Vue and Webpack, accessing data from the [API of CNode](https://cnodejs.org/api). And now it is only a SPA. 

If you are looking for how to bulid a multiple page with Vue and Webpack, it may give you some inspiration.

Vue-Router and Vuex also are included in the project. JQuery is inclueded to access the server. If you are unwilling to use JQuery, you can use `axios` or any other lib to replace it. Just to comment the line of 'jquery' on the `/src/webpack.config.js`.

```
new webpack.ProvidePlugin({
      $: "jquery",  /*free to replece jquery with axios*/
      JQuery: "jquery",
      moment: "moment",
      'window.jQuery': 'jquery',
    })

```

The Webapp is consisted of several components built on the single file components of Vue. 

## How to run the demo
* 1. make sure you have install Node at your computer
* 2. open the terminal and change your directory into the project
* 3. run the command `npm install` and `npm run dev` in order, then open the browser and tab `http://localhost:8010/user/article.html`
* 4. if you want to build it into the production, run the command `npm run build` and all the things will generated into the folder `/dist`

## Todo
* 1. the problem of Webpack CommonChunk Plugin, I have no idea how to put the personal css file into the common chunk.
* 2. the edit and reply function need to be added.
* 3. need to re-design the router to fix the bug when post a new article or read an article from AbourMe or New Post;




-----
一个多页面的vue项目，每个页面为一个模块，该模块为一个单页面应用。

项目使用了vue-router，本身为后台管理项目，所以添加了jquery；

若不需要，可以在`/src/webpack.config.js`中将其注释，换成`axios`或其他ajax库。

## 运行项目
* 1、 确保电脑安装有Node环境;
* 2、由于国内的环境问题，建议使用[淘宝镜像](https://npm.taobao.org/)去进行依赖安装；
* 3、安装完淘宝镜像后，依次执行`cnpm install`和`cnpm run dev`；
* 4、 打开浏览器，输入`http://localhost:8010/user/article.html`即可访问。

目前依然存在的问题:
* 1、公共模块打包的问题，如果拥有公共样式，应该怎样配置(目前使用的是webpack中自带的commonChunks默认配置，若该库不在node_modules中，将不会打包到vendor.css中)；
* 2、因为偷懒，eslint其实并没有启用...；
* 3、样式写得稍微有点过于随性，没有规整；
* 4、下拉加载以及上拉刷新待添加，目前暂时只用了自己写的翻页组件进行加载；
* 5、待添加评论以及更新文章功能，待添加个人信息功能。
* 6、路由跳转存在问题，当从个人信息或发表新文章后，跳转到文章详情，再后退时，路由处理需要优化

Reference to [vue-multiple-pages](https://github.com/Plortinus/vue-multiple-pages)

