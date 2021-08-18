
const knex = require('../database/Connection')
const bcryptjs =  require('bcryptjs')


class Log{

    async IsAdmin(email,password){
        //Return True if  find email 
            try {

                var result = await knex.select('*').where({email:email}).table('admin')

                
                if(result.length > 0){
                    if(result.password == password){
                        return true 
                    }else{
                    return false
                    }
                }else{
                    return false 
                }
            } catch (err) {
                console.log(err)
                return 

            }
    }
    async ReturnUser(email){

        try {
            var result = await knex.select('*').where({email:email}).table('register')

            return result
        } catch (err) {
            console.log(err)
            return false
        }

    }

    async CreateUser(email,name,password){

        try {
            await knex.insert({email:email,name:name,password:password}).table('register')
                return true
        }catch(err) {
            return false
        }
    }

    async EditUserEmail(oldEmail,email){
        try {
            await knex.select('*').where({email:oldEmail}).update({email:email}).table('register')
            return true 
        } catch (err) {
            console.log(err)
            return false
        }
    }
    async EditUserName(oldEmail,name){
        try {
            await knex.select('*').where({email:oldEmail}).update({name:name}).table('register')
            return true 
        } catch (err) {
            console.log(err)
            return false
        }
    }


    async IsUser(email){
        //Return True if  find email 
        try {

            var result = await knex.select('*').where({email:email}).table('register')

            if(result.length > 0){
                return true
            }else{
                return false 
            }
        } catch (err) {
            return false
        }
    }
}

module.exports = new Log();