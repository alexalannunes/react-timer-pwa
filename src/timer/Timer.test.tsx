import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import Timer from "./Timer";
import { act } from "react-dom/test-utils";

describe("Timer", () => {
  jest.useFakeTimers();

  test("renders initial timer", () => {
    const { getByText } = render(<Timer />);
    const linkElement = getByText(/00:10/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("click on grid item to increase 1 minute", () => {
    const { getByTestId } = render(<Timer />);

    fireEvent.click(getByTestId("increase-minute"));
    expect(getByTestId("timer-content")).toHaveTextContent("01:10"); // initial state: 00:10
  });

  it("click on button to decrease 10seconds", () => {
    const { getByTestId } = render(<Timer />);
    fireEvent.click(getByTestId("btn-toggle-timer"));
    act(() => {
      jest.advanceTimersByTime(11 * 1000); //10+1
    });
    expect(getByTestId("timer-content")).toHaveTextContent(/00:00/);
  });
});
