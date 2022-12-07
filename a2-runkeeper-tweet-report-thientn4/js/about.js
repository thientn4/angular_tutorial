function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	let earliest=undefined
	let latest=undefined
	tweet_array = runkeeper_tweets.map(function(tweet) {
		let cur_tweet=new Tweet(tweet.text, tweet.created_at);
		earliest=earliest===undefined?cur_tweet.time:Math.min(earliest,cur_tweet.time);
		latest=latest===undefined?cur_tweet.time:Math.max(latest,cur_tweet.time);
		return cur_tweet;
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, 
	//TODO: your task is to update the text of the other tags in the HTML file!
	document.getElementById('firstDate').innerText = new Date(earliest).toLocaleDateString();	
	document.getElementById('lastDate').innerText = new Date(latest).toLocaleDateString();	
	document.getElementById('numberTweets').innerText = tweet_array.length;	
	filtered_tweets=tweet_array.filter((tweet)=>(tweet.source==="completed_event"))
	document.getElementsByClassName('completedEvents')[0].innerText = filtered_tweets.length;
	document.getElementsByClassName('completedEvents')[1].innerText = filtered_tweets.length;
	document.getElementsByClassName('completedEventsPct')[0].innerText = (filtered_tweets.length/tweet_array.length*100).toFixed(2) + "%";	
	filtered_written_tweets=filtered_tweets.filter((tweet)=>(tweet.written))
	document.getElementsByClassName('written')[0].innerText = filtered_written_tweets.length;
	document.getElementsByClassName('writtenPct')[0].innerText = (filtered_written_tweets.length/filtered_tweets.length*100).toFixed(2) + "%";
	
	filtered_tweets=tweet_array.filter((tweet)=>(tweet.source==="live_event"))
	document.getElementsByClassName('liveEvents')[0].innerText = filtered_tweets.length;
	document.getElementsByClassName('liveEventsPct')[0].innerText = (filtered_tweets.length/tweet_array.length*100).toFixed(2) + "%";	
	
	filtered_tweets=tweet_array.filter((tweet)=>(tweet.source==="achievement"))
	document.getElementsByClassName('achievements')[0].innerText = filtered_tweets.length;
	document.getElementsByClassName('achievementsPct')[0].innerText = (filtered_tweets.length/tweet_array.length*100).toFixed(2) + "%";	
	
	filtered_tweets=tweet_array.filter((tweet)=>(tweet.source==="miscellaneous"))
	document.getElementsByClassName('miscellaneous')[0].innerText = filtered_tweets.length;
	document.getElementsByClassName('miscellaneousPct')[0].innerText = (filtered_tweets.length/tweet_array.length*100).toFixed(2) + "%";	

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});