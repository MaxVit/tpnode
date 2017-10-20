const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`);


module.exports = function (req,res){
    config.DB('follows')
    .join('users', 'follows.is_following', 'users.id')
    .select('follows.user_id', 'follows.is_following','users.first_name')
    .where({
        'follows.user_id': req.params.user_id,
        'follows.deleted_at': null
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

