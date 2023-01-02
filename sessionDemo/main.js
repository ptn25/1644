var express = require('express')
var app = express()

app.set('view engine','hbs')

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://0.0.0.0:27017'

async function checkLogin(userName,password){
    console.log("checking login")
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    const result = await db.collection("websiteUsers").
                    findOne({$and: [{userName:userName},{password:password}]})
    console.log(result)
    return result
}

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:false,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(express.urlencoded({ extended: true }));


app.post('/user',async (req,res)=>{
    let userLogin = await checkLogin(req.body.username,req.body.password)
    if(userLogin){
        let session=req.session;
        //tao mot bien la userid trong session
        session.userid=userLogin.userName
        session.userRole = userLogin.role
        console.log(req.session)
        res.redirect('/')
    }
    else{
        res.send('Invalid username or password');
    }
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/',(req,res)=>{
    session=req.session;
    let userName = session.userid
    let userRole = session.userRole
    res.render('home',{'user':userName,'role':userRole})
})
const PORT = process.env.PORT || 3000
app.listen(PORT,(req,res)=>{
    console.log("Server is running!")
}) 