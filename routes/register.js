var express = require("express");
var router = express.Router();
const user = require("../sql/logins");

router.get("/", function(req, res, next) {
    console.log('进来register路由的/里面了')
    res.render("register");
})

router.post("/in", function(req, res, next) {
    console.log("进入register 的in 处理");
    let obj = req.body;
    // console.log(obj)
    user.findOne({ username: obj.username }, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log('正在查询账号存在不');
        if (data) {
            // 账号已存在
            console.log('注册失败');
            res.redirect('/register')
        } else {
            user.insertMany(obj, (err, data) => {
                if (err) {
                    console.log(err)
                }
                console.log(data)

                if (data) {
                    console.log('注册成功');
                    res.redirect('/login')
                }

            })
        }

    })

    // user.insertMany(obj, (err, data) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     console.log(data)

    //     if (data) {
    //         res.redirect('/login')
    //     } else {
    //         res.redirect('/register')
    //     }

    // })


});

module.exports = router;