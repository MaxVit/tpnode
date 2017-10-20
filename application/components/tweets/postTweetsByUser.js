// configuration
const env = process.env.NODE_ENV||'development'; //constante env tjrs en majuscule, variable qui ne change pas. NODE_ENV est l'environnement utilise
const config = require(`../../config/${env}`); // require un fichier config en fonction d'environnement

module.exports = function (req,res){
    config.DB('tweets').insert({
        user_id: req.user_id,
        message: req.body.message
    })
    .then(function(rows){
        return res.status(201).json({
            statusCode:201
        })
    })
    .catch(function(err){
        return res.status(404).json({
            statusCode:404,
            error:'errors',
            data:{}
        })
    })
}