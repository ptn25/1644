var express = require('express')
var app = express()
var fs = require('fs')
const crypto = require("crypto")

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

const fileName = "data.txt"

app.post('/search',(req,res)=>{
    const name = req.body.txtName
    let arra = []
    readDataFile(arra)
    const empFound = arra.filter((value,index,ary)=>{
        return value.name == name
    })
    res.render('view',{'ds':empFound})
})

app.post('/edit',(req,res)=>{
    //lay thong tin tu user input
    const id = req.body.txtId
    const name = req.body.txtName
    const country = req.body.country

    //tim Emp co Id can edit
    let arra = []
    readDataFile(arra)
    let empFound = arra.filter((value,index,ary)=>{
        return value.id == id
    })
    //cap nhat trong array
    empFound[0].name = name
    empFound[0].country= country
    //update file
    writeDataFile(arra)
    res.redirect('/view')
})

app.get('/edit',(req,res)=>{
    const id = req.query.id
    let arra = []
    readDataFile(arra)
    const empFound = arra.filter((value,index,ary)=>{
        return value.id == id
    })
    res.render("edit",{'emp':empFound[0]})
})

app.get('/view',(req,res)=>{
    let arra = []
    readDataFile(arra)
    res.render('view',{'ds':arra})
})
app.get('/delete',(req,res)=>{
    const name = req.query.name
    let arra = []
    readDataFile(arra)
    let result = arra.filter((value,index,array)=>{
        return value.name != name
    })
    writeDataFile(result)
    res.redirect("/")
})

app.post('/new',(req,res)=>{
    const name =req.body.txtName
    const country = req.body.country
    if(name.trim().length==0){
        res.render("new",{'errorMsg':"Name cannot be blank!"})
        return
    }
    const uuid = crypto.randomUUID()
    const content = uuid + ";" + name + ";" + country + "\n"
    fs.appendFileSync(fileName,content)
    res.redirect('/')

})

app.get('/new',(req,res)=>{
    res.render('new')
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = 5000
app.listen(PORT)
console.log("Server is running!")
function readDataFile(arra) {
    const fileContent = fs.readFileSync(fileName, "utf8").trim()
    if(fileContent.length==0)
        return;
    const lines = fileContent.split("\n")
    lines.forEach(element => {
        let nameAndCountry = element.split(";")
        const employee = {
            id : nameAndCountry[0],
            name: nameAndCountry[1],
            country: nameAndCountry[2]
        }
        arra.push(employee)
    })
    console.log(arra)
}
function writeDataFile(result){
    let content = ""
    result.forEach( element => {
        content  += element.name + ";" + element.country + "\n"
        
    });
    fs.writeFileSync(fileName,content)
}