import { describe, test, expect } from "vitest";
import { render, screen } from "./testUtils";
import Hero from "../components/Hero";

describe("Hero", () => {
  test("renders without crashing", () => {
    render(<Hero />);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });

  test("displays name", () => {
    render(<Hero />);
    const ziad = screen.getAllByText((c) => c.includes("Ziad"));
    const amr = screen.getAllByText((c) => c.includes("Amr"));
    expect(ziad.length).toBeGreaterThan(0);
    expect(amr.length).toBeGreaterThan(0);
  });

  test("View Projects CTA links to contact", () => {
    render(<Hero />);
    const links = screen.getAllByRole("link");
    const viewLink = links.find((l) => l.textContent.includes("View Projects"));
    expect(viewLink).toBeTruthy();
    expect(viewLink).toHaveAttribute("href", "#projects");
  });

  test("Download CV link has download attribute", () => {
    render(<Hero />);
    const links = screen.getAllByRole("link");
    const cvLink = links.find((l) => l.textContent.includes("Download CV"));
    expect(cvLink).toBeTruthy();
    expect(cvLink).toHaveAttribute("download");
    expect(cvLink).toHaveAttribute("href");
  });

  test("social links are present", () => {
    render(<Hero />);
    const links = screen.getAllByRole("link");
    const socialHrefs = [
      "linkedin.com/in/ziadamrsaid",
      "github.com/Ziad-Amr1",
      "dribbble.com/ZiadAmrSaid",
    ];
    const found = links.filter((l) =>
      socialHrefs.some((h) => l.getAttribute("href")?.includes(h))
    );
    expect(found.length).toBeGreaterThanOrEqual(3);
  });
});
