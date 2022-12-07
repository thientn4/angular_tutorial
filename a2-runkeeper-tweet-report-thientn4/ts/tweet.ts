//tsc --p tsconfig.json 
class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        var checker=this.text.toLowerCase()
        if(checker.includes("completed") || checker.includes("just posted"))return "completed_event"
        if(checker.includes("achieve"))return "achievement"
        if(checker.includes("right now"))return "live_event"
        return "miscellaneous"
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        return this.text.includes("-");
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        //between "-" and "http"
        return this.text.substring(this.text.indexOf("-")+2,this.text.indexOf("http")-1);
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        var checker=this.text.toLowerCase( )
        if(checker.includes("bike"))return "bike"
        if(checker.includes("swim"))return "swim"
        if(checker.includes("workout"))return "workout"
        if(checker.includes("walk"))return "walk"
        if(checker.includes(" run"))return "run"
        return "unknown";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet

        var mi=/[0-9]+.[0-9]+ mi/mg.exec(this.text)
        var km=/[0-9]+.[0-9]+ km/mg.exec(this.text)

        if(mi)mi=/[0-9]+.[0-9]+/mg.exec(mi[0])
        if(km)km=/[0-9]+.[0-9]+/mg.exec(km[0])

        if(mi)return parseFloat(mi[0])
        if(km)return parseFloat(km[0])/1.60934

        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        var text_content=this.text
        var link=/http[^\s]+/mg.exec(text_content)
        if(link){
            var link_txt=link[0]
            var start_text=text_content.substring(0,text_content.indexOf("http"))
            var end_text=text_content.substring(text_content.indexOf("http")+link_txt.length)

            text_content=   start_text+
                            "<a href=\""+link_txt+"\">"+
                            link_txt+
                            "</a>"+
                            end_text
        }

		return ("<tr>"	+
		        "<td scope=\"col\">"+rowNumber+"</td>"	+
		        "<td scope=\"col\">"+this.activityType+"</td>"	+
		        "<td scope=\"col\">"+text_content+"</td>"   +
		        "</tr>")
    }
}