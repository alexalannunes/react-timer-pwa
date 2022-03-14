import React, {
  FC,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.scss";
import audio from "../assets/Clear-Long-Bell-02.wav";

interface IconProps {
  size?: number;
  color?: string;
}

const PauseIcon: FC<IconProps> = ({ size = 24, color = "#000000" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: `${size}px`, width: `${size}px` }}
    height={24}
    width={24}
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const PlayIcon: FC<IconProps> = ({ size = 24, color = "#000000" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: `${size}px`, width: `${size}px` }}
    height={24}
    width={24}
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
  </svg>
);

const toTime = (seconds: number) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

interface State {
  min: number;
  sec: number;
}

interface Action {
  type:
    | "RESET_TIME"
    | "INCREASE_MINUTE"
    | "DECREASE_MINUTE"
    | "INCREASE_SECOND"
    | "DECREASE_SECOND";
  payload?: any;
}

const timerReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "RESET_TIME":
      return {
        ...state,
        min: 0,
        sec: action.payload, // action.payload,
      };
    case "INCREASE_MINUTE":
      return {
        ...state,
        min: state.min + 1,
      };
    case "DECREASE_MINUTE":
      return {
        ...state,
        min: state.min - 1,
      };
    case "INCREASE_SECOND":
      return {
        ...state,
        sec: state.sec + 1,
      };
    case "DECREASE_SECOND":
      return {
        ...state,
        sec: state.sec - 1,
      };
    default:
      return state;
  }
};

const toSeconds = (time: string) => {
  return time.split(":").reduce((acc, time) => {
    return 60 * acc + +time;
  }, 0);
};

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
  }, [time]);

  const handleMinutesUp = useCallback(() => {
    if (!started) {
      dispatch({
        type: "INCREASE_MINUTE",
      });
    }
  }, [started]);

  const handleSecondsUp = useCallback(() => {
    if (!started) {
      dispatch({
        type: "INCREASE_SECOND",
      });
    }
  }, [started]);
  const handleMinutesDown = useCallback(() => {
    if (!started) {
      dispatch({
        type: "DECREASE_MINUTE",
      });
    }
  }, [started]);
  const handleSecondsDown = useCallback(() => {
    if (!started) {
      dispatch({
        type: "DECREASE_SECOND",
      });
    }
  }, [started]);

  const handleStart = useCallback(() => {
    setStarted(!started);
  }, [started]);

  useEffect(() => {
    let a: number;
    if (started) {
      a = window.setTimeout(() => {
        setSeconds((seconds) => seconds - 1);

        if (seconds <= 0) {
          dispatch({ type: "RESET_TIME", payload: 4 });
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
      a && clearTimeout(a);
    };
  }, [seconds, started]);

  return (
    <div className={styles.container}>
      <div className={styles.containerActions}>
        <div role="button" onClick={handleMinutesUp}>
          1
        </div>
        <div role="button" onClick={handleSecondsUp}>
          2
        </div>
        <div role="button" onClick={handleMinutesDown}>
          3
        </div>
        <div role="button" onClick={handleSecondsDown}>
          4
        </div>
      </div>
      <button
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
      >
        {toTime(seconds)}
      </span>
      <audio ref={audioRef} src={audio}></audio>
    </div>
  );
};

export default Timer;
