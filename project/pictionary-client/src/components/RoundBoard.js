import { useEffect, useState } from 'react';
import Canvas from './Canvas';
import Countdown from './Countdown';

function RoundBoard() {
    const [board, setBoard] = useState({artist: null, category: null, enoughUsers: false, startTime: null});

    useEffect(() => {
        
        gettingBoard();
        
        
    }, []);

    function gettingBoard(){
        setTimeout(async function (){
            console.log("roundboard loop");
            const boards = await fetch('http://localhost:8080/api/roundboard');
            const boardsJson = await boards.json();
            if(boardsJson.length > 0){
                const max = boardsJson.reduce(function(prev, current) {
                    return (prev.roundBoardId > current.roundBoardId) ? prev : current
                });
                const users = await fetch('http://localhost:8080/api/user');
                const usersJson = await users.json();
                let validUsers = usersJson.filter(u => u.userId === max.userId);
                let username = "None";
                if(validUsers.length > 0){
                    username = validUsers[0].userName;
                }
                let enough = usersJson.length >= 2 ? true : false;
                console.log(usersJson);
                console.log(enough);
                const question = await fetch(`http://localhost:8080/api/question/${max.questionId}`);
                const questionJson = await question.json();
                const categoryF = await fetch(`http://localhost:8080/api/category/${questionJson.categoryId}`);
                const categoryJson = await categoryF.json();
                if(username !== board.artist || categoryJson.type !== board.category || enough !== board.enoughUsers || max.startTime !== board.startTime){
                    setBoard({artist: username, category: categoryJson.type, enoughUsers: enough, startTime: max.startTime});
                }   
            }
            gettingBoard();
        }, 1);
    }
    return (
        <>
            
                {board.enoughUsers === true && 
               <>
                <div className="canvas">
                <Canvas color="#080203" speed={15} txt="Current Round" x={70} y={90} size="50" wide="550" top={40} bottom={40}></Canvas>
                </div>
                <table className="table table-striped table-sm table-primary">
                    <thead>
                        <tr>
                            <th>Artist</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <tr key={board.roundBoardId}>
                                <td>{board.artist}</td>
                                <td>{board.category}</td>
                            </tr>
                        }
                    </tbody>
                </table>
                </>}
                {board.enoughUsers === false && 
                <div className="canvas">
                <Canvas color="#080203" mBottom="40" speed={10} txt="Need Two To Play" size="50" x={30} y={90} wide="550" bottom={40} top={40}></Canvas>
                </div>}
                    
            
        </>
    );
}

export default RoundBoard;