import React, { ReactNode, useEffect, useRef } from "react";
import audio from "../assets/Clear-Long-Bell-02.wav";
import { ButtonRounded } from "../components/button";
import styles from "./styles.module.scss";
import { useTimer } from "./timerContext";
import { toMMSS } from "./utils";

const CenterButton: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "fixed",
      left: "50%",
      bottom: 40,
      transform: "translateX(-50%)",
      zIndex: 1,
    }}
  >
    {children}
  </div>
);

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
        <CenterButton>
          <ButtonRounded icon="play" onClick={startTimer} />
        </CenterButton>
      )}
      {started && !ended && !paused && (
        <CenterButton>
          <ButtonRounded icon="pause" onClick={pauseTimer} />
        </CenterButton>
      )}
      <span data-testid="timer-content">{toMMSS(seconds)}</span>
      <audio ref={audioRef} src={audio}></audio>
    </div>
  );
};

export default Timer;
