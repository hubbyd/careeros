import { ReactNode, MouseEventHandler } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function Card({ children, className = '', hover = false, padding = 'md', onClick }: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <div
      className={`bg-white rounded-card shadow-card ${paddingStyles[padding]} ${hover ? 'card-hover cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}