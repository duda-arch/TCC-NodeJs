const express = require('express');
const product = express.Router();
const bodyParser = require('body-parser')


const Knex = require('../database/Connection')
const Model = require('../models/productsModel')

product.use(bodyParser.urlencoded({extended:true}));
product.use(bodyParser.json());

const session = require('express-session')

//Select Product for ID
product.get('/product/:pd',async(req,res)=>{
    var slug = req.params.pd

    if(req.session.User != undefined){
        var result = await Model.FindSlug(slug)
        if(result){
            await Knex.select('*').where({slug:slug}).table('products').orderBy('id', 'desc').then((date)=>{
                res.render('products/products',{
                    obj:date,
                    log:{username:req.session.User.name}

                    
                })
            })
        }else{
    
            res.render('page-404',{
                titleErr:"Page 404",
                takeMe :"Return Home",
                takeLink:"/",
            })
        }
    }else{
        var result = await Model.FindSlug(slug)
        if(result){
            await Knex.select('*').where({slug:slug}).table('products').orderBy('id', 'desc').then((date)=>{
                res.render('products/products',{
                    obj:date,
                    
                })
            })
        }else{
    
            res.render('page-404',{
                titleErr:"Page 404",
                takeMe :"Return Home",
                takeLink:"/",
            })
        }
    }

  
})


product.post('/create',async(req,res)=>{
    const slg = req.body.slg

    const result2 = []

    var result = await Model.IfNotSlugInCategory(slg)

    if(result){
    
        try {


          await Knex.insert({slug:slg}).table('productsCategory').then(async()=>{
            const one = await Model.SlugCategory()
            one.forEach(element => {
               return result2.push(element.slug)
            });

            res.render('admin',{
                alert:{status:true,msg:'Slug Create Success',style:'success'},
                result:result2
                })
                return
        }).catch(()=>{
            res.render('admin',{
                alert:{status:true,msg:'Slug error',style:'danger'},
                result:result2
                })
                return

        })
        
         

        } catch (err) {
            console.log(err)
            res.render('admin',{
                alert:{status:true,msg:'Slug error',style:'danger'},
                result:result2
                })
                return

        }

    }else{

        res.render('admin',{
            alert:{status:true,msg:'Slug ja registrado',style:'danger'},
            result:result2
            })

            return

    }

})



module.exports = product;