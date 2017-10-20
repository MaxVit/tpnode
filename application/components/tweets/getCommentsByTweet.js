// configuration
const env = process.env.NODE_ENV||'development'; //constante env tjrs en majuscule, variable qui ne change pas. NODE_ENV est l'environnement utilise
const config = require(`../../config/${env}`); // require un fichier config en fonction d'environnement
const db = config.DB;

module.exports = function (req,res){
   config.DB('comments')
   .join('tweets', 'comments.tweet_id','tweets.id')
   .join('users', 'comments.user_id', 'users.id')
   .select(
       'comments.user_id',
       'users.username',
       'comments.tweet_id',
       'tweets.message',
       'tweets.id',
       'comments.id',
       'comments.message'
   )
   .where({
       'comments.tweet_id': req.params.tweet_id,
       'comments.deleted_at': null
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
