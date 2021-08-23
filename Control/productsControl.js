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

    const slug32 = await Model.SlugCategory()

    if(req.session.User != undefined){
        var result = await Model.FindSlug(slug)
        if(result){
            await Knex.select('*').where({slug:slug}).table('products').orderBy('id', 'desc').then((date)=>{
                res.render('products/products',{
                    obj:date,
                    log:{username:req.session.User.name},
                    slug:slug32

                    
                })
            })
        }else{
    
            res.render('page-404',{
                titleErr:"Page 404",
                takeMe :"Return Home",
                takeLink:"/",
                log:{username:req.session.User.name},
                slug:slug32
                

            })
        }
    }else{
        var result = await Model.FindSlug(slug)
        if(result){
            await Knex.select('*').where({slug:slug}).table('products').orderBy('id', 'desc').then((date)=>{
                res.render('products/products',{
                    obj:date,
                    slug:slug32
                })
            })
        }else{
            if(req.session.User != undefined){

                res.render('page-404',{     
                    titleErr:"Page 404",
                    takeMe :"Return Home",
                    log:{username:req.session.User.name},
                    takeLink:"/",
                    slug:slug32
                })
            }else{
                res.render('page-404',{
                    titleErr:"Page 404",
                    takeMe :"Return Home",
                    takeLink:"/",
                    slug:slug32
                })
            }
         
        }
    }

})
product.post('/EditProductsID',async (req,res)=>{
    

    const slug = req.body.slug
    
    const result2 = await Model.SlugCategory()
    const products = await Model.ReturnProductForSlug(slug)


    res.render('EditProducts',{
        alert:{status:false,msg:'Pé De cabra',style:'success'},
        result:result2,
        log:{username:'Root'},
        slug:result2,
        products:products

    })
})

product.post('/create',async(req,res)=>{
    const slg = req.body.slg

    var result = await Model.IfNotSlugInCategory(slg)
    const result2 = await Model.SlugCategory()
    const products = await Model.ReturnProductsAll()
    if(result){
    
        try {


          await Knex.insert({slug:slg}).table('productsCategory').then(async()=>{

        

            res.render('admin',{
                alert:{status:true,msg:'Slug Create Success',style:'success'},
                result:result2,
                slug:result2,
                products:products
                })
                return
        }).catch(()=>{

            res.render('admin',{
                alert:{status:true,msg:'Slug error',style:'danger'},
                result:result2,
                slug:result2,
                products:products
                })
                return

        })
        
         

        } catch (err) {
            console.log(err)
            res.render('admin',{
                alert:{status:true,msg:'Slug error',style:'danger'},
                result:result2,
                slug :result2,
                products:products
                })
                return

        }

    }else{

        res.render('admin',{
            alert:{status:true,msg:'Slug ja registrado',style:'danger'},
            result:result2,
            slug :result2,
            products:products
            })

            return

    }

})



module.exports = product;