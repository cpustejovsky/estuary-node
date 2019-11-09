require("dotenv").config();
const Twitter = require("twitter");
const config = require("../config/twitterConfig");

module.exports = function (username) {
    const T = new Twitter(config);

    const params = {
        screen_name: username,
        count: 2,
        tweet_mode: 'extended'
    };

    T.get("/statuses/user_timeline", params, (err, data, response) => {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i])
            let tweetText = data[i].full_text;
            let english = true;
            for (let j = 0; j < tweetText.length; j++) {
                if (tweetText.charCodeAt(j) >= 945 && tweetText.charCodeAt(j) <= 1023) {
                    english = false;
                }
                ;
            }
            if (english) {
                console.log(data[i].full_text);
                // Get the tweet Id from the returned data
                let id = {id: data[i].id_str};
                let retweetId = data[i].id_str;
                // Try to Favorite the selected Tweet
                T.post('favorites/create', id, function (err, response) {
                    // If the favorite fails, log the error message
                    if (err) {
                        console.log(err[0].message);
                    }
                    // If the favorite is successful, log the url of the tweet
                    else {
                        let username = response.user.screen_name;
                        let tweetId = response.id_str;
                        console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
                        T.post(`statuses/retweet/${retweetId}`, function (err, response) {
                            if (err) {
                                console.log(err);
                            } else {
                                let username = response.user.screen_name;
                                let tweetId = response.id_str;
                                console.log('Rewtweeted: ', `https://twitter.com/${username}/status/${tweetId}`)
                            }
                        })
                    }
                });
            }
        }
    });
};
