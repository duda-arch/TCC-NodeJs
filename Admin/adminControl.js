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

  

    const one = await Model.SlugCategory()
    const result2 = []
    one.forEach(element => {
       return result2.push(element.slug)
    });

    res.render('admin',{
        alert:{status:false,msg:'Pé De cabra',style:'success'},
        result:result2,
        log:{username:'Root'}

    })
 
 })

 //Save Products Post Rout
 app.post('/admin',async  (req, res) => {
    
    const one = await Model.SlugCategory()
    const result2 = []
    one.forEach(element => {
       return result2.push(element.slug)
    });
    
    if (req.files) {
            const file = req.files.file
            const fileName = file.name
            
           var result =  await Model.FindPicName(fileName)
        
        if(result){
            res.render('admin',{
                alert:{status:true,msg:'Image ja cadastrada',style:'danger'},
                result:result2,
                log:{username:'Root'}

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
                                    log:{username:'Root'}
                                    })
                            })

                        }else{
                            res.render('admin',{
                                alert:{status:true,msg:msg,style:'danger'},
                                result:result2,
                                log:{username:'Root'}
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
            log:{username:'Root'}
            })
        return
    }        
})


module.exports = app;