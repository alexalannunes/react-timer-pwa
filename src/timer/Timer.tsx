import React, { useEffect, useRef } from "react";
import audio from "../assets/Clear-Long-Bell-02.wav";
import { PauseIcon, PlayIcon } from "./Icons";
import styles from "./styles.module.scss";
import { useTimer } from "./timerContext";
import { toMMSS } from "./utils";

const Timer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    seconds,
    minutsUp,
    minutsDown,
    secondsDown,
    secondsUp,
    startTimer,
    pauseTimer,
    ended,
    started,
    paused,
  } = useTimer();

  useEffect(() => {
    if (ended) {
      audioRef.current?.play();
    }
  }, [ended]);

  return (
    <div className={styles.container}>
      {!started || ended ? (
        <h6 className={styles.howToUse}>
          Tap to increment or decrement numbers
        </h6>
      ) : null}

      <div className={styles.containerActions}>
        <div role="button" onClick={minutsUp} />
        <div role="button" onClick={secondsUp} />
        <div role="button" onClick={minutsDown} />
        <div role="button" onClick={secondsDown} />
      </div>
      {(!started || paused) && (
        <button
          data-testid="btn-toggle-timer"
          data-action="btn-play"
          className={`${styles.button}`}
          onClick={startTimer}
        >
          <PlayIcon size={50} />
        </button>
      )}
      {started && !ended && !paused && (
        <button
          data-testid="btn-toggle-timer"
          data-action="btn-pause"
          className={`${styles.button}`}
          onClick={pauseTimer}
        >
          <PauseIcon size={50} />
        </button>
      )}
      <span data-testid="timer-content">{toMMSS(seconds)}</span>
      <audio ref={audioRef} src={audio}></audio>
    </div>
  );
};

export default Timer;
