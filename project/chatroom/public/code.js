
(function(){
    console.log("initializing");
    const app = document.querySelector(".app");
    const socket = io();
    let colors = ["#fc0da1", "#4a00b5", "#43b3ae", "#abd98c", "#e600ff", "#82aa9a", "#0ebabd", "#722f37", "#fed400", "#F54D28", "#2F59A7", "#016A13", "#963D97", "#1B8751", "#CCFF00", "#4D8C57", "#00CCCC", "#C62D42", '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
    let randomColor = colors[Math.floor(Math.random()*colors.length)];
    let chatColor;
    let uname;
    let initialSetup = false;
    let id = null;
    let correct = false;
    let drawing = false;
    let userCount = 0;
    let warned = false;
    const firstPlace = "🏆";
    const secondPlace  = "🥈";
    const thirdPlace  = "🥉";
    let isFirst = false;
    let isSecond = false;
    let isThird = false;

    async function setPlace(){
        const gettingUsers = await fetch('http://localhost:8080/api/user');
        const usersJson = await gettingUsers.json();
        let names = app.querySelectorAll(".name");
        function compare( a, b ) {
            if ( a.points < b.points ){
              return 1;
            }
            if ( a.points > b.points ){
              return -1;
            }
            return 0;
          }
        console.log(names.length);
        if(usersJson.length > 0 && names.length > 0){
            usersJson.sort(compare);
            let first = [];
            let second = [];
            let third = [];
            if(usersJson[0].points > 0){
                let p = 0;
                let amount = usersJson[0].points;
                while(usersJson[p] !== undefined && usersJson[p].points === amount){
                    first.push(usersJson[p].userName === uname ? "You" : usersJson[p].userName);
                    p += 1;
                }
                if(usersJson[p] !== undefined && usersJson[p].points > 0){
                    amount = usersJson[p].points;
                    while(usersJson[p] !== undefined && usersJson[p].points === amount){
                        second.push(usersJson[p].userName === uname ? "You" : usersJson[p].userName);
                        p += 1;
                    }
                    if(usersJson[p] !== undefined && usersJson[p].points > 0){
                        amount = usersJson[p].points;
                        while(usersJson[p] !== undefined && usersJson[p].points === amount){
                            third.push(usersJson[p].userName === uname ? "You" : usersJson[p].userName);
                            p += 1;
                        }
                    }
                }
            }
            names.forEach(element => {
                let text = element.innerText;
                let textName = text.split(" ")[0];
                console.log(text.includes(firstPlace));
                if(first.find(a => a.includes(textName)) !== undefined || second.find(a => a.includes(textName)) !== undefined || third.find(a => a.includes(textName)) !== undefined){
                    if(first.find(a => a.includes(textName)) !== undefined && text.includes(firstPlace) === false){
                        element.innerText = textName + " " + firstPlace;
                        console.log(element.innerText);
                    }
                    else if(second.find(a => a.includes(textName)) !== undefined && text.includes(secondPlace) === false){
                        element.innerText = textName + " " + secondPlace;
                    }
                    else if(third.find(a => a.includes(textName)) !== undefined && text.includes(thirdPlace) === false){
                        element.innerText = textName + " " + thirdPlace;
                    }
                }
                else{
                    if(text.includes(firstPlace) === true){
                        element.innerText = text.replace(firstPlace, "");
                    }
                    else if(text.includes(secondPlace) === true){
                        element.innerText = text.replace(secondPlace, "");
                    }
                    else if(text.includes(thirdPlace) === true){
                        element.innerText = text.replace(thirdPlace, "");
                    }
                }   
            });
        }  
    }

    function setUp(size, color, text, classTitle){
        var ctx = app.querySelector(classTitle).getContext("2d");
        let dashLen = 220;
        let dashOffset = dashLen;
        let speed = 15;
        let txt = text;
        let x = 3;
        let i = 0;
        ctx.font = `${size}px Comic Sans MS, cursive, TSCu_Comic, sans-serif`; 
        ctx.lineWidth = 5; ctx.lineJoin = "round"; ctx.globalAlpha = 2/3;
        ctx.strokeStyle = ctx.fillStyle = color;
        (function loop() {
        ctx.clearRect(x, 0, 60, 150);
        ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
        dashOffset -= speed;                                         // reduce dash length
        ctx.strokeText(txt[i], x, 90);                               // stroke letter
        if (dashOffset > 0) requestAnimationFrame(loop);             // animate
        else {
            ctx.fillText(txt[i], x, 90);                               // fill final letter
            dashOffset = dashLen;                                      // prep next char
            x += ctx.measureText(txt[i++]).width + ctx.lineWidth * .7;
            ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
            ctx.rotate(Math.random() * 0.005);                         // random rotation
            if (i < txt.length) requestAnimationFrame(loop);
        }
        })()};
    setUp("45", "#080203", "Join The Game", ".canvas");

  async function exitChat(){
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
                const getBoard = await fetch('http://localhost:8080/api/roundboard', init);
            };
        }
    }
    socket.emit("exituser",uname);
    window.location.href = window.location.href;
    };

    function gettingBoard(){
        setTimeout(async function (){
            const boards = await fetch('http://localhost:8080/api/roundboard');
            const boardsJson = await boards.json();
            if(boardsJson.length > 0){
                if(app.querySelectorAll(".name").length > 0){
                    await setPlace();
                }
                const max = boardsJson.reduce(function(prev, current) {
                    return (prev.roundBoardId > current.roundBoardId) ? prev : current
                });
                const allUsers = await fetch('http://localhost:8080/api/user');
                const usersJson = await allUsers.json();
                userCount = usersJson.length;
                if(id !== null && usersJson.map(u => u.userId).includes(id) === false){
                    await exitChat();
                }
                if(id !== null && warned === false){
                    let user = usersJson.filter(u => u.userId === id)[0];
                    let now = new Date();
                    let last = new Date(user.lastActive[0], user.lastActive[1]-1, user.lastActive[2], user.lastActive[3], user.lastActive[4], user.lastActive[5]);
                    if((now - last) >= 180000){
                        window.alert("Warning, you will soon be removed from the game for inactivity. Post in the chat to remain active.");
                        warned = true;
                    }
                }
                if(usersJson.length < 2 && drawing === true){
                    drawing = false;
                    app.querySelector(".logo").innerHTML = "";
                    app.querySelector(".logo").innerHTML = "<canvas class=\"chatCanvas\"></canvas>";
                    setUp("40", "#080203", "Chatroom", ".chatCanvas");
                    app.querySelector(".chatCanvas").innerText = "Chatroom";    
                }
                else if(id !== null && max.userId === id && usersJson.length >= 2){
                    if(drawing === false){
                        const question = await fetch(`http://localhost:8080/api/question/${max.questionId}`);
                        const questionJson = await question.json();
                        drawing = true;
                        app.querySelector(".logo").innerHTML = "";
                        app.querySelector(".logo").innerHTML = "<canvas class=\"chatCanvas\"></canvas>";
                        setUp("40", "#FF0000", questionJson.content, ".chatCanvas");
                        app.querySelector(".chatCanvas").innerText = "Content";
                    }    
                }
                else if(id !== null && max.userId !== id && usersJson.length >= 2){
                    if(drawing === true){
                        app.querySelector(".logo").innerHTML = "";
                        app.querySelector(".logo").innerHTML = "<canvas class=\"chatCanvas\"></canvas>";
                        setUp("40", "#080203", "Chatroom", ".chatCanvas");
                        app.querySelector(".chatCanvas").innerText = "Chatroom";
                        drawing = false;
                    }
                }
            }
            setTimeout(() => {}, 10);
            gettingBoard();
        }, 1);
    }


    app.querySelector(".join-screen #join-user").addEventListener("click", async function(){
        console.log("attempting join");
        let username = app.querySelector(".join-screen #username").value;
        const usersCheck = await fetch('http://localhost:8080/api/user');
        const checkJson = await usersCheck.json();
        const names = checkJson.map(u => u.userName);
        if(username.length == 0){
            return;
        }
        if(username.length > 15){
            app.querySelector("#taken").innerText = "Username must be 15 characters or less";
            return;
        }
        if(names.includes(username) === true){
            app.querySelector("#taken").innerText = username + " is already taken, please try a different username";
            return;
        }
        const user = {
            userName : username
        };
        const init = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
          };

        const result = await fetch('http://localhost:8080/api/user', init);
        const newJson = await result.json();
        id = newJson.userId;
        socket["id"] = id;
        socket["username"] = username;
        console.log(socket.id);
        app.querySelector("#taken").innerText = "";
        console.log(id);
        socket.emit("newuser", username);
        uname = username;
        const boards = await fetch('http://localhost:8080/api/roundboard');
        const boardsJson = await boards.json();
        let max = null;
        if(boardsJson.length > 0){
             max = boardsJson.reduce(function(prev, current) {
                return (prev.roundBoardId > current.roundBoardId) ? prev : current
            });
        }
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
        if(max.userId === id && checkJson.length >= 2){
            const question = await fetch(`http://localhost:8080/api/question/${max.questionId}`);
            const questionJson = await question.json();
            drawing = true;
            app.querySelector(".logo").innerHTML = "";
            app.querySelector(".logo").innerHTML = "<canvas class=\"chatCanvas\"></canvas>";
            setUp("40", "#FF0000", questionJson.content, ".chatCanvas");
            app.querySelector(".chatCanvas").innerText = "Content";
        }   
        else{
            app.querySelector(".logo").innerHTML = "";
            app.querySelector(".logo").innerHTML = "<canvas class=\"chatCanvas\"></canvas>";
            setUp("40", "#080203", "Chatroom", ".chatCanvas");
            app.querySelector(".chatCanvas").innerText = "Chatroom";
            drawing = false;
        }
        gettingBoard();
    
    });

    app.querySelector(".chat-screen #send-message").addEventListener("click", async function(){
        let message = app.querySelector(".chat-screen #message-input").value;
        if(message.length == 0){
            return;
        }
        warned = false;
        const boards = await fetch('http://localhost:8080/api/roundboard');
        const roundJson = await boards.json();
        if(roundJson.length > 0){
        const max = roundJson.reduce(function(prev, current) {
            return (prev.roundBoardId > current.roundBoardId) ? prev : current
        });
        const lr = await fetch(`http://localhost:8080/api/roundboard/${max.roundBoardId}`);
        const roundBoard = await lr.json();
        const q = await fetch(`http://localhost:8080/api/question/${roundBoard.questionId}`);
        const question = await q.json();

        console.log(question.content);
        console.log(typeof message);
        if(roundBoard.roundOver === false && message.toLowerCase().includes(question.content.toLowerCase()) === true && drawing === false && userCount >= 2){
            roundBoard.guessed = true;
            roundBoard.roundOver = true;
            roundBoard.victor = id;
            const init = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(roundBoard)
              };
            const updateBoard = await fetch(`http://localhost:8080/api/roundboard/${roundBoard.roundBoardId}`, init);
            const artist  = await fetch(`http://localhost:8080/api/user/${roundBoard.userId}`);
            let artistJson = await artist.json();
            const winner = await fetch(`http://localhost:8080/api/user/${roundBoard.victor}`);
            let winnerJson = await winner.json();
            artistJson.points += 5;
            artistJson.isDrawing = false;
            winnerJson.points += 10;
            const reinit = {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(artistJson)
            };
            const initW = {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(winnerJson)
            };
            const updateArtist = await fetch(`http://localhost:8080/api/user/${artistJson.userId}`, reinit);
            const updateWinner = await fetch(`http://localhost:8080/api/user/${winnerJson.userId}`, initW);
            correct = true;
            console.log(winnerJson.lastActive);
        }
        else{
            const me = await fetch(`http://localhost:8080/api/user/${id}`);
            const meJson = await me.json();
            const initM = {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(meJson)
            };
            const updateMe  =  await fetch(`http://localhost:8080/api/user/${id}`, initM);
            console.log(meJson.lastActive);
            console.log(Date());
        }
    }
        renderMessage("my", {
            username:uname,
            text:message,
            color: randomColor,
        }, correct);
        socket.emit("chat", {
            username:uname,
            text:message,
            isCorrect:correct,
            color: randomColor,
        });
        app.querySelector(".chat-screen #message-input").value = "";
        correct = false;
    });

    app.querySelector(".chat-screen #exit-chat").addEventListener("click", async function()
    {
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
                    const getBoard = await fetch('http://localhost:8080/api/roundboard', init);
                    const boardJson = await getBoard.json(); 
                };
            }
        }
        //socket.emit("exituser",uname);
        window.location.href = window.location.href;
    });

    socket.on("update", function(update){
        renderMessage("update", update, correct);
    })

    socket.on("chat", function(message){
        renderMessage("other", message);
    })

    socket.on("getColor", function(color){
        console.log(color);
        chatColor = color;
    })

    
    function renderMessage(type,message,correct = false){
        let messageContainer = app.querySelector(".chat-screen .messages");
        let extra;
        console.log(correct);
        if(correct){
            extra  = "class=\"glow roll-in-left\"";
        }
        else{
            extra = "class=\"roll-in-left\"";
        }
        if(type == "my"){
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            console.log(socket.color);
            el.innerHTML = `
            <div ${extra}>
                <div style=\"color:${message.color};\" class="name">You</div>
                <div class="text">${message.text}</div>
            </div>`;
            console.log(el.innerHTML);
            messageContainer.appendChild(el);
        }
        else if(type == "other"){
            let emitCorrect = "class=\"roll-in-left\"";
            if(message.isCorrect === true){
                emitCorrect = "class=\"glow roll-in-left\"";
            } 
            let el = document.createElement("div");
            el.setAttribute("class", "message other-message");
            el.innerHTML = `
            <div ${emitCorrect}>
                <div style=\"color:${message.color};\" class="name">${message.username}</div>
                <div class="text">${message.text}</div>
            </div>`;
            messageContainer.appendChild(el);
        }
        else if(type == "update"){
            let el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerText = message;
            messageContainer.appendChild(el);
        }
        correct = false;
        //scroll chat to end
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

})();