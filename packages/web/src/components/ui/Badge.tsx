interface BadgeProps {
  count: number;
  max?: number;
}

export function Badge({ count, max = 99 }: BadgeProps) {
  const displayCount = count > max ? `${max}+` : count;

  return (
    <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white gradient-bg rounded-full">
      {displayCount}
    </span>
  );
}