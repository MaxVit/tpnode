// configuration
const env = process.env.NODE_ENV||'development'; //constante env tjrs en majuscule, variable qui ne change pas. NODE_ENV est l'environnement utilise
const config = require(`../config/${env}`); // require un fichier config en fonction d'environnement
const db = config.DB;


module.exports = function(req, res, next) {
	if(!req.headers.x_api_key) {
		return res.json({
			errors: ['vous n etes pas connecté'],
		});
	}
	db('tokens')
		.where({
			api_key: req.headers.x_api_key,
			api_token: req.headers.x_api_token,
			is_enabled: true, 
			deleted_at: null,
		})
		.select('user_id')
		.then(function(rows) {
			req.user_id = rows[0].user_id;
			next();
		})
		.catch((err) => {
			return res.json({
				err,
				message: 'votre api key nexiste pas',
			})
		})
};
