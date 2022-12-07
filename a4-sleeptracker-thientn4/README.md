--Readme document for Thien Nguyen, thientn4@uci.edu, 69111346--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

20/20
- 2/2 The ability to log overnight sleep
- 2/2 The ability to log sleepiness during the day
- 2/2 The ability to view these two categories of logged data
- 4/4 Either using a native device resource or backing up logged data
- 4/4 Following good principles of mobile design
- 4/4 Creating a compelling app
- 2/2 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
8 hours


3. What online resources did you consult when completing this assignment? (list specific URLs)
https://ionicframework.com/docs/api/slides
https://capacitorjs.com/docs/guides/storage


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
NONE


5. Is there anything special we need to know in order to run your code?
NONE


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
students who want to improve their productivity


7. Did you design your app specifically for iOS or Android, or both?
BOTH with same design


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
In the page to view overnight sleep data, there will be the '+' icon for user to log.
In the page to log new overnight sleep, there will be 2 calendars for start time and end time where user can choose date and time when they went to bed and woke up before clicking the submit button.
I find this design easy for user to navigate and the information is enlarged enough for them to see clearly.



9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
In the page to view sleepiness data, there will be the '+' icon for user to log.
In the page to log new sleepiness data, there will be a horizontal slides with 7 sleepiness levels for user to choose before clicking the submit button.
I find this design easy for user to navigate and the information is enlarged enough for them to see clearly.


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
The home screen of the app will have 2 icons depicting 2 types of logged data for user to choose.
Both sleepiness and overnightsleep will be displayed in 2 separated pages.
Overnight sleep data will be displayed in form of vertical list with the newest data at the bottom
Sleepiness data will be displayed in form of horizontal list which user can swipe left or right to navigate (newest data will be on the right side and user can swipe left to view older data).
I find this design easy for user to navigate and the information is enlarged enough for them to see clearly. The 2 options to see 2 different types of logged data are also clearly separated.


11. Which feature choose--using a native device resource, backing up logged data, or both?
backing up logged data


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?
NONE


13. If you backed up logged data, where does it back up to?
Local Storage of Capacitor

14. How does your app implement or follow principles of good mobile design?
- Contents, texts are enlarged appropriately for clear visibility with simple design for all components
- Navigation between pages is clear to see which page comes first, which comes later
- Touchscreen buttons with right size and positioned in convenient hand position area
- No typing need
- Error prevention with overnight sleep logging functionality to avoid errors such as [end time < start time] or [logging with future time]