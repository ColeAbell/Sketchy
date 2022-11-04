

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

 
app.use(cors());
app.options("*", cors());

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST", "PUT"],
        credentials: true
    },
});

app.use(express.static(path.join(__dirname+"/public")));

let info = [];
let colors = ["#fc0da1", "#4a00b5", "#43b3ae", "#abd98c", "#e600ff", "#82aa9a", "#0ebabd", "#722f37", "#fed400", "#F54D28", "#2F59A7", "#016A13", "#963D97", "#1B8751", "#CCFF00", "#4D8C57", "#00CCCC", "#C62D42"];
let usedColors = [];

io.on("connection", function(socket){
    info.push(socket);
    if(colors.length === 1){
        socket.color = colors[0];
        usedColors.push(colors.pop(0));
        colors = usedColors;
        usedColors = [];
    }
    else{
        let color = Math.floor(Math.random()*colors.length);
        socket.color = colors[color];
        usedColors.push(colors.pop(color));
        console.log(socket.color);
    }
    io.to(socket.id).emit("getColor", socket.color);

    socket.on("newuser", function(username){
        let locate = info.indexOf(socket);
        info[locate].username = username;
        socket.broadcast.emit("update", username + " joined the game");
    });

    socket.on("exituser", function(username){
        //socket.broadcast.emit("update", username + " left the game");
    });

    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });

    socket.on("disconnect", async function(){
        console.log(info);
        let loc = info.indexOf(socket);
        let useThis = info[loc];
        if(socket.username !== undefined){
            socket.broadcast.emit("update", socket.username + " left the game");
        }
        console.log(useThis);
        const gettingUsers = await fetch('http://localhost:8080/api/user');
        const usersJson =  await gettingUsers.json();
        let user = usersJson.filter(u => u.userName === useThis.username);
        info.splice(loc, 1);
        console.log(user);
        if(user.length === 1){
            let id = user[0].userId;
            const dresult = await fetch(`http://localhost:8080/api/user/${id}`, {method: 'DELETE'});
            const getBoard = await fetch('http://localhost:8080/api/roundboard');
            const boardJson = await getBoard.json(); 
            if(boardJson.length > 0){
                const max = boardJson.reduce(function(prev, current) {
                    return (prev.roundBoardId > current.roundBoardId) ? prev : current
                });
                if(max.userId === id){
                    const gettingUsers = await fetch('http://localhost:8080/api/user');
                    const usersJson = await gettingUsers.json();
                    if(usersJson.length > 0){
                        const gettingQuestions = await fetch('http://localhost:8080/api/question');
                        const questionsJson = await gettingQuestions.json();
                        const chooseArtist = usersJson[Math.floor(Math.random() * usersJson.length)].userId;
                        const chooseQuestion = questionsJson[Math.floor(Math.random() * questionsJson.length)].questionId;
                        const newRoundBoard = {
                            questionId: chooseQuestion,
                            userId: chooseArtist,
                            guessed: false,
                            victor: 0,
                            roundOver: false
                        };
                        const init = {
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newRoundBoard)
                        };
                        console.log(newRoundBoard);
                        const makeBoard = await fetch('http://localhost:8080/api/roundboard', init);
                    };
                }
            }};
    });
});

server.listen(5000, function() {
    console.log("server started");
});