const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()


const http = require('http').createServer(app)
const io = require('socket.io')(http)


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


app.get('/',(req,res)=>{
    if(req.session.User != undefined){

    
    res.render('index',{
        log:{username:req.session.User.name}

    })
}else{
    res.render('index',{

    })
}
})

var port = 7856

http.listen(port,()=>{console.log('http://localhost:'+port)})