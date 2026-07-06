import { describe, test, expect, vi } from "vitest";
import { render, screen } from "./testUtils";
import ErrorBoundary from "../components/ErrorBoundary";

function ThrowComponent() {
  throw new Error("Intentional test error");
}

function SafeComponent() {
  return <p>All good</p>;
}

describe("ErrorBoundary", () => {
  test("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  test("catches errors and shows fallback UI", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ThrowComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reload page/i })).toBeInTheDocument();
    spy.mockRestore();
  });

  test("fallback has alert role", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ThrowComponent />
      </ErrorBoundary>
    );
    expect(screen.getAllByRole("alert").length).toBeGreaterThanOrEqual(1);
    spy.mockRestore();
  });
});
