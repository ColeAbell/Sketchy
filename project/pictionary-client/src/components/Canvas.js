import React, { useRef, useEffect } from 'react'

function Canvas(props) {
  
  const canvasRef = useRef(null);
    
  useEffect(() => {
    function getLines(ctx, text, maxWidth) {
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];
        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let lines = getLines(ctx, props.txt, props.wide);
    let dashLen = 220; 
    let dashOffset = dashLen;
    let speed = props.speed;
    let txt = props.txt;
    let x = props.x; 
    let y = props.y;
    let i = 0;
    let bullet = false;
    const bulletFont = `${props.size + 5}px Comic Sans MS, cursive, TSCu_Comic, sans-serif`;
    let drawingBullet = false;
    ctx.font = `${props.size}px Comic Sans MS, cursive, TSCu_Comic, sans-serif`; 
    ctx.lineWidth = 5; ctx.lineJoin = "round"; ctx.globalAlpha = 2/3;
    ctx.strokeStyle = ctx.fillStyle = props.color;
    (function loop() {
        let measure = 0;
        if(txt[i] === "•" && i !== 0 && bullet === false){
            bullet = true;
            x = props.x;
            y += 92;
        }
        else if(i === 0 || txt[i-1] === " "){
            for(let q = i; q < txt.length && txt[q] !== " "; q++){
                measure += ctx.measureText(txt[q]).width + ctx.lineWidth * .7;
            }
            if(x + measure >= props.wide - 15 && txt[i] !== "•"){
                x = props.x;
                y += 62;
            }
        }
        ctx.clearRect(x, y - 50, 60, 150);
        ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
        dashOffset -= speed;                                         // reduce dash length
        ctx.strokeText(txt[i], x, y);                               // stroke letter
        if (dashOffset > 0 ) requestAnimationFrame(loop);             // animate
        else {
          ctx.fillText(txt[i], x, y);                       // fill final letter
          dashOffset = dashLen;                                      // prep next char
          x += ctx.measureText(txt[i++]).width + ctx.lineWidth * .7;
          ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
          ctx.rotate(Math.random() * 0.005);                      // random rotation
          bullet = false;                       
          if (i < txt.length) requestAnimationFrame(loop);
        }
    })();
    }, [])

    return (
        <div style={{marginTop: props.mTop, marginBottom: props.mBottom, paddingBottom: props.bottom, paddingTop: props.top, paddingLeft: props.left, paddingRight: props.right}}>   
            <canvas style={{ 
      backgroundImage: `url(${props.background})`
    }} WIDTH={props.wide} height={props.high} ref={canvasRef}></canvas>
    </div>
    )
}  
export default Canvas;