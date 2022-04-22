import { State } from "../types";

export interface Action {
  type:
    | "RESET_TIME"
    | "SET_TIME"
    | "INCREASE_MINUTE"
    | "DECREASE_MINUTE"
    | "INCREASE_SECOND"
    | "DECREASE_SECOND"
    | "START_TIMER"
    | "PAUSE_TIMER"
    | "END_TIMER";
  payload?: any;
}

export const timerReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "RESET_TIME":
      return {
        ...state,
        min: 0,
        sec: 0,
      };
    case "SET_TIME": {
      return {
        ...state,
        min: action.payload.min,
        sec: action.payload.sec,
      };
    }
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
    case "START_TIMER": {
      return {
        ...state,
        started: true,
      };
    }
    default:
      return state;
  }
};

export const startTimer = (): Action => ({
  type: "START_TIMER",
});

export const setTime = (payload: { min: number; sec: number }): Action => ({
  type: "SET_TIME",
  payload,
});

export const increaseMinute = (): Action => ({
  type: "INCREASE_MINUTE",
});

export const decreaseMinute = (): Action => ({
  type: "DECREASE_MINUTE",
});

export const increaseSecond = (): Action => ({
  type: "INCREASE_SECOND",
});

export const decreaseSecond = (): Action => ({
  type: "DECREASE_SECOND",
});
