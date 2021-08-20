const express = require('express');

const bodyParser = require('body-parser')
const rout = express.Router();

const knex = require('../database/Connection')
const Model = require('../models/productsModel')
const authenUser = require('../Middler/MiddlerUser')

rout.use(bodyParser.urlencoded({extended:false}));
rout.use(bodyParser.json());
const session = require('express-session');



rout.use(session({
    secret:'palavrasecretaparapulodesegurançadekeydebala',
   
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


rout.get('/carrinho', async (req,res)=>{
    const slug = await Model.SlugCategory()

    if(req.session.User != undefined){

        res.render('products/carrinho',{
            obj:req.session.User.carrinho,
            total:req.session.User.price,
            log:{username:req.session.User.name},
            slug:slug
        })   
    }else{  
        res.render('products/carrinho',{
            obj:[],
            slug:slug
        })   
    }
})


rout.get('/session', async (req,res)=>{
    req.session.User = {
        name:'jef',
        email:'fredotre',
        carrinho:[],
        price:0,
    }

    res.redirect('/product/creatina')    
})

rout.get('/sessionAdm', async (req,res)=>{
    req.session.Admin = {
        status:true
    }

    res.redirect('/admin')    
})

rout.post('/addCard',async(req,res)=>{
    var {name,description,price,slug,img} = req.body
    const slug32 = await Model.SlugCategory()

   
    if(req.session.User != undefined){
        
        req.session.User.carrinho.push({name:name,description:description,price:price,description,slug:slug,img:img})

        var total = []
        req.session.User.carrinho.forEach((element,index) => {
                
                     total.push(parseFloat(element.price))
            });
            var soma = 0;
        if(total.length > 1 ){

                        for(var i = 0; i < total.length; i++) {
                            soma += total[i];
                        }
                        req.session.User.price  = parseFloat(soma).toFixed(2);

        }else{
            req.session.User.price  = price
        }
        

        res.redirect(`/product/${slug}`) 
    }else{  
        res.render('page-404',{
            titleErr:"Precisa estar logado ",
            takeMe :"Fazer login",
            takeLink:"/login",
            slug:slug32
        })
    }
    
})

rout.post('/delete',(req,res)=>{

    var id = req.body.id
    var carrinho = req.session.User.carrinho 
    var productLixo = req.session.User.carrinho[id]
    
    req.session.User.price  =  parseFloat(req.session.User.price - productLixo.price).toFixed(2);

  

    carrinho.pop(productLixo)

    res.redirect('/carrinho')
})

module.exports = rout;