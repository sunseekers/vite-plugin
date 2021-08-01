import { Router } from 'express';
import path from 'path'

let mockRouteMap = {};
// 路由的匹配规则
function matchRoute(req){
  let routeList = mockRouteMap[req.method.toLowerCase()]
  return routeList&&routeList.find(item=>item.url===req.url)
}
// 创建一个路由表
function createRoute(mockConfList){
  mockConfList.forEach(mockConf=>{
    let method = mockConf.method.toLowerCase()||'get'
    if(!mockRouteMap[method]){
      mockRouteMap[method] = []
    }
    mockRouteMap[method].push(mockConf)
  })
}

// 从写一下send方法，因为里面默认没有了
function send(body){
  let chunk = JSON.stringify(body)
  if(chunk){
    chunk = Buffer.from(chunk,'utf-8')
    this.setHeader("Content-Length",chunk.length)
  }
  this.setHeader("Content-Type","application/json")
  this.statusCode = 200
  this.end(chunk,'utf8')
}
// 开始写vite插件
export default function (option={}){
  // 获取mock的路径
  option.entry = option.entry || './mockIndex.js'
   // 转换为绝对路径
   if(!path.isAbsolute(option.entry)){
    option.entry = path.resolve(process.cwd(),option.entry)
   }

   // 写插件
   return {
     configureServer:function({app}){
       // 定义路由表
       const mockObj = require(option.entry)
      // 创建路由表
       createRoute(mockObj)
      // 定义中间件，路由匹配
       const middleware = (req,res,next)=>{
         console.log(mockRouteMap);
         // 执行匹配过程
         let route = matchRoute(req)
         if(route){
           res.send = send
           route.handler(req,res)
         }else{
           next()
         }
       }
       // 最终目标给app组册一个中间件
       app.use(middleware)
     }
   }
}