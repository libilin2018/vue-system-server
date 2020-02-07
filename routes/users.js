var express = require('express');
var router = express.Router();
var User = require("../models/users");

// const tokens = {
//   admin: {
//     token: 'admin-token'
//   },
//   editor: {
//     token: 'editor-token'
//   }
// }

// const users = {
//   'admin-token': {
//     roles: ['admin'],
//     introduction: 'I am a super administrator',
//     avatar: 'https://user-gold-cdn.xitu.io/2019/5/5/16a8686050a55e08?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1',
//     name: '管理员'
//   },
//   'editor-token': {
//     roles: ['editor'],
//     introduction: 'I am an editor',
//     avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
//     name: 'Normal Editor'
//   }
// }

const info = {
  "introduction" : "这个人很赖，什么也没留下",
  "avatar" : "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
  "roles" : [ 
      "user"
  ],
  "time": new Date().getTime()
}

function getId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findOne({}, (err, user) => {
    res.json({
      message: user
    })
  })
});

router.post('/login', function(req, res, next) {
  let params = {
    username: req.body.username,
    password: req.body.password
  }
  User.findOne(params, (err, doc) => {
    if (err) {
      res.json({
        code: 444,
        message: err.message
      })
    } else {
      if (doc) {
        // console.log(doc.toObject().role)
        const data = {
          token: doc.toObject().token
        }
        res.json({
          code: 20000,
          data
        })
      } else {
          res.json({
            code: 444,
            message: '账号或者密码错误'
          })
      }
    }
  })
});

router.post('/register', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  User.findOne({ username }, (err, doc) => {
    if (doc) {
      res.json({
        code: 444,
        message: '该用户已存在，请更改用户名'
      })
    } else {
      const token = getId()
      info.name = username
      const user = new User({
        username,
        password,
        token,
        info,
        time: new Date().getTime()
      })
      user.save((err, doc) => {
        res.json({
          code: 20000,
          message: '注册成功'
        })
      })
    }
  })
})

router.post('/info', (req, res, next) => {
  const token = req.body.token
  console.log(token)
  User.findOne({ token }, (err, doc) => {
    if (err) console.log(err)
    else {
      const info = doc.toObject().info
      res.json({
        code: 20000,
        data: info
      })
    }
  })
})

router.post('/logout', (req, res, next) => {
  res.json({
    code: 20000,
    data: 'success'
  })
})

router.post('/userList', (req, res, next) => {
  const token = req.body.token
  User.findOne({ token }, (err, user) => {
    if (err) console.log(err)
    else {
      const roles = user.toObject().info.roles
      if (roles.includes('admin') || roles.includes('super-admin')) {
        User.find({}, (err, users)=>{
          if (err) console.log(err)
          else {
            if (!roles.includes('super-admin')) {
              users = users.map(item => {
                item.password = '*******'
                return item
              })
            }
            res.json({
              code: 20000,
              message: users
            })
          }
        })
      } else {
        res.json({
          code: 444,
          message: '暂无权限访问该页面'
        })
      }
    }
  })
})

router.post('/changeRoles', (req, res, next) => {
  const username = req.body.username
  const roles = req.body.roles
  User.findOne({ username }, (err, user) => {
    if(err) console.log(err)
    else {
      user = user.toObject()
      user.info.roles = roles
      User.update({ username }, user, (err, doc) => {
        if(err) console.log(err)
        else {
          res.json({
            code: 20000,
            message: doc
          })
        }
      })
    }
  })
})

router.post('/deleteUser', (req, res, next) => {
  const username = req.body.username
  User.findOneAndDelete({ username }, (err, doc) => {
    if (err) console.log(err)
    else {
      res.json({
        code: 20000,
        message: doc
      })
    }
  })
})

router.post('/changeInfo', (req, res, next) => {
  const username = req.body.username
  const info = req.body.info
  User.findOneAndUpdate({ username },  {'$set': {'info': info}}, (err, doc) => {
    if (err) console.log(err)
    else {
      res.json({
        code: 20000
      })
    }
  })
})

module.exports = router;
