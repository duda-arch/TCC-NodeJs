
const knex = require('../database/Connection')

class Product{

    async FindProducts(slug){

        try {
            const result =   await knex.select('*').where({slug:slug}).table('products').orderBy('id', 'asc')

           if(result.length > 0){
               return result
           }else{
               return false
           }
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async SlugCategory(){

       try {
        var result = await knex.select('*').table('productsCategory')
            return result
       } catch (err) {
           console.log(err)
           return []
       }

    }


    async IfNotSlugInCategory(slug){
        //if not Slug in database  registry return True or False 
     const result = await this.FindSlug(slug) //-> Return true

     const category  = await knex.select('*').where({slug:slug}).table('productsCategory')//-> Return Array or 0

        
        if(result){

            return false 

        }else{

            if(category.length <= 0){

                return true
            }else{
                return  false
            }
        }

    }


    async FindSlug(slug){
        
        try {
            const result =  await  knex.select('*').where({slug:slug}).table('products')

           if(result.length > 0){
               return true
           }else{
               return false
           }
        } catch (err) {
            console.log(err)
            return false
        }
    }
    async FindPicName(pic){
        
        try {
            const result =  await  knex.select('*').where({img:pic}).table('products')

           if(result.length > 0){
               return true
           }else{
               return false
           }
        } catch (err) {
            console.log(err)
            return false
        }
    }
}

module.exports = new Product();