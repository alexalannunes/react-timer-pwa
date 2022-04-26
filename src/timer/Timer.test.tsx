import { render, screen } from "@testing-library/react";
import Timer from "./Timer";

test("first test", () => {
  render(<Timer />);
  expect(screen.getByRole("heading")).toBeInTheDocument();
});
