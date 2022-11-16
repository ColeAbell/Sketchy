import Canvas from "./Canvas";

function Rules(){

    let ruleOne = "• The game will start when at least two players have joined";
    let ruleOneTwo = "• To join the game enter a username below";
    let ruleTwo = "• Each round a user will be randomly selected as the artist";
    let ruleThree = "• If you are chosen as the artist, your secret prompt will be written in red at the top of the chat";
    let ruleFour = "• The artist will attempt to draw their prompt on the community board. Only the designated artist should use the board.";
    let ruleFive = "• If you think you know what the artist is drawing, make your guess in the chat";
    let ruleSix = "• A correct guess will end that round, and that user will win 10 points while the artist recieves 5";
    let ruleSeven = "• If the round timer runs out, no points are recieved and a new round will begin";
    let ruleEight = "• If you are inactive for serveral minutes you will be removed from the game";

    return (
        <div className="sketch" style={{ 
            backgroundImage: `url("http://i.imgur.com/5RIXWIE.png")`
          }}>
            <Canvas color="#080203" speed={5} bottom="0" top="0" high="89" x={300} y={75} wide="900" txt="RULES" size="70"></Canvas>
            <Canvas color="#080203" wide="950" speed={80} high="180" x={30} y={90} txt={ruleOne} size="35"></Canvas> 
            <Canvas color="#080203" wide="950" speed={80} high="180" x={30} y={90} txt={ruleOneTwo} size="35"></Canvas> 
            <Canvas color="#080203" wide="950" speed={90} high="180" x={30} y={35} txt={ruleTwo} size="35"></Canvas>
            <Canvas color="#080203" wide="950" speed={90} high="200" x={30} y={30} txt={ruleThree} size="35"></Canvas>
            <Canvas color="#080203" wide="950" speed={100} high="230" x={30} y={60} txt={ruleFour} size="35"></Canvas>
            <Canvas color="#080203" wide="950" speed={100} high="210" x={30} y={60} txt={ruleFive} size="35"></Canvas>
            <Canvas color="#080203" wide="950" speed={90} high="210" x={30} y={40} txt={ruleSix} size="35"></Canvas>
            <Canvas color="#080203" wide="950" speed={90} high="200" x={30} y={60} txt={ruleSeven} size="35"></Canvas>
        </div>
    )
}
export default Rules;