# rithm-jokes-fe
Frontend for a Jokes API backed by icanhazdadjokes.

Setup Instructions
====
* Clone the project - `git clone https://github.com/suiyer/rithm-jokes-fe.git`
* npm install axios
* npm run build
* Run with npm start
* The project will start up on `localhost:3000`

Implementation Details
====
* This project was bootstrapped by create-react-app
* I used axios for the ajax calls to the backend
* I used Bootstrap for the presentation

Design
====
* When the page loads up, it get the list of random jokes, top 5 jokes, and bottom 5 jokes from the backend. Initially the Top 5 and Bottom 5 list is empty.
* When a joke is upvoted, the Top 5 list is refreshed.
* When a joke is downvoted, the Bottom 5 list is refreshed.
* Clicking on the Refresh This List button on the Random Jokes list will get a list of new jokes.
