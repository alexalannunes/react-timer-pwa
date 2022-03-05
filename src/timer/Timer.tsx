import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
const toTime = (seconds: number) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const toSeconds = (time: string) => {
  const [m, s] = time.split(":");
  // return String(m).padStart(2, '0')+':'+String(s).padStart(2, '0');
  return time.split(":").reduce((acc, time) => {
    return 60 * acc + +time;
  }, 0);
};

const Timer: React.FC = () => {
  const [time, setTime] = useState({
    min: 0,
    sec: 0,
  });
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(toSeconds(`${time.min}:${time.sec}`));
  }, [time]);

  const handleMinutesUp = useCallback(() => {
    setTime((p) => ({
      ...p,
      min: p.min + 1,
    }));
  }, [time.min]);

  const handleSecondsUp = useCallback(() => {
    setTime((p) => ({
      ...p,
      sec: p.sec + 1,
    }));
  }, [time.sec]);
  const handleMinutesDown = useCallback(() => {
    setTime((p) => ({
      ...p,
      min: p.min - 1,
    }));
  }, [time.min]);
  const handleSecondsDown = useCallback(() => {
    setTime((p) => ({
      ...p,
      sec: p.sec - 1,
    }));
  }, [time.sec]);

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
      <span>{toTime(seconds)}</span>
    </div>
  );
};

export default Timer;
