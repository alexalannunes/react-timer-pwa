import React, { useRef } from "react";
import audio from "../assets/Clear-Long-Bell-02.wav";
import { PauseIcon, PlayIcon } from "./Icons";
import styles from "./styles.module.scss";
import { useTimer } from "./timerContext";
import { toMMSS } from "./utils";

const Timer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { startTimer, pauseTimer, endTimer, started, paused, ended } =
    useTimer();

  return (
    <div className={styles.container}>
      <div className={styles.howToUse}>
        Tap to increment or decrement numbers
      </div>

      <div className={styles.containerActions}>
        <button onClick={startTimer}>start {started ? 1 : 0}</button>
        <button onClick={pauseTimer}>pause {paused ? 1 : 0}</button>
        <button onClick={endTimer}>end {ended ? 1 : 0}</button>

        <div data-testid="increase-minute" role="button" onClick={() => {}} />
        <div role="button" />
        <div role="button" />
        <div role="button" />
      </div>
      <button
        data-testid="btn-toggle-timer"
        data-action="btn-play"
        className={`${styles.button}`}
      >
        <PlayIcon size={50} />
      </button>
      <button
        data-testid="btn-toggle-timer"
        data-action="btn-pause"
        className={`${styles.button}`}
        style={{ marginLeft: 100 }}
      >
        <PauseIcon size={50} />
      </button>
      <span data-testid="timer-content">{toMMSS(0)}</span>
      <audio ref={audioRef} src={audio}></audio>
    </div>
  );
};

export default Timer;
