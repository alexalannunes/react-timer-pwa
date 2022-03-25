export interface State {
  min: number;
  sec: number;
}

export const ActionTypes = {
  RESET_TIME: "RESET_TIME",
  SET_TIME: "SET_TIME",
  INCREASE_MINUTE: "INCREASE_MINUTE",
  DECREASE_MINUTE: "DECREASE_MINUTE",
  INCREASE_SECOND: "INCREASE_SECOND",
  DECREASE_SECOND: "DECREASE_SECOND",
} as const;

export interface Action {
  type:
    | "RESET_TIME"
    | "SET_TIME"
    | "INCREASE_MINUTE"
    | "DECREASE_MINUTE"
    | "INCREASE_SECOND"
    | "DECREASE_SECOND";
  payload?: any;
}

export const timerReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.RESET_TIME:
      return {
        ...state,
        min: 0,
        sec: 0, // store defined value
      };
    case ActionTypes.SET_TIME: {
      return {
        ...state,
        min: action.payload.min,
        sec: action.payload.sec,
      };
    }
    case ActionTypes.INCREASE_MINUTE:
      return {
        ...state,
        min: state.min + 1,
      };
    case ActionTypes.DECREASE_MINUTE:
      return {
        ...state,
        min: state.min - 1,
      };
    case ActionTypes.INCREASE_SECOND:
      return {
        ...state,
        sec: state.sec + 1,
      };
    case ActionTypes.DECREASE_SECOND:
      return {
        ...state,
        sec: state.sec - 1,
      };
    default:
      return state;
  }
};

export const setTime = (payload: { min: number; sec: number }): Action => ({
  type: ActionTypes.SET_TIME,
  payload,
});

export const increaseMinute = (): Action => ({
  type: ActionTypes.INCREASE_MINUTE,
});

export const decreaseMinute = (): Action => ({
  type: ActionTypes.DECREASE_MINUTE,
});

export const increaseSecond = (): Action => ({
  type: ActionTypes.INCREASE_SECOND,
});

export const decreaseSecond = (): Action => ({
  type: ActionTypes.DECREASE_SECOND,
});
