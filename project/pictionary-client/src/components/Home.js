import React, { useState, useEffect } from "react";
import "../App.scss";
import LeaderBoard from "./LeaderBoard";
import GameRun from "./GameRun";
import Canvas from "./Canvas";
import Rules from "./Rules";


function Home() {

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener('DOMContentLoaded', function(e) {

      var iFrame = document.getElementById( 'chat' );
      iFrame.width  = iFrame.contentWindow.document.body.scrollWidth;
      iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
  } );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function resizeIFrameToFitContent( iFrame ) {

    iFrame.width  = iFrame.contentWindow.document.body.scrollWidth;
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
};




  const renderContent = () => (
    <>
      <div className="Parallax__content__heading">
        <div className="Parallax__content__heading__text">
        <Canvas color="#080203" speed={8} wide="550" x={1} y={90} txt="SKETCHY" size="70" left={35}></Canvas>
        
        </div>
      </div>
      <Rules></Rules>
      <div className="Parallax__contents__cta">
        
        <GameRun></GameRun>
        <iframe title="chatRoom" id="chat" className="chatRoom" src="http://localhost:5000" width='512' height='840' ></iframe>
        <iframe title="sketch" className = "sketch" src="http://localhost:5001/boards/anonymous" width='500' height='840'></iframe>
        
      </div>
    </>
  );

  return (
    <section className="Parallax">
      <divcd
        className="Parallax__background"
        style={{ transform: `translateY(-${offsetY * 0.5}px)` }}
      />
      <div
        className="Parallax__background-triangles"
        style={{ transform: `translateY(${offsetY * 0.8}px)` }}
      />
      <div className="Parallax__content" width="4000">{renderContent()}</div>
    </section>
  );
}

export default Home;
