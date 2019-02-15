```javascript
// app.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const User = require('./user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/register', express.static('./public/register.html'));
app.use('/login', express.static('./public/login.html'));

app.set('superSecret', config.secret);

mongoose.connect(config.url);

app.post('/register', function (req, res, next) {
    new User(req.body).save(function (err) {
        if (err) {
            return next(err);
        }
        console.log('用户注册成功');
        res.json({success: true});
    });
});

app.post('/login', function (req, res, next) {
    User.findOne({name: req.body.name}, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.json({success: false, message: '没有找到该用户'});
        }
        else if (user) {
            if (user.password != req.body.password) {
                res.json({success: false, message: '密码错误'});
            }
            else {
                let token = jwt.sign(user, app.get('superSecret'), {});
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});

app.get('/getName', function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        /*验证token*/
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({success: false, message: '验证token失败'});
            }
            else {
                req.decoded = decoded;
                res.send(decoded._doc);
            }
        });
    }
    else {
        return res.status(403).send({
            success: false,
            message: '没有token'
        });
    }
});


const port = process.env.PORT || config.port;
app.listen(port, ()=> {
    console.log('Listening on  http://localhost:' + port);
});
```

```javascript
// config.js
module.exports = {
    secret: 'ilovescotchyscotch',
    url: 'mongodb://huanglizhen:dhtb472561212@ds133582.mlab.com:33582/ttms',
    port:3000
};
```

