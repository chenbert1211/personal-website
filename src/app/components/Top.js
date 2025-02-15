"use client";

import Image from "next/image";
import About from "./top-components/About";
import { useEffect, useRef } from "react";

export default function Top() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const getUrlParameter = function (sParam) {
      const sPageURL = decodeURIComponent(window.location.search.substring(1));
      const sURLVariables = sPageURL.split('&');
      let sParameterName;

      for (let i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
        }
      }
    };

    let stars = {};
    let starIndex = 0;
    let numStars = 0;
    let acceleration = 1;
    let starsToDraw = (canvas.width * canvas.height) / 200;

    if (getUrlParameter("stars")) {
      starsToDraw = getUrlParameter("stars");
    }
    if (getUrlParameter("accel")) {
      acceleration = getUrlParameter("accel");
    }

    function Star() {
      this.X = canvas.width / 2;
      this.Y = canvas.height / 2;

      this.SX = Math.random() * 10 - 5;
      this.SY = Math.random() * 10 - 5;

      let start = 0;

      if (canvas.width > canvas.height) {
        start = canvas.width;
      } else {
        start = canvas.height;
      }

      this.X += this.SX * start / 10;
      this.Y += this.SY * start / 10;

      this.W = 1;
      this.H = 1;

      this.age = 0;
      this.dies = 500;

      starIndex++;
      stars[starIndex] = this;

      this.ID = starIndex;
      this.C = "#ffffff";
    }

    Star.prototype.Draw = function () {
      this.X += this.SX;
      this.Y += this.SY;

      this.SX += this.SX / (50 / acceleration);
      this.SY += this.SY / (50 / acceleration);

      this.age++;

      if (this.age == Math.floor(50 / acceleration) || this.age == Math.floor(150 / acceleration) || this.age == Math.floor(300 / acceleration)) {
        this.W++;
        this.H++;
      }

      if (this.X + this.W < 0 || this.X > canvas.width || this.Y + this.H < 0 || this.Y > canvas.height) {
        delete stars[this.ID];
        numStars--;
      }

      ctx.fillStyle = this.C;
      ctx.fillRect(this.X, this.Y, this.W, this.H);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function draw() {
      if (canvas.width != window.innerWidth) {
        canvas.width = window.innerWidth;
      }
      if (canvas.height != window.innerHeight) {
        canvas.height = window.innerHeight;
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = numStars; i < starsToDraw; i++) {
        new Star();
        numStars++;
      }

      for (let star in stars) {
        stars[star].Draw();
      }
    }

    const interval = setInterval(draw, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-section">
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }} />
      <div className="profile-pic">
        <Image
          className="profile-pic1"
          src='/PP.jpg'
          alt='profile'
          layout="fill"
          objectFit="cover"
        />
      </div>
      <About />
    </div>
  );
}