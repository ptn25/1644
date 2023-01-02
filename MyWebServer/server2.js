var express = require('express')
var fs = require('fs')
var app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/',function (req,res){
    res.render('home')
})

app.get('/student',function(req,res){
    res.render('student')
})

app.get('/readFile',function(req,res){
    const content = fs.readFileSync("data.txt","utf-8")
    let a = content.split(";")
    res.render("readFile",{'name':a[0],'country':a[1]})
})

app.post('/register', function(req,res){
    let name = req.body.txtName
    let country = req.body.country
    const content =  name + ";" + country
    fs.writeFileSync("data.txt",content)
    res.render('confirm', {'name': name, 'country': country})
})

const PORT = 5000
app.listen(PORT)
console.log("server is running!")