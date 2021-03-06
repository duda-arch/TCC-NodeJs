const express = require('express')
const app = express.Router()

const bcryptjs =  require('bcryptjs')
const session = require('express-session')

const Knex = require('../database/Connection')
const { IsAdmin, CreateUser, IsUser, ReturnUser, EditUserEmail,EditUserName } = require('../models/logModel')

const Model = require('../models/productsModel')


app.use(session({
    secret:'palavrasecretaparapulodeseguranĂ§adekeydebala',
   
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.get('/editUser',async(req,res)=>{
    const slug = await Model.SlugCategory()
    res.render('loguin/editLog',{
        log:{username:req.session.User.name},
        name:req.session.User.name,
        email:req.session.User.email,
        alert:{status:false},
        slug:slug
    })
})

app.post('/editUser',async(req,res)=>{
    const slug = await Model.SlugCategory()

    var oldEmail = req.session.User.email
    var oldName = req.session.User.name

    var{email,name} =  req.body
    var User = await IsUser(email)
var msg = ''

    try {

        if(email == oldEmail && name != oldName){

            var UpdateName = await EditUserName(oldEmail,name)
           msg = "Nome Atualizado "
       }else if(email != oldEmail && name == oldName){

                if(!User){
                    var UpdateEmail = await EditUserEmail(oldEmail,email)
                    msg = "Email Atualizado "
                }else{
                    msg = "Email Ja cadastrado  "
                }        
       }else{
        var UpdateName = await EditUserName(oldEmail,name)
        var UpdateEmail = await EditUserEmail(oldEmail,email)
        msg = "Cadastro Atualizado com sucesso  "
       }

    } catch (err) {
        console.log(err)
    }finally{
        req.session.User ={
            name:name,
            email:email,
            carrinho:[],
            price:0,
        }
        res.render('loguin/editLog',{
            log:{username:req.session.User.name},
            name:req.session.User.name,
            email:req.session.User.email,
            alert:{status:true,msg:msg,style:"success"},
            slug:slug
        })
    }



})

app.post('/login',async(req,res)=>{

    
    var{logEmail,logPassword} = req.body

    const slug = await Model.SlugCategory()

    var result = await IsUser(logEmail)
    var adm = await IsAdmin(logEmail)


    if(adm){
        req.session.Admin = {
            status:true
        }
        res.redirect('/admin')
    }else{

        if(result){

            var obj = await ReturnUser(logEmail)
            
            var hash =  obj[0].password
            var correct = bcryptjs.compareSync(logPassword,hash)
            
            if(correct){

                req.session.User ={
                    name: obj[0].name,
                    email:obj[0].email,
                    carrinho:[],
                }

                res.redirect('carrinho')

            }else{

              res.render('loguin/loguin',{
                alert:{status:true,msg:'Senha incorreta  ',style:'danger'},
               slug:slug
                })


            }


        }else{

            res.render('loguin/loguin',{
                alert:{status:true,msg:'Email nĂŁo encontrado',style:'danger'},
                slug:slug
                })
        }
    }

})

app.get('/destroy',(req,res)=>{
    req.session.destroy();
    res.redirect('/login')
})

app.post('/cadastro',async(req,res)=>{
    const slug = await Model.SlugCategory()

    var{name,email,password1} = req.body

    var salt = bcryptjs.genSaltSync(10);
    var hash = bcryptjs.hashSync(password1,salt);   

    

    var user = await IsUser(email)
    if(user){

        res.render('loguin/loguin',{
            alert:{status:true,msg:'Usuario Ja cadastrado',style:'danger'},
           slug:slug
            })
    }else{
        
        try {
            var result = await CreateUser(email,name,hash)

             if(result){

                 req.session.User ={
                     name:name,
                     email:email
                 }

                 res.redirect('/')

             }else{
                res.render('loguin/loguin',{
                    alert:{status:true,msg:'Usuario Ja cadastrado',style:'danger'},
                   slug:slug
                    })
             }

        } catch (err) {
            console.log(err)
        }

    }
        
    
        
})


app.get('/login',async(req,res)=>{
    const slug = await Model.SlugCategory()

    res.render('loguin/loguin',{
        alert:{status:false,style:'danger'},
        slug:slug
        })
})


module.exports = app;