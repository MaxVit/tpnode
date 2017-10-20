// configuration
const env = process.env.NODE_ENV||'development'; //constante env tjrs en majuscule, variable qui ne change pas. NODE_ENV est l'environnement utilise
const config = require(`../../config/${env}`); // require un fichier config en fonction d'environnement
const db = config.DB;

module.exports = function (req,res){
    config.DB('likes').update(
        "deleted_at", db.fn.now()
    )
    .where({
        user_id:req.user_id,
        tweet_id:req.body.tweet_id,
    })
    .then(function(rows){
        return res.status(201).json({
            statusCode:201,
            errors:erreur,
            data:'vous n aimez plus ce tweet'
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