import {
  decreaseMinute,
  decreaseSecond,
  increaseMinute,
  increaseSecond,
  timerReducer,
} from "./timerReducer";

describe("timerReducer", () => {
  it("should reset time to 00:00", () => {
    const inital = {
      min: 10,
      sec: 10,
    };
    const expected = {
      min: 0,
      sec: 0,
    };
    const state = timerReducer(inital, {
      type: "RESET_TIME",
    });
    expect(state).toEqual(expected);
  });

  it("should set time to 10:10", () => {
    const inital = {
      min: 0,
      sec: 0,
    };
    const expected = {
      min: 10,
      sec: 10,
    };
    const state = timerReducer(inital, {
      type: "SET_TIME",
      payload: { min: 10, sec: 10 },
    });
    expect(state).toEqual(expected);
  });

  it("should increase minute", () => {
    expect(increaseMinute()).toEqual({ type: "INCREASE_MINUTE" });
  });
  it("should descrease minute", () => {
    expect(decreaseMinute()).toEqual({ type: "DECREASE_MINUTE" });
  });
  it("should increase second", () => {
    expect(increaseSecond()).toEqual({ type: "INCREASE_SECOND" });
  });
  it("should decrease second", () => {
    expect(decreaseSecond()).toEqual({ type: "DECREASE_SECOND" });
  });
});
