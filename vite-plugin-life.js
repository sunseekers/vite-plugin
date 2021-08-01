// vite 生命周期顺序测试
export default  function live() {
  return {
    name:"my-example",
    enforce:'pre||post',// 插件执行的顺序，pre表示在alias之后，在vite的核心插件之前，post在核心插件之后
    config(config){
      console.log("我是vite特有的生命周期函数=> 修改config配置的",config)
      return {}
    },
    configResolved(){
      console.log('我是vite特有的生命周期函数=> vite配置确认');
    },
    option(opt){
      console.log('我只只会执行一次的生命周期函数，通常在build的时候',opt);
    },
    configureServer(){
      console.log('我是vite特有的生命周期函数=> 用于配置dev server');
    },
    buildStart(){
      console.log('我只只会执行一次的生命周期函数，通常在开始build的时候');
    },
    transformIndexHtml(html){
      console.log('我是vite特有的生命周期函数=> html 转换的时候',html);
      return html
    },
    resolveId(source){
      console.log('每次有模块请求时都会被调用=>创建自定义确定函数，常用于定位第三方依赖');
    },
    load(id){
      console.log('每次有模块请求时都会被调用=>创建自定义加载函数，可用于返回自定义的内容');
    },
    transfrom(){
      console.log('每次有模块请求时都会被调用=>可用于转化已加载的模块内容');
    }

  }
}