import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);
  const [LapCount, setLapCount] = useState(1);
  let lapdiv = document.getElementById("lapdiv");

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function Start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function Stop() {
    setIsRunning(false);
  }

  function Reset() {
    setElapsedTime(0);
    setIsRunning(false);
    setLapCount(1);
    lapdiv.replaceChildren();
  }

  function Lap() {
    setLapCount((prevLap) => prevLap + 1);
    let pip = document.createElement("p");
    pip.textContent = `LAP ${LapCount} : ${formatTime()}`;
    lapdiv.prepend(pip);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    return `${String(hours).padStart(2, 0)}:${String(minutes).padStart(
      2,
      0
    )}:${String(seconds).padStart(2, 0)}:${String(milliseconds).padStart(
      2,
      0
    )}`;
  }

  return (
    <>
      <p className="headp">STOP WATCH</p>

      <div className="maindiv">
        <p className="timerp">{formatTime()}</p>
        <div className="btndiv">
          <button className="startbtn" onClick={Start}>
            START
          </button>
          <button className="stopbtn" onClick={Stop}>
            STOP
          </button>
          <button className="resetbtn" onClick={Reset}>
            RESET
          </button>
          <button className="lapbtn" onClick={Lap}>
            LAP
          </button>
        </div>
      </div>
      <div id="lapdiv"></div>
    </>
  );
}

export default Stopwatch;
