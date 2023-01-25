const {TwitterApi} = require("twitter-api-v2");
const rwClient = require('./twitterClient.js');

// Instantiating the variables needed for the twitter request.
const tweeterID = "1610392282926321665";

let getTweetInfo = async () => {
	return new Promise(async (resolve, reject) => {
		try{
            let tweetInfo = [];
			let recentTweetResponse = await rwClient.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${tweeterID}&count=1&exclude_replies=true&include_rts=false`);
			let tweetTime = new Date(recentTweetResponse[0].created_at);
            if(Date.now() - tweetTime.getTime() >= 900000){
                console.log('Tweet is older than 15 minutes.');
                reject("Tweet is older than 15 minutes.");
            }
            else{
                tweetInfo['username'] = recentTweetResponse[0].user.screen_name;
                tweetInfo['name'] = recentTweetResponse[0].user.name;
                tweetInfo['imageURL'] = recentTweetResponse[0].user.profile_image_url;
                tweetInfo['text'] = recentTweetResponse[0].text;
                tweetInfo['timestamp'] = recentTweetResponse[0].created_at;
                resolve(tweetInfo);
            }
		}
		catch(err){
			console.log(err);
			reject(err);
		}
	})};

module.exports = {getTweetInfo};