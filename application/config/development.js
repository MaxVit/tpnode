module.exports =  {
	PORT: 8080,
	DB: require('knex') ({
		client: 'pg',
		connection: 'postgres://whheovqpgvgxul:741cfa8eb3dab75cc0ffb937e281eec88f512e42bf637faea682ccf0d65059c1@ec2-54-75-228-125.eu-west-1.compute.amazonaws.com:5432/d75f5hjccp3e5l?ssl=true'
	})
};

