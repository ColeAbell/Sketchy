
# <p align="center">Sketchy 🎨</p>
  
Sketchy is a full stack, multiplayer,  and self-moderating Pictionary inspired game. It allows players to make use of a real time public chatroom as well as a real time public drawing board to draw 
 masterpieces for your friends and guess what each round's artist is creating in order to score points and win. I love chaotic party games, and while I am not a great artist I have always had a fondness for Pictionary in particular. I hope this can provide people a fun pick up and play version.
## 🧐 How The Game Works / Demo    
- To join the game, each player may read the rules at the top of the page and then scroll down to the chat login. There they simply enter a unique username and hit "Join". They will now be a registered player and the chat feature will become fully available. 
- They also have access to the public drawing board that can be seen by everyone, there the chosen artist each round will attempt to draw their secret prompt. Be sure to make use of the various colors and drawing tools the board offers in order to make your art as clear as you can.
- The game has a constantly updating Leaderboard to show the current players and their respective points / placements.
- The game will start itself when at least two players have joined. If at any point the player count drops below two again, the game will end the current round and wait until it has the proper player amount to start a new one.
- When a round begins the player who has waited the longest to draw will be selected as the artist, they will then recieve a secret prompt drawn for them in red on the canvas at the top of the chatroom. Only they can see it. They will have one and a half minutes to draw their masterpiece on the board while the others players watch and make their guesses.
- The "current round" sign above the chat will tell players who is the artist that turn, how much time is remaining via an animated countdown, and what the category is for that round. For instance if the category is "nature", the artist's prompt might be "beach".
- Non-artists can make any guesses they have inside the chat while they watch the artist at work, if they are correct the game will recognize their answer with an animation and they will be rewarded 10 points. The artist of a correctly guessed round would also recieve 5 points. A new round will automatically begin.
- If the correct answer is not guessed in time, the animated countdown will run out and a new round will automatically begin.
- At the end of each round the board will clear itself
- To be taken out of the game, select the "Exit" button at the top right of the chat or you can simply refresh/close the page.
- If a user is inactive for a long period of time they will recieve a warning and soon after that be automatically removed from the game to help keep the game active.

----------



## 🛠️ Tech Stack
**Back End**

----------
- [Java](https://www.java.com/)
- REST API
- [Spring](https://spring.io) 
- [JUnit](https://junit.org/junit5/)
- [Maven](https://maven.apache.org/)
- [Docker](https://www.docker.com/)
- [MySql](https://www.mysql.com/) 
- [Socket.io](https://socket.io/)
- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
- [Javascript](https://www.javascript.com/)

----------
**Front End**


----------
- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Sass](https://sass-lang.com/)
- CSS / HTML
- [Socket.io](https://socket.io/)
- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
- [Javascript](https://www.javascript.com/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)


----------
        
## 🛠️ Installation 

First you will need to install [Node.js](https://nodejs.org/en/download/) from their site if you don't already have it on your computer.

Sketchy consists of four different applications that each require run commands. The repo is currently designed to run on your computer's local servers, so in order to explore the multiplayer feature is is encouraged for you to use incognito windows in order to simulate multiple devices. 

**Backend :**

Run the "Sketchy/project/pictionary" directory in you IDEA from the App file. Intellij was what I used for development.

**Chatroom :**

Open the "Sketchy/project/chatroom" directory in the terminal and run
```bash
npm start
```

**Sketchpad :**

Open the "Sketchy/project/sketchpad" directory in the terminal and run
```bash
PORT=5001 npm start
```

**React Frontend :**

Open the "Sketchy/project/pictionary-client" directory in the terminal and use this command. It will run the main site URL which will be localhost:3000         
```bash
npm start
```        

## 🙇 Acknowledgements      
**WBO :**

WBO is an open source API used for the drawing board. The original author's name is Ophir Lojkine and her github can be found 
[here](https://github.com/lovasoa/whitebophir). I made a few modifications for my implimentation including establishing communication with my backend and unlocking an administrative "clear board" feature in order to put in a method that will clear the board whenever it detects the creation of a new round in the backend.