import React, { useRef, useEffect } from "react";

const StarBackground = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use container's dimensions or force a viewport size
    const height = container.offsetHeight || window.innerHeight;
    const width = container.offsetWidth || window.innerWidth;

    // Setup canvas
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Draw small stars
    function smallStarCreate(starNumber, starSize) {
      for (let i = 0; i < starNumber; i++) {
        ctx.beginPath();
        const starLeft = Math.floor(Math.random() * width) + 1;
        const starTop = Math.floor(Math.random() * height) + 1;
        const colorVal01 = Math.floor(Math.random() * 106) + 150;
        const colorVal02 = Math.floor(Math.random() * 106) + 150;
        const opacityVal = Math.floor(Math.random() * 11) / 10;
        ctx.fillStyle = `rgba(${colorVal01}, ${colorVal02}, 255, ${opacityVal})`;
        ctx.fillRect(starLeft, starTop, starSize, starSize);
      }
    }
    smallStarCreate(200, 1);
    smallStarCreate(50, 2);

    // Draw big stars with radial gradient
    function bigStarCreate(starNumber, starSize) {
      for (let i = 0; i < starNumber; i++) {
        ctx.beginPath();
        const starLeft = Math.floor(Math.random() * width) + 1;
        const starTop = Math.floor(Math.random() * height) + 1;
        const colorVal01 = Math.floor(Math.random() * 106) + 150;
        const colorVal02 = Math.floor(Math.random() * 106) + 150;
        const opacityVal = Math.floor(Math.random() * 11) / 10;
        const radgrad = ctx.createRadialGradient(
          starLeft,
          starTop,
          0,
          starLeft,
          starTop,
          starSize
        );
        radgrad.addColorStop(0, "rgba(255, 255, 255, 1)");
        radgrad.addColorStop(
          1,
          `rgba(${colorVal01}, ${colorVal02}, 255, ${opacityVal})`
        );
        ctx.fillStyle = radgrad;
        ctx.arc(starLeft, starTop, starSize, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }
    bigStarCreate(10, 1);
    bigStarCreate(5, 2);

    // Convert canvas drawing to an image URL and set as background
    const sky = canvas.toDataURL("image/png");
    container.style.background = `url(${sky})`;
    container.style.backgroundSize = "cover";
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh", // Force full viewport height
        zIndex: -1, // Behind your other content
      }}
    >
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default StarBackground;
