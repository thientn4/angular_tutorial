function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	//console.log(tweet_array.filter((tweet)=>(tweet.distance>100)))

	frequencies=new Map();
	max_distances=new Map();
	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	tweet_array = tweet_array.map(function(tweet) {
		if(!frequencies.get(tweet.activityType)){
			frequencies.set(tweet.activityType,1)
			max_distances.set(tweet.activityType,tweet.distance)
		}
		else{
			frequencies.set(tweet.activityType,frequencies.get(tweet.activityType)+1)
			max_distances.set(tweet.activityType,Math.max(tweet.distance,max_distances.get(tweet.activityType)))
		}
		return {
			"time":tweet.time,
			"distance":tweet.distance,
			"activityType":tweet.activityType,
		};
	});

	let keys=Array.from(frequencies.keys())
	let frequency_array=[]
	for(i in keys){
		frequency_array.push({
			"activityType":keys[i],
			"frequency":frequencies.get(keys[i])
		})
	}
	activity_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"data": {
			"values": frequency_array
		},
		"mark": "bar",
		"encoding": {
			"x": {"field": "activityType", "type": "nominal"},
			"y": {"field": "frequency", "type": "quantitative"}
		}
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	activity_types = (Array.from(frequencies.keys()).filter((key)=>(key!='unknown')))
	document.getElementById("numberActivities").textContent=activity_types.length
	activity_types=activity_types.sort((t1,t2)=>(frequencies.get(t1)>frequencies.get(t2)?-1:1))
	activity_types=activity_types.slice(0,3)
	document.getElementById("firstMost").textContent=activity_types.at(0)
	document.getElementById("secondMost").textContent=activity_types.at(1)
	document.getElementById("thirdMost").textContent=activity_types.at(2)
	activity_types=activity_types.sort((t1,t2)=>(max_distances.get(t1)>max_distances.get(t2)?-1:1))
	document.getElementById("longestActivityType").textContent=activity_types.at(0)
	document.getElementById("shortestActivityType").textContent=activity_types.at(2)
	date_frequencies=new Map();
	for(num in tweet_array){
		if(tweet_array[num].activityType===activity_types.at(0)){
			if(!date_frequencies.get(tweet_array[num].time.getDay())){
				date_frequencies.set(tweet_array[num].time.getDay(),1)
			}
			else{
				date_frequencies.set(tweet_array[num].time.getDay(),date_frequencies.get(tweet_array[num].time.getDay())+1)
			}
		}
	}
	document.getElementById("weekdayOrWeekendLonger").textContent=
	['weekend', 'weekday', 'weekday', 'weekday', 'weekday', 'weekday', 'weekend']
	[(Array.from(date_frequencies.keys()).sort((t1,t2)=>(date_frequencies.get(t1)>date_frequencies.get(t2)?-1:1))[0])]
	
	tweet_array = tweet_array.filter((tweet)=>(activity_types.includes(tweet.activityType)))

	
	distance_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"data": {
			"values": tweet_array
		},
		//TODO: Add mark and encoding
	  	"mark": "point",
		"encoding": {
			"x": {
				"timeUnit": "day",
				"field": "time",
				"type": "ordinal",
				"sort" : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
			},
			"y": {
				"field": "distance",
				"type": "quantitative"
			},
			"color": {"field": "activityType", "type": "nominal"},
		}
	};

	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	distance_vis_spec_agg = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"data": {
			"values": tweet_array
		},
		//TODO: Add mark and encoding
		  "mark": "point",
		"encoding": {
			"x": {
				"timeUnit": "day",
				"field": "time",
				"type": "ordinal",
				"sort" : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
			},
			"y": {
				"aggregate": "mean",
				"field": "distance",
				"type": "quantitative"
			},
			"color": {"field": "activityType", "type": "nominal"},
		}
	};
	vegaEmbed('#distanceVisAggregated', distance_vis_spec_agg, {actions:false});
	document.getElementById("distanceVisAggregated").style.display = "none"
	
	let agg_btn=document.getElementById("aggregate")
	agg_btn.addEventListener('click', () => {
		document.getElementById(agg_btn.textContent==="Show means"?"distanceVis":"distanceVisAggregated").style.display = "none"
		document.getElementById(agg_btn.textContent!=="Show means"?"distanceVis":"distanceVisAggregated").style.display = "initial"
		agg_btn.textContent=agg_btn.textContent==="Show means"?"Show all activities":"Show means";
	})
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});