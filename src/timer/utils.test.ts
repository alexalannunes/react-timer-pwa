import { toMMSS, toSeconds } from "./utils";

describe("utils", () => {
  it("should convert to toMMSS", () => {
    const seconds = 60;
    expect(toMMSS(seconds)).toBe("01:00");
    expect(toMMSS(50)).toBe("00:50");
    expect(toMMSS(300)).toBe("05:00");
  });

  it("should convert mm:ss to seconds", () => {
    const time = "01:00";
    expect(toSeconds(time)).toBe(60);
    expect(toSeconds("00:40")).toBe(40);
    expect(toSeconds("05:00")).toBe(300);
  });
});
