import { useEffect, useState } from 'react';

function LeaderBoard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        gettingUsers();
    }, []);

    const firstPlace = "🏆";
    const secondPlace  = "🥈";
    const thirdPlace  = "🥉";

    function active(user){
        let now = new Date();
        console.log(user);
        console.log(now);
        let last = new Date(user.lastActive[0], user.lastActive[1]-1, user.lastActive[2], user.lastActive[3], user.lastActive[4], user.lastActive[5]);
        console.log(last);
        console.log(now-last);
        return (now - last) < 240000; 
    };

    function gettingUsers(){
        setTimeout(async function (){
            console.log("grab  user loop runs");
            const theUsers = await fetch('http://localhost:8080/api/user');
            const usersJson = await theUsers.json();
            if(usersJson.length === 0){
                setUsers(usersJson);
            }
            else{
                usersJson.sort(function(a, b){return b.points - a.points});
                if(usersJson[0].points > 0){
                    let p = 0;
                    let amount = usersJson[0].points;
                    while(usersJson[p] !== undefined && usersJson[p].points === amount){
                        usersJson[p].userName = firstPlace + " " + usersJson[p].userName;
                        p += 1;
                    }
                    if(usersJson[p] !== undefined && usersJson[p].points > 0){
                        amount = usersJson[p].points;
                        while(usersJson[p] !== undefined && usersJson[p].points === amount){
                            usersJson[p].userName = secondPlace + " " + usersJson[p].userName;
                            p += 1;
                        }
                        if(usersJson[p] !== undefined && usersJson[p].points > 0){
                            amount = usersJson[p].points;
                            while(usersJson[p] !== undefined && usersJson[p].points === amount){
                                usersJson[p].userName = thirdPlace + " " + usersJson[p].userName;
                                p += 1;
                            }
                        }
                    }
                }
                let validUsers = usersJson.filter(active);
                for(const u of usersJson){
                    if(validUsers.map(u => u.userId).includes(u.userId) === false){
                        let deleting = await fetch(`http://localhost:8080/api/user/${u.userId}`, {method: 'DELETE'});
                    }
                }
                setUsers(validUsers);
            }
            gettingUsers();
        }, 10);
    }
    return (
        <>
            <div>
                <table className="table table-striped table-sm table-primary">
                    <thead id="tableHead">
                        <tr>
                            <th>Username</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.sort(function(a, b){return b.points - a.points}).map(user => (
                            <tr key={user.userId}>
                                <td>{user.userName}</td>
                                <td>{user.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default LeaderBoard;