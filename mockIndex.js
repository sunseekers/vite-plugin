module.exports =[
  {
    method:"get",
    url:'/api/users',
    handler(req,res){
      return res.send([
        {username:'tom',age:18},
        {username:'sunseekers',age:19}
      ])
    }
  }
]
