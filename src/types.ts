export interface State {
  min: number;
  sec: number;
  seconds: number;
  started: boolean;
  paused: boolean;
  ended: boolean;
}

export interface StateContextType extends State {
  startTimer: () => void;
  pauseTimer: () => void;
  endTimer: () => void;
  setSeconds: (seconds: number) => void;
  minutsUp: () => void;
  minutsDown: () => void;
  secondsUp: () => void;
  secondsDown: () => void;
}
