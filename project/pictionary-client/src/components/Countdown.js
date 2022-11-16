import { useEffect, useState } from 'react';
import Canvas from './Canvas';

function Countdown() {
    const [timer, setTimer] = useState({min: 1, sec: 0, display: false});

    useEffect(() => {
        console.log("countdown rerender");
        timeAdjust();
    }, []);

    function timeAdjust(){
    setTimeout(async function(){
        const boards = await fetch('http://localhost:8080/api/roundboard');
        const boardsJson = await boards.json();
        let max = null;
        let show = false;
        if(boardsJson.length > 0){
            max = boardsJson.reduce(function(prev, current) {
                return (prev.roundBoardId > current.roundBoardId) ? prev : current
            });
        }
        if(max !== null){
            const theUsers = await fetch('http://localhost:8080/api/user');
            const usersJson = await theUsers.json();
            if(usersJson.length >= 2){
                show = true;
            }
            let start = new Date(max.startTime[0], max.startTime[1]-1, max.startTime[2], max.startTime[3], max.startTime[4], max.startTime[5]);
            let now = new Date();
            let newTime = 75000 - (now - start);
            let minutes = 0;
            let seconds = 0;
            if((newTime <= 0 || usersJson.length < 2) && max.roundOver === false){
                console.log("time is out");
                show = false;
                max.roundOver = true;
                const init = {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(max)
                };
                const updateBoard = await fetch(`http://localhost:8080/api/roundboard/${max.roundBoardId}`, init);
            }
            else if(newTime >= 60000){
                minutes = 1;
                seconds = Math.floor((newTime - 60000) / 1000);
            }
            else{
                seconds = Math.floor(newTime / 1000);
            }
            if(seconds < 0){
                seconds = 0;
            }
            console.log(show);
            console.log(usersJson.length);
            setTimer({min: minutes, sec: seconds, display: show});
            }
        timeAdjust();
    }, 1)
};

return (
    <div>
        {
        (timer.display === true) ?
        <div className="timer">
        <h1 style={{paddingTop: 75, fontWeight: 500}}>
        Min: {timer.min <= 9 ? "0" + timer.min : timer.min} Sec: {timer.sec <= 9 ? "0" + timer.sec : timer.sec}
        </h1>
        </div>
        :
        <></>
        }
    </div>
);
}

export default Countdown;