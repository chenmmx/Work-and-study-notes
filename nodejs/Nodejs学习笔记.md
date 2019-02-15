## 简单的http服务器实现

```javascript
var http = require('http')
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('hello')
}).lesten(3000)
console.log('Server running at http://localhost:3000/')
```

## 在node中使用express

```javascript
const express = require('express')
const path = require('path')

const app = new express()

//使用express渲染页面，将所有资源放在public
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
    res.render('index')
})

app.listen('3000', function() {
    console.log('server is running at 3000 port!')
})
```

## 在node中使用mysql

```javascript
const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const path = require('path')

const app = new express()
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
})

connection.connect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
    res.render('index')
})

app.post('/sendinfo',(req, res) => {
    console.log(req.body)
    connection.query('INSERT INTO infomation(content) VALUES(?)',req.body.data,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        

       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result); 
       console.log('-----------------------------------------------------------------\n\n');  
});
})

app.get('/getinfo', (req, res) => {
    connection.query('SELECT * FROM infomation', function(err, result) {
        result = JSON.stringify(result)
        // console.log(result)
        res.end(result)
    })
})

app.listen(3000, () => {
    console.log('Server is running at 3000 port!')
})
```

