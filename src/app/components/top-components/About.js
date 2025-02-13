"use client";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";
import ReplayIcon from "@mui/icons-material/Replay";

const About = () => {
  const crawlRef = useRef(null);
  const animationRef = useRef(null);
  const audioRef = useRef(null); // reference for the audio element
  const [isPaused, setIsPaused] = useState(false);
  const [isNormal, setIsNormal] = useState(true); // Normal text shows by default on load
  const [animationKey, setAnimationKey] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Retrieve the Web Animation from the crawl element.
  useEffect(() => {
    if (crawlRef.current) {
      const animations = crawlRef.current.getAnimations();
      if (animations && animations.length > 0) {
        animationRef.current = animations[0];
        // When the animation finishes, switch to normal text mode.
        animationRef.current.onfinish = () => {
          setIsNormal(true);
        };
      }
    }
  }, [animationKey]);

  // Control the audio playback based on animation play state.
  useEffect(() => {
    if (audioRef.current && hasInteracted) {
      if (!isPaused && !isNormal) {
        audioRef.current
          .play()
          .catch((err) => console.error("Audio play error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPaused, isNormal, hasInteracted]);

  // Toggle pause/resume (only when not in normal mode).
  const togglePause = () => {
    if (isNormal) return; // do nothing in normal mode
    if (!hasInteracted) setHasInteracted(true);
    if (!animationRef.current) return;
    if (isPaused) {
      animationRef.current.play();
      setIsPaused(false);
    } else {
      animationRef.current.pause();
      setIsPaused(true);
    }
  };

  // Handle the wheel event on the about-me container.
  const handleWheel = (e) => {
    if (isNormal) return; // Disable scroll control in normal mode.
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

  // Also attach a wheel handler directly to the crawl element.
  useEffect(() => {
    const crawlElement = crawlRef.current;
    if (!crawlElement) return;
    const wheelHandler = (e) => {
      if (isNormal) return; // Don't process scroll if in normal mode.
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
  }, [isPaused, isNormal]);

  // Skip to normal (static) text: cancel the animation and show text normally.
  const skipToNormal = (e) => {
    e.stopPropagation();
    if (animationRef.current) {
      animationRef.current.cancel();
    }
    setIsNormal(true);
  };

  // Replay the crawl animation: reset states, restart the animation, and reset & play the audio.
  const replayAnimation = (e) => {
    e.stopPropagation();
    if (animationRef.current) {
      animationRef.current.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 10; // Start audio at 10 seconds
    }
    setAnimationKey((prev) => prev + 1);
    setIsPaused(false);
    setIsNormal(false);
    setHasInteracted(true);
    
    // Explicitly play the audio with the crawl.
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.error("Error playing audio:", err));
    }
  };

  return (
    <div
      className={`about-me ${isNormal ? "normal" : ""}`}
      onClick={!isNormal ? togglePause : undefined}
      onWheel={!isNormal ? handleWheel : undefined}
    >
      {/* Audio element that plays with the crawl animation */}
      <audio ref={audioRef} preload="auto" style={{ display: "none" }}>
        <source
          src="https://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.ogg"
          type="audio/ogg"
        />
        <source
          src="https://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.mp3"
          type="audio/mpeg"
        />
      </audio>
      {/* Hide the fade overlay in normal mode */}
      {!isNormal && <div className="fade"></div>}
      <section className="star-wars">
        <div
          key={animationKey}
          ref={crawlRef}
          className={`crawl ${isNormal ? "normal" : "animated"}`}
          style={{ cursor: "pointer" }}
        >
          {!isNormal ? (
            <>
              <div className="title">
                <h1>EPISODE XXVI:</h1>
                <h1>A NEW HOPE IN CODE</h1>
              </div>
              <p>
                In a bustling corner of the galaxy known as MANHATTAN, a young
                hero’s tale begins. Born to immigrant warriors who braved storms
                and sacrifice to forge a new life, their journey was written in
                grit and hope. From pixelated video game battles to blockbuster
                movie marathons, the Force of imagination burned bright—but so
                did a deeper call: DUTY.
              </p>
              <p>
                At 18, answering the pull of patriotism, they enlisted in Earth’s
                REBEL ARMED FORCES, mastering discipline, resilience, and the art
                of teamwork. Yet as their service neared its end, a cosmic question
                lingered: “What now?”
              </p>
              <p>
                Then, like a hyperdrive jump to lightspeed, inspiration struck.
                ELON, THE TECH JEDI, emerged from the Silicon Nebula, preaching a
                new gospel: “Code is the ultimate weapon for galactic good.” The
                path blazed clear—COMPUTER SCIENCE, humanity’s shield and sword.
              </p>
              <p>
                Now, at the UNIVERSITY OF HOUSTON ACADEMY, they train relentlessly.
                By day, battling Python dragons and algorithm asteroids. By night,
                dreaming of tech that uplifts planets and connects civilizations.
                The mission? To advance humanity, one line of code—and one Star Wars
                meme—at a time.
              </p>
            </>
          ) : (
            <>
              <div className="title">
                <h1>The Human Behind the Screen</h1>
              </div>
              <p>
                I enjoy spending time with family, outdoor activities, and working
                on cool coding projects.
              </p>
              <p>
                The reason I decided to pursue Computer Science is in hopes to help
                people and advance humanity.
              </p>
            </>
          )}
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
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                togglePause();
              }}
            >
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
