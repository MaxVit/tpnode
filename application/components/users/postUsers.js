// configuration
const env = process.env.NODE_ENV||'development'; //constante env tjrs en majuscule, variable qui ne change pas. NODE_ENV est l'environnement utilise
const config = require(`../../config/${env}`); // require un fichier config en fonction d'environnement
const hat = require('hat');

module.exports = function (req,res){
  config.DB('users').insert({ // connection à la db et utiliser la tableau users, insert dans user username email...
    username:req.body.username,
    email:req.body.email,
    first_name:req.body.first_name,
    last_name:req.body.last_name
  })
  	.returning('id')
    .then(function(row){ // promesse: then tous va bien. row= ligne qui a été inserée/catch erreur err=erreur
        const api_key = hat();
        const api_token = hat();
        config.DB('tokens')
        	.insert({ // connection à la db et utiliser la tableau users, insert dans user username email...
			    api_key,
			    api_token,
			    user_id: row[0],
			})
		.then((rows) => {
		    return res.status(201).json({
		    	access: {
		        	apikey: api_key,
		        	apiToken: api_token,
		        },
		        statusCode: 201,
            data:'utilisateur crée'
		    })
		})
    })
    .catch(function(err){
      return res.status(404).json({
        statusCode:404,
        error:'erreur',
        data:{}
      })
    })
}