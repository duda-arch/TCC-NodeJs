function authentic(req,res,next){
    
    try {
        if(req.session.User != undefined){
            next();
        }else{
            res.redirect('/')
        }
    } catch (error) {
        res.redirect('/')

    }
}

module.exports = authentic;