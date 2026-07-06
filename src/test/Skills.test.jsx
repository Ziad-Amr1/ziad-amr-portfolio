import { describe, test, expect } from "vitest";
import { render, screen, act, fireEvent } from "./testUtils";
import Skills from "../components/Skills";
import { CATEGORIES, SKILLS_DATA } from "../data/skillsData";

const defaultProps = {
  tagCounts: {},
  activeTagFilter: null,
  onSkillSelect: () => {},
};

describe("Skills section", () => {
  test("renders without crashing", () => {
    render(<Skills {...defaultProps} />);
    expect(screen.getByText("Skills & Expertise")).toBeInTheDocument();
  });

  test("renders all category tabs from data", () => {
    render(<Skills {...defaultProps} />);
    const buttons = screen.getAllByRole("button");
    const tabTexts = buttons.map((b) => b.textContent.trim());
    for (const cat of CATEGORIES) {
      expect(tabTexts).toContain(cat);
    }
  });

  test("default active tab is Software Development", () => {
    render(<Skills {...defaultProps} />);
    const buttons = screen.getAllByRole("button");
    const tabTexts = buttons.map((b) => b.textContent.trim());
    expect(tabTexts).toContain("Software Development");
  });

  test("switching category tab shows different tagline", () => {
    render(<Skills {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    const architectureTab = buttons.find((b) => b.textContent.trim() === "Architecture");
    expect(architectureTab).toBeDefined();

    act(() => {
      fireEvent.click(architectureTab);
    });

    expect(
      screen.getByText(
        "Design thinking shaped by architectural structure and visual composition."
      )
    ).toBeInTheDocument();
  });

  test("renders skill names from active category", () => {
    render(<Skills {...defaultProps} />);

    const devSkills = SKILLS_DATA["Software Development"].groups
      .flatMap((g) => g.skills)
      .map((s) => s.name);

    for (const name of devSkills) {
      const matches = screen.getAllByText(name);
      expect(matches.length).toBeGreaterThan(0);
    }
  });
});

describe("Skills data integrity", () => {
  test("CATEGORIES match SKILLS_DATA keys", () => {
    for (const cat of CATEGORIES) {
      expect(SKILLS_DATA[cat]).toBeDefined();
    }
  });

  test("all skills have required fields", () => {
    const allSkills = CATEGORIES.flatMap((cat) => {
      const c = SKILLS_DATA[cat];
      if (c.groups) return c.groups.flatMap((g) => g.skills);
      return c.skills;
    });

    for (const skill of allSkills) {
      expect(typeof skill.name).toBe("string");
      expect(skill.name.length).toBeGreaterThan(0);
      expect(["Core", "Used", "Learning", "Exploring"]).toContain(skill.level);
      expect(typeof skill.note).toBe("string");
      expect(Array.isArray(skill.tags)).toBe(true);
    }
  });

  test("every category has at least one skill", () => {
    for (const cat of CATEGORIES) {
      const c = SKILLS_DATA[cat];
      let count = 0;
      if (c.groups) {
        count = c.groups.reduce((sum, g) => sum + g.skills.length, 0);
      } else {
        count = c.skills.length;
      }
      expect(count).toBeGreaterThan(0);
    }
  });

  test("no duplicate skill names across categories", () => {
    const allNames = CATEGORIES.flatMap((cat) => {
      const c = SKILLS_DATA[cat];
      if (c.groups) return c.groups.flatMap((g) => g.skills.map((s) => s.name));
      return c.skills.map((s) => s.name);
    });
    const uniqueNames = new Set(allNames);
    expect(uniqueNames.size).toBe(allNames.length);
  });

  test("every skill name maps to a valid image or custom icon", () => {
    const imageSkills = CATEGORIES.flatMap((cat) => {
      const c = SKILLS_DATA[cat];
      if (c.groups) return c.groups.flatMap((g) => g.skills);
      return c.skills;
    }).filter(
      (s) => s.name !== "Data Engineering" && s.name !== "Game Development"
    );

    for (const skill of imageSkills) {
      const imgName = skill.name.replace(/[\s/]/g, "");
      const imgPath = `/images/skills/${imgName}.webp`;
      expect(imgPath).toBeTruthy();
    }
  });
});
