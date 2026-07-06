import { describe, test, expect, vi } from "vitest";
import { render, screen } from "./testUtils";
import userEvent from "@testing-library/user-event";
import Contact from "../components/Contact";

vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn().mockResolvedValue({}),
  },
  send: vi.fn().mockResolvedValue({}),
}));

describe("Contact", () => {
  test("renders without crashing", () => {
    render(<Contact />);
    expect(screen.getByText(/let's build/i)).toBeInTheDocument();
  });

  test("has accessible form fields", () => {
    render(<Contact />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
  });

  test("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    const buttons = screen.getAllByRole("button", { name: /send message/i });
    await user.click(buttons[0]);
    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Message is required.")).toBeInTheDocument();
  });
});
