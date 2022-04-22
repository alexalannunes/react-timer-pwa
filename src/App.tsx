import Timer from "./timer/Timer";
import { TimerProvider } from "./timer/timerContext";

function App() {
  return (
    <TimerProvider>
      <Timer />
    </TimerProvider>
  );
}

export default App;
