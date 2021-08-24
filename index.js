const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()


const http = require('http').createServer(app)
const io = require('socket.io')(http)

const model = require('./models/productsModel')

io.on('connection',(socket)=>{

    socket.on('msg',(date)=>{
        console.log(date)
    })
  
 })

app.use(fileUpload());

const bodyParser = require('body-parser');

//Routs 
const Routes = require('./Routs/routes')
//Database
const KnexDB = require('./database/Connection')


app.use(Routes)


app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs');


app.use(express.static(__dirname + '/public'));


app.get('/',async(req,res)=>{

    var slug = await  model.SlugCategory()


    if(req.session.User != undefined){

    
    res.render('index',{
        log:{username:req.session.User.name},
        slug:slug

    })
}else{
    res.render('index',{
        
        slug:slug
    })
}
})

var port = 80

http.listen(port,()=>{console.log('http://localhost:'+port)})
