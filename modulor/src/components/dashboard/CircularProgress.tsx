interface CircularProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function CircularProgress({ value, size = 80, strokeWidth = 7, color = "#2934f2" }: CircularProgressProps) {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      {/* Track */}
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
      {/* Progress */}
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      {/* Label */}
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
        className="rotate-90 origin-center text-xs font-bold fill-foreground"
        style={{ transform: "rotate(90deg)", transformOrigin: "center", fontSize: 14, fontWeight: 700 }}>
        {value}%
      </text>
    </svg>
  );
}
