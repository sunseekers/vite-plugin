export default function myExample(){
  // 返回一个插件
  return {
    name:"my-example",
    // import xx from source 即from后面的 那个id确认
    resolveId(source){
      if(source === 'vitual-modele'){
        return source // 返回source表明命中了，vite不再询问其他插件处理该id请求
      }
      return null // 返回null表明没有命中，是其他的id还需要继续处理
    },
    // 加载模块代码
    load(id){
      if(id=== 'vitual-modele'){
          return 'export default "this is virtual"'// 返回vitual-modele要做的事情或者内容或者函数
      }
      return null //其他id继续处理
    }
  }
}