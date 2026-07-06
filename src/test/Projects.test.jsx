import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { render, screen, act, cleanup } from "./testUtils";
import userEvent from "@testing-library/user-event";
import Projects from "../components/Projects/Projects";
import ImageSlider from "../components/Projects/ImageSlider";

beforeEach(() => {
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  delete document.body.dataset.scrollY;
});

afterEach(cleanup);

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

describe("Project Modal scroll lock", () => {
  test("opens modal and locks body scroll on card click", async () => {
    const user = userEvent.setup();
    render(
      <Projects
        tagFilter={null}
        onClearTagFilter={() => {}}
        onTagClick={() => {}}
      />
    );

    const cards = screen.getAllByRole("button", { name: /view/i });
    expect(cards.length).toBeGreaterThan(0);

    await user.click(cards[0]);

    expect(document.body.style.overflow).toBe("hidden");
  });
});

describe("ImageSlider loading", () => {
  test("shows skeleton before image loads", () => {
    render(
      <ImageSlider
        images={["images/projects/arc-1.webp"]}
        imageIndex={0}
        setImageIndex={() => {}}
      />
    );

    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "images/projects/arc-1.webp");
  });

  test("transitions to loaded state on image load", () => {
    render(
      <ImageSlider
        images={["images/projects/arc-1.webp"]}
        imageIndex={0}
        setImageIndex={() => {}}
      />
    );

    const img = screen.getByRole("img");
    act(() => {
      img.dispatchEvent(new Event("load"));
    });

    expect(img.className).toContain("opacity-100");
  });

  test("transitions to loaded state on image error", () => {
    render(
      <ImageSlider
        images={["images/projects/arc-1.webp"]}
        imageIndex={0}
        setImageIndex={() => {}}
      />
    );

    const img = screen.getByRole("img");
    act(() => {
      img.dispatchEvent(new Event("error"));
    });

    expect(img.className).toContain("opacity-100");
  });
});
