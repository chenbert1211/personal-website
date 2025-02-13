"use client";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import ReplayIcon from "@mui/icons-material/Replay";
import StarBackground from "./StarBackground";

const About = () => {
  const crawlRef = useRef(null);
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isNormal, setIsNormal] = useState(false); // state for normal (static) text mode
  const [animationKey, setAnimationKey] = useState(0);

  // Retrieve the Web Animation from the crawl element.
  useEffect(() => {
    if (crawlRef.current) {
      const animations = crawlRef.current.getAnimations();
      if (animations && animations.length > 0) {
        animationRef.current = animations[0];
      }
    }
  }, [animationKey]);

  // Toggle pause/resume (only when not in normal mode).
  const togglePause = () => {
    if (isNormal) return; // do nothing in normal mode
    if (!animationRef.current) return;
    if (isPaused) {
      animationRef.current.play();
      setIsPaused(false);
    } else {
      animationRef.current.pause();
      setIsPaused(true);
    }
  };

  // Handle the wheel event to adjust the animation's currentTime (only active when paused and not in normal mode).
  const handleWheel = (e) => {
    if (isNormal) return;
    if (!isPaused || !animationRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const factor = 5; // adjust scroll sensitivity if needed
    let currentTime = animationRef.current.currentTime || 0;
    currentTime += e.deltaY * factor;
    if (currentTime < 0) currentTime = 0;
    if (currentTime > 60000) currentTime = 60000; // 60s = 60000ms
    animationRef.current.currentTime = currentTime;
  };

  // Also attach wheel handler directly to the crawl element (as before)
  useEffect(() => {
    const crawlElement = crawlRef.current;
    if (!crawlElement) return;
    const wheelHandler = (e) => {
      if (!isPaused || !animationRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      const factor = 5;
      let currentTime = animationRef.current.currentTime || 0;
      currentTime += e.deltaY * factor;
      if (currentTime < 0) currentTime = 0;
      if (currentTime > 60000) currentTime = 60000;
      animationRef.current.currentTime = currentTime;
    };
    crawlElement.addEventListener("wheel", wheelHandler, { passive: false });
    return () => crawlElement.removeEventListener("wheel", wheelHandler);
  }, [isPaused]);

  // Skip to normal (static) text: cancel the animation and show text normally.
  const skipToNormal = (e) => {
    e.stopPropagation();
    if (animationRef.current) {
      animationRef.current.cancel();
    }
    setIsNormal(true);
  };

  // Replay the crawl animation: reset states and restart the animation.
  const replayAnimation = (e) => {
    e.stopPropagation();
    if (animationRef.current) {
      animationRef.current.cancel();
    }
    setAnimationKey((prev) => prev + 1);
    setIsPaused(false);
    setIsNormal(false);
  };

  return (
    <div
      className="about-me"
      onClick={!isNormal ? togglePause : undefined}
      onWheel={!isNormal ? handleWheel : undefined}
    >
      <StarBackground />
      <div className="fade"></div>
      <section className="star-wars">
        <div
          key={animationKey}
          ref={crawlRef}
          className={`crawl ${isNormal ? "normal" : "animated"}`}
          style={{ cursor: "pointer" }}
        >
          <div className="title">
            <p>Episode IV</p>
            <h1>A New Hope</h1>
          </div>
          <p>
            It is a period of civil war. Rebel spaceships, striking from a hidden base,
            have won their first victory against the evil Galactic Empire.
          </p>
          <p>
            During the battle, Rebel spies managed to steal secret plans to the Empire’s
            ultimate weapon, the DEATH STAR, an armored space station with enough power to
            destroy an entire planet.
          </p>
          <p>
            Pursued by the Empire’s sinister agents, Princess Leia races home aboard her
            starship, custodian of the stolen plans that can save her people and restore
            freedom to the galaxy….
          </p>
        </div>
      </section>
      {/* Control Buttons positioned on the right of the crawl text */}
      <div className="buttons">
        {isNormal ? (
          // In normal mode, the play/pause button becomes a replay button.
          <IconButton onClick={replayAnimation}>
            <ReplayIcon fontSize="large" />
          </IconButton>
        ) : (
          <>
            <IconButton onClick={(e) => { e.stopPropagation(); togglePause(); }}>
              {isPaused ? (
                <PlayArrowIcon fontSize="large" />
              ) : (
                <PauseIcon fontSize="large" />
              )}
            </IconButton>
            <IconButton onClick={skipToNormal}>
              <FastForwardIcon fontSize="large" />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};

export default About;
