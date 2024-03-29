import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { StateContextType } from "../types";
import { removeBackgroundBody, setBackgroundBody, toSeconds } from "./utils";

const TimerContext = createContext<StateContextType>({
  timer: { min: 0, sec: 0 },
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

  const intervalRef = useRef<number>();

  const startTimer = () => {
    if (seconds === 0) {
      return;
    }
    dispatchStarted(true);
    dispatchEnded(false);
    if (paused) {
      dispatchPaused(false);
    }
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
    if (!started) {
      dispatchTimer((prev) => ({
        ...prev,
        min: prev.min + 1,
      }));
    }
  };

  const handleMinutesDown = () => {
    if (!started) {
      dispatchTimer((prev) => ({
        ...prev,
        min: prev.min - 1,
      }));
    }
  };

  const handleSecondsUp = () => {
    if (!started) {
      dispatchTimer((prev) => ({
        ...prev,
        sec: prev.sec + 1,
      }));
    }
  };

  const handleSecondsDown = () => {
    if (!started) {
      dispatchTimer((prev) => ({
        ...prev,
        sec: prev.sec - 1,
      }));
    }
  };

  const setSeconds = (seconds: number) => {
    dispatchSeconds(seconds);
  };

  const value = {
    seconds,
    timer,
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
    setSeconds(toSeconds(`${timer.min}:${timer.sec}`));
  }, [timer]);

  useEffect(() => {
    if (started && !paused) {
      intervalRef.current = window.setTimeout(() => {
        setSeconds(seconds - 1);
        console.log(seconds);
      }, 1000);
    }

    if (started && seconds <= 0) {
      endTimer();
      clearTimeout(intervalRef.current);
    }

    return () => clearTimeout(intervalRef.current);
  }, [seconds, started, paused]);

  useEffect(() => {
    if (paused) {
      intervalRef.current && clearTimeout(intervalRef.current);
    }
  }, [paused]);

  useEffect(() => {
    let endedTimeout: number;
    if (ended) {
      setBackgroundBody();
      endedTimeout = window.setTimeout(() => {
        removeBackgroundBody();
      }, 1000);
      setSeconds(0);
      dispatchTimer({
        min: 0,
        sec: 0,
      });
    } else {
      removeBackgroundBody();
    }
    return () => clearTimeout(endedTimeout);
  }, [ended]);

  useEffect(() => {
    if (timer.min < 0) {
      dispatchTimer((prev) => ({
        ...prev,
        min: 59,
      }));
      if (timer.sec === 0) {
        dispatchTimer({
          min: 59,
          sec: 0,
        });
      }
    }
    if (timer.sec < 0) {
      // todo
      //bug: 01:00 to 00:59
      // stay 01:59 (persist min)
      dispatchTimer((prev) => ({
        ...prev,
        sec: 59,
      }));
      if (timer.min === 0) {
        dispatchTimer({
          min: 59,
          sec: 59,
        });
      }
    }
    if (timer.min > 59) {
      dispatchTimer((prev) => ({
        ...prev,
        min: 0,
      }));
    }
  }, [timer]);

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};
