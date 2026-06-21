const SkillChip = ({ skill }) => {
  return (
    <span
      style={{
        backgroundColor: "#e5e7eb",
        padding: "5px 10px",
        borderRadius: "20px",
        marginRight: "5px",
        display: "inline-block",
      }}
    >
      {skill}
    </span>
  );
};

export default SkillChip;