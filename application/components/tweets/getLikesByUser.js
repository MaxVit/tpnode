// configuration
const env = process.env.NODE_ENV||'development'; //constante env tjrs en majuscule, variable qui ne change pas. NODE_ENV est l'environnement utilise
const config = require(`../../config/${env}`); // require un fichier config en fonction d'environnement

module.exports = function (req,res){
   config.DB('likes')
   .join('tweets', 'likes.tweet_id', 'tweets.id')
   .join('users', 'likes.user_id', 'users.id')
   .select(
       'likes.user_id',
       'likes.id',
       'likes.tweet_id',
       'users.first_name', 
       'users.last_name',
        'tweets.message'
   )
   .where({
       'likes.user_id': req.params.user_id,
       'likes.deleted_at': null
   })
    .then(function(rows){
        return res.status(201).json({
            statusCode:201,
            errors:[],
            message: 'Voici tout vos tweets'
            
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
