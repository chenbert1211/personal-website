"use client";
import { useEffect, useRef } from "react";

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Set initial canvas dimensions.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = {};
    let starIndex = 0;
    let numStars = 0;
    const acceleration = 1;
    // Calculate how many stars to draw.
    let starsToDraw = (canvas.width * canvas.height) / 200;

    // Star constructor.
    function Star() {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.sx = Math.random() * 10 - 5;
      this.sy = Math.random() * 10 - 5;

      let start = canvas.width > canvas.height ? canvas.width : canvas.height;
      this.x += (this.sx * start) / 10;
      this.y += (this.sy * start) / 10;
      this.w = 1;
      this.h = 1;
      this.age = 0;
      this.dies = 500;
      starIndex++;
      stars[starIndex] = this;
      this.id = starIndex;
      this.c = "#ffffff";
    }

    // Draw method for Star.
    Star.prototype.draw = function () {
      this.x += this.sx;
      this.y += this.sy;
      // Accelerate the star.
      this.sx += this.sx / (50 / acceleration);
      this.sy += this.sy / (50 / acceleration);
      this.age++;

      // Increase star size at certain ages.
      if (
        this.age === Math.floor(50 / acceleration) ||
        this.age === Math.floor(150 / acceleration) ||
        this.age === Math.floor(300 / acceleration)
      ) {
        this.w++;
        this.h++;
      }

      // If the star is offscreen, remove it.
      if (
        this.x + this.w < 0 ||
        this.x > canvas.width ||
        this.y + this.h < 0 ||
        this.y > canvas.height
      ) {
        delete stars[this.id];
        numStars--;
      }

      ctx.fillStyle = this.c;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    };

    // Draw function to clear and update the canvas.
    function draw() {
      // Update canvas dimensions if the window changes.
      if (canvas.width !== window.innerWidth) canvas.width = window.innerWidth;
      if (canvas.height !== window.innerHeight) canvas.height = window.innerHeight;

      // Clear the canvas with a semi-transparent black rectangle.
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create new stars if needed.
      for (let i = numStars; i < starsToDraw; i++) {
        new Star();
        numStars++;
      }

      // Draw all stars.
      for (let key in stars) {
        if (stars.hasOwnProperty(key)) {
          stars[key].draw();
        }
      }
    }

    // Run the draw loop every 40ms.
    const intervalId = setInterval(draw, 40);

    // Update canvas size on window resize.
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsToDraw = (canvas.width * canvas.height) / 200;
    };
    window.addEventListener("resize", handleResize);

    // Clean up on unmount.
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default Starfield;
