// configuration
const env = process.env.NODE_ENV||'development'; //constante env tjrs en majuscule, variable qui ne change pas. NODE_ENV est l'environnement utilise
const config = require(`../../config/${env}`); // require un fichier config en fonction d'environnement

module.exports = function (req,res){
    config.DB('tweets').limit(5).offset(2)
    .join('users', 'tweets.user_id', 'users.id')
    .select(
        'tweets.user_id',
       'tweets.id', 
       'tweets.message', 
       'users.first_name', 
       'users.last_name'
    ) 
    .where({
       'tweets.deleted_at': null
    })
    .then(function(rows){
        console.log(rows)
        return res.json({
            data:rows
        })
    })
    .catch(function(err){
        console.log(err)
        return res.json({
            error:'erreur',
            data:{}
        })
    })
}