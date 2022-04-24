export const toMMSS = function (seconds: number) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - hours * 3600) / 60);
  var sec = seconds - hours * 3600 - minutes * 60;

  return `${String(minutes).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

export const toSeconds = (time: string) => {
  return time.split(":").reduce((acc, time) => {
    return 60 * acc + +time;
  }, 0);
};

export const setBackgroundBody = () => {
  document.body.classList.add("timer-ended");
};

export const removeBackgroundBody = () => {
  document.body.classList.remove("timer-ended");
};
