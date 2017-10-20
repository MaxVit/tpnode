const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`);


module.exports = function(req, res) {

        config.DB.select('username', 'email', 'first_name', 'last_name')
        .from('users')
        .where('id', req.params.id)
        .then(function (rows) {
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


