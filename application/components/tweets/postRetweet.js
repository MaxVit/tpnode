// configuration
const env = process.env.NODE_ENV||'development'; //constante env tjrs en majuscule, variable qui ne change pas. NODE_ENV est l'environnement utilise
const config = require(`../../config/${env}`); // require un fichier config en fonction d'environnement

module.exports = function (req,res){
    config.DB('tweets').insert({
        user_id:req.user_id,
        retweeted_from: req.params.retweeted_from,
        message:req.body.message,
    })

    .then(function(rows){
        return res.status(201).json({
            statusCode:201,
            errors:"vous avez retweeté",
            data:''
        })
    })
    .catch(function(err){
        return res.status(401).json({
            statusCode:401,
            error:'errors',
            data:{}
        })
    })
}