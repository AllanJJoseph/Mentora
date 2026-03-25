interface HealthBadgeProps {
  status: 'active' | 'at-risk' | 'inactive';
  score: number;
}

export default function HealthBadge({ status, score }: HealthBadgeProps) {
  const configs = {
    active: {
      color: "bg-green-50 text-green-700 border-green-200",
      barColor: "bg-green-500",
      label: "Healthy & Active"
    },
    'at-risk': {
      color: "bg-amber-50 text-amber-700 border-amber-200",
      barColor: "bg-amber-500",
      label: "At Risk"
    },
    inactive: {
      color: "bg-red-50 text-red-700 border-red-200",
      barColor: "bg-red-500",
      label: "Inactive"
    }
  };

  const config = configs[status];

  return (
    <div className={`inline-flex flex-col gap-2 p-4 rounded-lg border ${config.color}`}>
      <div className="flex justify-between items-center gap-4">
        <span className="text-xs font-semibold tracking-wide uppercase">Engagement Analytics</span>
        <span className="text-sm font-bold">{score}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${config.barColor} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-medium">{config.label}</span>
    </div>
  );
}
