import { describe, test, expect } from "vitest";
import { render, screen } from "./testUtils";
import Projects from "../components/Projects/Projects";

describe("Projects", () => {
  test("renders without crashing", () => {
    render(
      <Projects
        tagFilter={null}
        onClearTagFilter={() => {}}
        onTagClick={() => {}}
      />
    );
    expect(screen.getByText(/selected projects/i)).toBeInTheDocument();
  });

  test("renders project cards from data", () => {
    render(
      <Projects
        tagFilter={null}
        onClearTagFilter={() => {}}
        onTagClick={() => {}}
      />
    );
    const headings = screen.getAllByRole("heading", { level: 3 });
    const titles = headings.map((h) => h.textContent);
    expect(titles.length).toBeGreaterThan(0);
    expect(titles).toEqual(
      expect.arrayContaining(["Modern Luxury Villa", "LevelUp"])
    );
  });
});
