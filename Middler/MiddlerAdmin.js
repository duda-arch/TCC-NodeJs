function authentic(req,res,next){
    
    try {
        if(req.session.Admin != undefined){
            next();
        }else{
            res.redirect('/')
        }
    } catch (error) {
        res.redirect('/')

    }
}

module.exports = authentic;