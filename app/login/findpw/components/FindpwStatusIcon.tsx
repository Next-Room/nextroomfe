type IconType = "check" | "error" | "clock";

interface Props {
  type: IconType;
}

const FindpwStatusIcon = ({ type }: Props) => {
  if (type === "check") return <>✓</>;

  if (type === "clock") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 5L19 19M19 5L5 19" />
    </svg>
  );
};

export default FindpwStatusIcon;
