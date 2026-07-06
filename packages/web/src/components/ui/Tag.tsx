import { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export function Tag({ children, variant = 'primary', size = 'sm' }: TagProps) {
  const variantStyles = {
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {children}
    </span>
  );
}