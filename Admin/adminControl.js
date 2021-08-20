const express = require('express')
const { default: knex } = require('knex')
const session = require('express-session')

const app = express.Router()

const Model = require('../models/productsModel')

const Knex = require('../database/Connection')
const MiddlerUser = require('../Middler/MiddlerUser')
const MiddlerAdmin = require('../Middler/MiddlerAdmin')



app.use(session({
    secret:'palavrasecretaparapulodesegurançadekeydebala',
   
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.get('/admin',MiddlerAdmin ,async(req,res)=> {

  

    const result2 = await Model.SlugCategory()
    const products = await Model.ReturnProductsAll()


    res.render('admin',{
        alert:{status:false,msg:'Pé De cabra',style:'success'},
        result:result2,
        log:{username:'Root'},
        slug:result2,
        products:products

    })
    
 })




 app.post('/EditProducts',MiddlerAdmin,async(req,res)=>{


    var {name,price,description,slug,id,oldImg} = req.body

    const result2 = await Model.SlugCategory()
    const products = await Model.ReturnProductsAll()
    if (req.files) {
        const file = req.files.file
        const fileName = file.name

        var result =  await Model.FindPicName(fileName)
        console.log(result)
        if(result){
            res.render('admin',{
                alert:{status:true,msg:'Image ja cadastrada',style:'danger'},
                result:result2,
                log:{username:'Root'},
                slug:result2,
                products:products

            })
            return 
        }else{
        file.mv(`${__dirname}/../public/products/${fileName}`,async  err => { 
            
            if (err) {

                console.log(err)
                res.send('There is error')
            }else{
                var msg = ''
                var sts = false 
                try {
                    

                    if(name.length <= 0){
                        msg = 'Nome nâo pode ser indefinido'
                        sts = true
                    }
                    if(price.length <= 0){
                        msg = 'Price nâo pode ser indefinido'
                        sts = true
                    }
                    if(description.length <= 0){
                        msg = 'Description nâo pode ser indefinido'
                        sts = true
                    }
                    if(slug.length <= 0){
                        msg = 'Slug nâo pode ser indefinido'
                        sts = true
                    }
                    if(sts != true){
                        
                        await Knex.select('*').where({id:id}).update({name:name,price:parseFloat(price).toFixed(2),description:description,slug:slug,img:fileName}).table('products').then(()=>{
                            res.render('admin',{
                                alert:{status:true,msg:'Produto Atualizado com sucesso',style:'success'},
                                result:result2,
                                log:{username:'Root'},
                                slug:result2,
                                products:products

                                })
                        }).catch((err)=>{
                            console.log(err)
                        })

                    }
                }catch(err){
                    console.log(err)
                }
            }
        })
    }
}else{
    await Knex.select('*').where({id:id}).update({name:name,price:parseFloat(price).toFixed(2),description:description,slug:slug,img:oldImg}).table('products').then(()=>{
      
        res.redirect('admin')

    }).catch((err)=>{
        console.log(err)
    })
}
})


 //Save Products Post Rout
 app.post('/admin',async  (req, res) => {
    
    const result2 = await Model.SlugCategory()
    const products = await Model.ReturnProductsAll()

    
    if (req.files) {
            const file = req.files.file
            const fileName = file.name
            
           var result =  await Model.FindPicName(fileName)
        
        if(result){
            res.render('admin',{
                alert:{status:true,msg:'Image ja cadastrada',style:'danger'},
                result:result2,
                log:{username:'Root'},
                slug:result2,
                products:products


                })
        }else{
           file.mv(`${__dirname}/../public/products/${fileName}`,async  err => {
                if (err) {
                    console.log(err)
                    res.send('There is error')
                } else {
                    var msg = ''
                    var sts = false 
                    try {
                        var {name,price,description,slug} = req.body
                        if(name.length <= 0){
                            msg = 'Nome nâo pode ser indefinido'
                            sts = true
                        }
                        if(price.length <= 0){
                            msg = 'Price nâo pode ser indefinido'
                            sts = true
                        }
                        if(description.length <= 0){
                            msg = 'Description nâo pode ser indefinido'
                            sts = true
                        }
                        if(slug.length <= 0){
                            msg = 'Slug nâo pode ser indefinido'
                            sts = true
                        }
                        if(sts != true){
                            
                            await Knex.insert({name:name,price:parseFloat(price).toFixed(2),description:description,slug:slug,img:fileName}).table('products').then(()=>{
                                res.render('admin',{
                                    alert:{status:true,msg:'Product Create Success',style:'success'},
                                    result:result2,
                                    log:{username:'Root'},
                                    slug:result2,
                                    products:products

                                    })
                            })

                        }else{
                            res.render('admin',{
                                alert:{status:true,msg:msg,style:'danger'},
                                result:result2,
                                log:{username:'Root'},
                                slug:result2,
                                products:products

                            })

                            return
                        }   
                        
                    } catch (err) {
                        console.log(err)
                    }
                 
                }
            })
        }
    
    } else {
        res.render('admin',{
            alert:{status:true,msg:'Image Not Found',style:'danger'},
            result:result2,
            log:{username:'Root'},
            slug:result2,
            products:products

            })
        return
    }        
})


module.exports = app;