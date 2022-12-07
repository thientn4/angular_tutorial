let my_tweets=undefined

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	//TODO: Filter to just the written tweets
	if(my_tweets===undefined)my_tweets = runkeeper_tweets
	let tweetTable = document.getElementById("tweetTable")
	tweetTable.replaceChildren();
	if(document.getElementById("textFilter").value==="")return;
	let DOMresult=""
	for(num in runkeeper_tweets){
		let row=new Tweet(runkeeper_tweets[num].text,runkeeper_tweets[num].time)
		DOMresult+=row.getHTMLTableRow(parseInt(num)+1)
	}
	tweetTable.innerHTML=DOMresult
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	let textFilterInput = document.getElementById("textFilter")
	document.getElementById("searchText").textContent=""
	document.getElementById("searchCount").textContent=0
	textFilterInput.addEventListener('input', () => {
		let filtered_tweets = []
		if(textFilterInput.value!=="")
			filtered_tweets=my_tweets.filter((tweet)=>{return tweet.text.includes(textFilterInput.value);})
		parseTweets(filtered_tweets)
		document.getElementById("searchText").textContent=textFilterInput.value
		document.getElementById("searchCount").textContent=filtered_tweets.length
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});