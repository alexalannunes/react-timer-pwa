import React, {
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { PauseIcon, PlayIcon } from "./Icons";
import {
  Action,
  decreaseMinute,
  decreaseSecond,
  increaseMinute,
  increaseSecond,
  setTime,
  State,
  timerReducer,
} from "./timerReducer";
import { toMMSS, toSeconds } from "./utils";
import styles from "./styles.module.scss";
import audio from "../assets/Clear-Long-Bell-02.wav";

function wavesEffect(event: any) {
  const button = event.nativeEvent.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

const Timer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [time, dispatch] = useReducer<Reducer<State, Action>>(timerReducer, {
    min: 0,
    sec: 10,
  });
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setSeconds(toSeconds(`${time.min}:${time.sec}`));
  }, [time, started]);

  const handleMinutesUp = useCallback(
    (event) => {
      wavesEffect(event);
      if (!started) {
        dispatch(increaseMinute());
      }
    },
    [started]
  );

  const handleSecondsUp = useCallback(
    (event) => {
      wavesEffect(event);

      if (!started) {
        dispatch(increaseSecond());
      }
    },
    [started]
  );
  const handleMinutesDown = useCallback(
    (event) => {
      wavesEffect(event);

      if (!started) {
        dispatch(decreaseMinute());
      }
    },
    [started]
  );
  const handleSecondsDown = useCallback(
    (event) => {
      wavesEffect(event);

      if (!started) {
        dispatch(decreaseSecond());
      }
    },
    [started]
  );

  const handleStart = useCallback(() => {
    setStarted(!started);
  }, [started]);

  useEffect(() => {
    if (time.sec < 0) {
      dispatch(setTime({ min: 59, sec: 59 }));
    }
    if (time.min < 0) {
      dispatch(setTime({ min: 59, sec: 0 }));
    }
  }, [time]);

  useEffect(() => {
    let timeoutInstance: number;
    if (started) {
      timeoutInstance = window.setTimeout(() => {
        setSeconds((seconds) => seconds - 1);

        if (seconds <= 0) {
          dispatch(setTime({ min: 0, sec: 10 })); //store this
          setStarted(false);
          audioRef.current?.play();
          document.body.classList.add("dark");
          setTimeout(() => {
            document.body.classList.remove("dark");
          }, 1200);
        }
      }, 1000);
    }

    return () => {
      timeoutInstance && clearTimeout(timeoutInstance);
    };
  }, [seconds, started]);

  return (
    <div className={styles.container}>
      <div>Tap to increment or decrement numbers</div>
      <div className={styles.containerActions}>
        <div
          data-testid="increase-minute"
          role="button"
          onClick={handleMinutesUp}
        />
        <div role="button" onClick={handleSecondsUp} />
        <div role="button" onClick={handleMinutesDown} />
        <div role="button" onClick={handleSecondsDown} />
      </div>
      <button
        data-testid="btn-toggle-timer"
        onClick={handleStart}
        className={`${styles.button} ${
          started
            ? styles.timerState__Started
            : styles.timerState__PausedNotStarted
        }`}
      >
        {started ? <PauseIcon size={50} /> : <PlayIcon size={50} />}
      </button>
      <span
        className={`${styles.timerSeconds} ${
          started
            ? styles.timerState__Started
            : styles.timerState__PausedNotStarted
        }`}
        data-testid="timer-content"
      >
        {toMMSS(seconds)}
      </span>
      <audio ref={audioRef} src={audio}></audio>
    </div>
  );
};

export default Timer;
