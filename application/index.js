//déclarations des constantes

const express = require('express');//on charge express
const parser = require('body-parser');//puis body parser
const _ = require('lodash');//puis lodash

//----------------------------------Les services-----------------------------------------
const services={

  users:{
  	getInfosByUser: require('./components/users/getInfosByUser'),
    getListeUsers:require('./components/users/getListeUsers'),
    postUsers:require('./components/users/postUsers'),
    getInfosByUser:require('./components/users/getInfosByUser'),
    deleteUser: require('./components/users/deleteUser'),
    updateUser: require('./components/users/updateUser'),
  },

  tweets:{
    getTweetsByUser:require('./components/tweets/getTweetsByUser'),
    getLikesByUser:require('./components/tweets/getLikesByUser'),
    unlikeTweetByUser: require('./components/tweets/unlikeTweetByUser'),
    getCommentsByTweet:require('./components/tweets/getCommentsByTweet'),
    postCommentsByTweet:require('./components/tweets/postCommentsByTweet'),
    postTweetsByUser:require('./components/tweets/postTweetsByUser'),
    postLikesByUser:require('./components/tweets/postLikesByUser'),
    deleteTweet:require('./components/tweets/deleteTweet'),
    postRetrweet: require('./components/tweets/postRetweet'),
    getListeTweets:require('./components/tweets/getListeTweets'),
    getCommentsByTweet:require('./components/tweets/getCommentsByTweet'),
    getMyTweets:require('./components/tweets/getMyTweets'),
    getLastTweets:require('./components/tweets/getLastTweets')

  },

  follows: {
  	getUsersFollowingUser: require('./components/follows/getUsersFollowingUser'),
	getUsersFollowersUser: require('./components/follows/getUsersFollowerUser'),
	follow: require('./components/follows/follow'),
	unfollow: require('./components/follows/unfollow'),
  },

  tokens:{
  	getUserTokens: require('./components/tokens/getUserTokens'),
  	updateUserTokens: require('./components/tokens/updateUserTokens')
  }

}

// variables d'environement
const env = process.env.NODE_ENV || 'development';
const config = require(`./config/${env}`);
const app = express();
const authentification = require('./middleweare/auth.js');

app.use(parser.json());

//Ce que je peux faire en tant que visiteurs:

// GET LISTE USERS: renvoyer la liste de tous les users---------------------------------------------------------
app.get('/users', services.users.getListeUsers);
//------------------------------------------------------------------------------------------------------------------

// GET USER INFOS: renvoyer les informations d'un utilisateur---------------------------------------------------------
app.get('/users/:user_id', services.users.getInfosByUser);
//------------------------------------------------------------------------------------------------------------------

// GET USER TWEETS: renvoyer les tweets d'un utilisateur---------------------------------------------------------
app.get('/users/:user_id/tweets', services.tweets.getTweetsByUser);
//------------------------------------------------------------------------------------------------------------------

// GET USER LIKES: renvoyer la liste des tweets likés par l'utilisateur---------------------------------------------------------
app.get('/users/:user_id/likes', services.tweets.getLikesByUser);
//------------------------------------------------------------------------------------------------------------------

// GET USER FOLLOWERS: renvoyer la liste des utilisateurs que suivent l'utilisateur en question---------------------------------------------------------
app.get('/users/:user_id/followers', services.follows.getUsersFollowersUser);
//------------------------------------------------------------------------------------------------------------------

// GET USER FOLLOWINGS: renvoyer la liste des utilisateurs suivis par l'utilisateur en question---------------------------------------------------------
app.get('/users/:user_id/followings', services.follows.getUsersFollowingUser);
//------------------------------------------------------------------------------------------------------------------

// POST USERS: création d'un nouveau utilisateur----------------------------------------------------------------
app.post('/users', services.users.postUsers);
//------------------------------------------------------------------------------------------------------------------

// PAGINATIONS---------------------------------------------------------------------------------------------------
app.get('/lasttweets', services.tweets.getLastTweets);
//------------------------------------------------------------------------------------------------------------------


//En tant que l'utilisateur authentifié, je peux:------------------------------------------------------------

// GET USER TOKENS: voir mes api key et api token--------------------------------------------------------
app.get('/myaccount/tokens', authentification, services.tokens.getUserTokens);
//------------------------------------------------------------------------------------------------------------------

// Delete USER TOKENS: supprimer mon api token--------------------------------------------------------
app.put('/myaccount/tokens', authentification, services.tokens.updateUserTokens);
//------------------------------------------------------------------------------------------------------------------

// GET USER TWEETS: voir tous mes tweets---------------------------------------------------------
app.get('/myaccount/tweets',authentification, services.tweets.getMyTweets);
//------------------------------------------------------------------------------------------------------------------


// POST USER TWEETS: envoyer un tweet---------------------------------------------------------
app.post('/myaccount/tweets', authentification, services.tweets.postTweetsByUser);
//------------------------------------------------------------------------------------------------------------------

// POST TWEET COMMENTS: poster un commentaire sous un tweet---------------------------------------------------------
app.post('/myaccount/tweets/:tweet_id/comments', authentification,  services.tweets.postCommentsByTweet);
//------------------------------------------------------------------------------------------------------------------


// GET TWEET COMMENTS: voir les commentaires d'un tweet---------------------------------------------------------
app.get('/myaccount/tweets/:tweet_id/comments',authentification, services.tweets.getCommentsByTweet);
//------------------------------------------------------------------------------------------------------------------

// DELETE TWEET: supprimer un tweet---------------------------------------------------------
app.put('myaccount/tweets/:tweet_id', authentification, services.tweets.deleteTweet);
//------------------------------------------------------------------------------------------------------------------

// UPDATE USER: actualiser mes informations---------------------------------------------------------
app.put('/myaccount/update', authentification, services.users.updateUser);
//------------------------------------------------------------------------------------------------------------------


// DELETE USER: supprimer l'utilisateur---------------------------------------------------------
app.put('/myaccount/delete', authentification, services.users.deleteUser);
//------------------------------------------------------------------------------------------------------------------

// POST USER LIKES: like un tweet---------------------------------------------------------
app.post('/myaccount/likes', authentification, services.tweets.postLikesByUser);
//------------------------------------------------------------------------------------------------------------------

// UNLIKE TWEET: unlike un tweet---------------------------------------------------------
app.put('/myaccount/unlike', authentification, services.tweets.unlikeTweetByUser);
//------------------------------------------------------------------------------------------------------------------

// FOLLOW USER: suivre un utilisateur---------------------------------------------------------
app.post('/myaccount/follow', authentification, services.follows.follow);
//------------------------------------------------------------------------------------------------------------------

// UNFOLLOW: ne plus suivre un utilisateur---------------------------------------------------------
app.put('/myaccount/:user_id/unfollow', authentification, services.follows.unfollow);
//------------------------------------------------------------------------------------------------------------------

// RETWEET: retweeter---------------------------------------------------------
app.post('/myaccount/:retweeted_from/retweet', authentification, services.tweets.postRetrweet);
//------------------------------------------------------------------------------------------------------------------


//-----------------------------------------FLS D'ACTUALITEE-----------------------------------------
app.get('/tweets', services.tweets.getListeTweets);




app.post('tweets', authentification,  function (req, res) {
	return res.json({
			errors: ['erreur']
		});
})

app.listen(config.PORT, function () {
  console.log(`Listening on port ${config.PORT}`);//callback
});




