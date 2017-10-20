// configuration
const env = process.env.NODE_ENV||'development'; //constante env tjrs en majuscule, variable qui ne change pas. NODE_ENV est l'environnement utilise
const config = require(`../../config/${env}`); // require un fichier config en fonction d'environnement

module.exports = function (req,res){
   config.DB('tweets')
   .join('users', 'tweets.user_id', 'users.id')
   .select(
       'tweets.user_id',
       'tweets.id', 
       'tweets.message', 
       'users.first_name', 
       'users.last_name'
    )
   .where({
       'tweets.user_id': req.params.user_id,
       'tweets.deleted_at': null
   })
    .then(function(rows){
        return res.status(201).json({
            statusCode:201,
            errors:[],
            data: rows
            
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
