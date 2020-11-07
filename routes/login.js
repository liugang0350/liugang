var express = require("express");
var router = express.Router();
const user = require("../sql/logins");

router.get("/", function(req, res, next) {
    console.log('进来login路由的/里面了')
    res.render("login");
})

router.post("/in", function(req, res, next) {
    console.log('正在登录')

    let obj = req.body;
    console.log(obj)

    user.findOne(obj, (err, data) => {
        if (err) {
            console.log(err, '有问题')
        }

        if (data) {
            // req.session.islogin = 'ok'
            res.cookie('islogin', 'ok')
            console.log('账号存在，跳转首页');
            // console.log(req.session.islogin);
            res.redirect('/')
        } else {
            console.log(obj);
            console.log('账号不存在，跳转注册');
            res.redirect('/register')
        }
    })

});



// router.post("/in", function(req, res, next) {
//     console.log('进来login 路由了 /in了 ')
//     console.log(req.body)
//     user.findOne({ username: req.body.username, password: req.body.password }, (err, data) => {
//         if (err) {
//             console.log(err)
//         }
//         if (data) {
//             //response  服务器和你说 你的肚子里面 cookie那个位置 给我村上islogin = 0k
//             //res.cookie('islogin','ok')
//             //注意 这里是req 设置的 实在服务器端设置的 因为要先分裂成一个对象 给前端一个 后端藏一个  前端通过给的那一个加密的来找信息
//             req.session.islogin = 'ok'
//             console.log('我在login路由 /in')
//             console.log(req.session.islogin)
//             res.redirect('/')
//         } else {
//             res.redirect('/register')
//         }
//     })

// });





module.exports = router;