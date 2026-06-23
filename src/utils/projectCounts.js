export function computeTagCounts(projects) {
  const counts = {};

  for (const project of projects) {
    const tags = project.tags;
    if (!Array.isArray(tags)) continue;

    const seen = new Set();
    for (const tag of tags) {
      const key = tag.toLowerCase();
      if (!seen.has(key)) {
        counts[key] = (counts[key] ?? 0) + 1;
        seen.add(key);
      }
    }
  }

  return counts;
}

export function getSkillProjectCount(skill, tagCounts) {
  const skillTags = skill.tags;
  if (!Array.isArray(skillTags) || skillTags.length === 0) return 0;

  const seen = new Set();
  let total = 0;

  for (const tag of skillTags) {
    const key = tag.toLowerCase();
    if (!seen.has(key)) {
      total += tagCounts[key] ?? 0;
      seen.add(key);
    }
  }

  return total;
}
