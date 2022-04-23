import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { StateContextType } from "../types";
import { toSeconds } from "./utils";

const TimerContext = createContext<StateContextType>({
  min: 0,
  sec: 0,
  seconds: 10,
  started: false,
  ended: false,
  paused: false,
  startTimer: () => {},
  pauseTimer: () => {},
  endTimer: () => {},
  setSeconds: (seconds) => {},
  minutsUp: () => {},
  minutsDown: () => {},
  secondsUp: () => {},
  secondsDown: () => {},
});

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [seconds, dispatchSeconds] = useState(10);
  const [timer, dispatchTimer] = useState({
    min: 0,
    sec: 0,
  });
  const [started, dispatchStarted] = useState(false);
  const [paused, dispatchPaused] = useState(false);
  const [ended, dispatchEnded] = useState(false);

  const startTimer = () => {
    dispatchStarted(true);
    dispatchEnded(false);
  };
  const pauseTimer = () => {
    dispatchPaused(true);
  };
  const endTimer = () => {
    dispatchEnded(true);
    dispatchStarted(false);
    dispatchPaused(false);
  };

  const handleMinutesUp = () => {
    dispatchTimer((prev) => ({
      ...prev,
      min: prev.min + 1,
    }));
  };

  const handleMinutesDown = () => {
    dispatchTimer((prev) => ({
      ...prev,
      min: prev.min - 1,
    }));
  };

  const handleSecondsUp = () => {
    dispatchTimer((prev) => ({
      ...prev,
      sec: prev.sec + 1,
    }));
  };

  const handleSecondsDown = () => {
    dispatchTimer((prev) => ({
      ...prev,
      sec: prev.sec - 1,
    }));
  };

  const setSeconds = (seconds: number) => {
    dispatchSeconds(seconds);
  };

  const value = {
    seconds,
    min: timer.min,
    sec: timer.sec,
    started,
    ended,
    paused,
    startTimer,
    pauseTimer,
    endTimer,
    setSeconds,
    minutsUp: handleMinutesUp,
    minutsDown: handleMinutesDown,
    secondsUp: handleSecondsUp,
    secondsDown: handleSecondsDown,
  };

  useEffect(() => {
    setSeconds(Math.abs(toSeconds(`${timer.min}:${timer.sec}`)));
  }, [timer]);

  useEffect(() => {
    let interval: number;

    if (started) {
      interval = window.setTimeout(() => {
        setSeconds(seconds - 1);
        console.log(seconds);
      }, 1000);
    }

    return () => clearTimeout(interval);
  }, [seconds, started]);

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};
