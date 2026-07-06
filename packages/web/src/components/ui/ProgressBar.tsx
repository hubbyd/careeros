interface ProgressBarProps {
  progress: number;
  label?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export function ProgressBar({
  progress,
  label,
  showLabel = true,
  size = 'md',
}: ProgressBarProps) {
  const sizeStyles = {
    sm: 'h-2',
    md: 'h-3',
  };

  return (
    <div className="space-y-2">
      {(label || showLabel) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="text-gray-600">{label}</span>}
          {showLabel && (
            <span className="font-medium text-primary-600">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`h-full gradient-bg rounded-full transition-all duration-500 ease-out ${sizeStyles[size]}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}