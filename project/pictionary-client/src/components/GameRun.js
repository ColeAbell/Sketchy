import React, { useState, useEffect, setState } from 'react';
import Canvas from './Canvas';
import Countdown from './Countdown';
import LeaderBoard from './LeaderBoard';
import RoundBoard from './RoundBoard';

function GameRun() {
    const [roundBoard, setRoundBoard]  = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
       
        loop();
       
        
    }, []);
        
    async function startingRound(usersJson){
        if(usersJson.length >= 2){
            console.log("attempting to make board");
            const gettingQuestions = await fetch('http://localhost:8080/api/question');
            const questionsJson = await gettingQuestions.json();
            console.log("question json");
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
        }
        
    }
    async function updateRound(){
        const dataVersion = await fetch(`http://localhost:8080/api/roundboard/${roundBoard.roundBoardId}`);
        const dataJson = await dataVersion.json();
        console.log(dataJson);
        if(dataJson.guessed === true){
            setRoundBoard(dataJson);
        }
    }

    function loop(){
        setTimeout(async function (){
            const gettingUsers = await fetch('http://localhost:8080/api/user');
            const usersJson = await gettingUsers.json();
            if(usersJson.length >= 2){
                let boards = await fetch('http://localhost:8080/api/roundboard');
                let boardsJson = await boards.json();
                if(boardsJson.length === 0){
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
                }
                else {
                    const max = boardsJson.reduce(function(prev, current) {
                        return (prev.roundBoardId > current.roundBoardId) ? prev : current
                    });
                    let validUsers = usersJson.map(u => u.userId);
                    console.log(max);
                    if(max.guessed === true || max.roundOver === true || validUsers.includes(max.userId) === false){
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
                        }
                }
            }
            
            loop();
        }, 1);
    };
                


        return (
            <>
            <div className="canvas">
            <Canvas color="#080203" mBottom="4"  mTop="20" speed={10} wide="550" x={80} y={90} txt="Leaderboard" size="50" bottom={20} top={20} ></Canvas>
            </div>
            <LeaderBoard></LeaderBoard>
            <RoundBoard></RoundBoard>
            <Countdown></Countdown>
            
            </>
        )
};

export default GameRun;