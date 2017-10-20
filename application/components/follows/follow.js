//follow
const env = process.env.NODE_ENV || 'development';
const config = require(`../../config/${env}`);
module.exports = function (req,res){

	config.DB('follows').insert({
		user_id:req.user_id,
		is_following:req.body.is_following
	})
	.then(function (row) {
		return res.status(201).json({
			statusCode: 201,
			message: 'vous suivez cette personne'
		})

	})
	.catch(function (err) {
		return res.status(201).json({
			statusCode:401,
			error: 'erreur'
		})
	});
}

//reeure 403 pas d'auteh 
