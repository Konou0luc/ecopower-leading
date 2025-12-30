import { ReactNode, ButtonHTMLAttributes } from 'react';

interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function AdminButton({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: AdminButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#FFA800] text-white hover:bg-[#E69500]',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


