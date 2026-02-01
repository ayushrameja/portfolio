const StaggeredText = ({ text }: { text: string }) => {
  return (
    <span className="staggered-text">
      {[...text].map((char, index) => (
        <span
          key={index}
          data-hover={char}
          style={{ "--i": index } as React.CSSProperties}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default StaggeredText;
