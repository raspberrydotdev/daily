"use client";

type WeightEntry = {
id: number;
weightKg: string;
recordedAt: string;
};

type WeightChartProps = {
entries: WeightEntry[];
};

function formatDate(date: string) {
return new Intl.DateTimeFormat("en-IN", {
day: "numeric",
month: "short",
}).format(new Date(date));
}

export default function WeightChart({
entries,
}: WeightChartProps) {
if (entries.length === 0) {
return null;
}

const points = [...entries]
.reverse()
.map((entry) => ({
id: entry.id,
weight: Number(entry.weightKg),
date: entry.recordedAt,
}));

const weights = points.map((point) => point.weight);

const minWeight = Math.min(...weights);
const maxWeight = Math.max(...weights);

const width = 640;
const height = 220;

const paddingX = 56;
const paddingTop = 42;
const paddingBottom = 38;

const chartWidth = width - paddingX * 2;
const chartHeight = height - paddingTop - paddingBottom;

const range = Math.max(maxWeight - minWeight, 1);

const verticalPadding = Math.max(range * 0.3, 1);

const chartMin = minWeight - verticalPadding;
const chartMax = maxWeight + verticalPadding;

const coordinates = points.map((point, index) => {
const x =
points.length === 1
? width / 2
: paddingX +
(index / (points.length - 1)) * chartWidth;

const y =
  paddingTop +
  ((chartMax - point.weight) /
    (chartMax - chartMin)) *
    chartHeight;

return {
  ...point,
  x,
  y,
};


});

let path = "";

coordinates.forEach((point, index) => {
if (index === 0) {
path += "M " + point.x + " " + point.y;
} else {
path += " L " + point.x + " " + point.y;
}
});

return (
<div className="rounded-3xl border border-gray-200 bg-white px-4 pb-4 pt-5">
<h2 className="mb-3 px-1 text-base font-semibold text-gray-900">
Weight trend
</h2>

  <svg
    viewBox={"0 0 " + width + " " + height}
    className="h-auto w-full"
    role="img"
    aria-label="Weight trend"
  >
    {/* Line */}
    {points.length > 1 && (
      <path
        d={path}
        fill="none"
        stroke="#111827"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}

    {/* Points + values */}
    {coordinates.map((point) => (
      <g key={point.id}>
        <circle
          cx={point.x}
          cy={point.y}
          r="4"
          fill="#111827"
        />

        <text
          x={point.x}
          y={point.y - 11}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="#111827"
        >
          {point.weight.toFixed(1)}
        </text>
      </g>
    ))}

    {/* Dates */}
    {coordinates.map((point) => (
      <text
        key={"date-" + point.id}
        x={point.x}
        y={height - 10}
        textAnchor="middle"
        fontSize="11"
        fill="#9ca3af"
      >
        {formatDate(point.date)}
      </text>
    ))}
  </svg>
</div>


);
}