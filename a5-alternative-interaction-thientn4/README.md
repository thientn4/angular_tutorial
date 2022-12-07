--Readme document for Thien Nguyen, thientn4@uci.edu, 69111346--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

25/25
- 10/10 Created a functional web app
- 5/5 The ability to control the web app with basic gestures (1pt per gesture)
- 4/4 The ability to control the web app with at least two custom gestures
- 2/2 Following good principles of UI design
- 2/2 Creating a compelling app and application of gestures
- 2/2 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
10 hours


3. What online resources did you consult when completing this assignment? (list specific URLs)
https://www.w3schools.com/cssref/css3_pr_animation.php
https://developer.mozilla.org/en-US/docs/Web/API/setInterval


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
None


5. Is there anything special we need to know in order to run your code?
None


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
My app is a game for user to check their reflex with rating. It is similar to Dance Dance Revolution arcade game but for hand signs. It can also be used for medical or research purposes.

7. Describe the two custom gestures you created.
I have the following gestures in the game for user to play (3 last gestures are custom gestures)
- 2 opened hands
- 2 closed hands
- 2 pointing hands
- 1 closed hand + 1 opened hand
- 1 pointing hand + 1 opened hand
- 1 pointing hand + 1 closed hand


8. How does your app implement or follow principles of good UI design?
My app follow a minimalist design where user can:
- start a game loop with 2 opened hands which is always the first gesture and free point in a game (this reduces the complexity for user to understand how to use the app)
- end a game using 1 or 2 pinching hands (pinching hands are harder to be detected so it is not included in a game but is used to stop game)
- after ending a game, user will be passed to a score board showing how many times they got correctly for each gestures. User can exit score board using 1 or 2 opened hands and return to game page to start new game
==> every non-game gestures have titles describing their functionalities
