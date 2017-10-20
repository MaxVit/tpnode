// configuration
const env = process.env.NODE_ENV||'development'; //constante env tjrs en majuscule, variable qui ne change pas. NODE_ENV est l'environnement utilise
const config = require(`../../config/${env}`); // require un fichier config en fonction d'environnement
const db = config.DB;

module.exports = function (req,res){
    config.DB('follows').update(
        "deleted_at", db.fn.now()
    )
    .where({
        user_id:req.user_id,
        is_following: req.params.user_id,
    })
    .then(function(rows){
        return res.status(201).json({
            statusCode:201,
            errors:[],
            data: 'vous ne suivez plus cette personne'
            
        });
    })
    .catch(function(err){
        return res.status(401).json({
            statusCode:401,
            error: 'error',
            data:{}
        });
    });
}
