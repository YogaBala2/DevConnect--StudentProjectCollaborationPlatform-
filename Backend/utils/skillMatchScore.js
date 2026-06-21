const calculateSkillMatch = (
  userSkills,
  requiredSkills
) => {
  if (
    !requiredSkills ||
    requiredSkills.length === 0
  ) {
    return 0;
  }

  const matchedSkills =
    requiredSkills.filter((skill) =>
      userSkills.some(
        (userSkill) =>
          userSkill.toLowerCase() ===
          skill.toLowerCase()
      )
    );

  const percentage = Math.round(
    (matchedSkills.length /
      requiredSkills.length) *
      100
  );

  return percentage;
};

module.exports = calculateSkillMatch;