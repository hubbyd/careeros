import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-4 py-2.5 rounded-card border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';