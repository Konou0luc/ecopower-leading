import { ReactNode } from 'react';

interface AdminCardProps {
  children: ReactNode;
  className?: string;
}

export function AdminCard({ children, className = '' }: AdminCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

interface AdminCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function AdminCardHeader({ children, className = '' }: AdminCardHeaderProps) {
  return (
    <div className={`p-6 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

interface AdminCardTitleProps {
  children: ReactNode;
  className?: string;
}

export function AdminCardTitle({ children, className = '' }: AdminCardTitleProps) {
  return (
    <h3 className={`text-lg font-bold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}

interface AdminCardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function AdminCardDescription({ children, className = '' }: AdminCardDescriptionProps) {
  return (
    <p className={`text-sm text-gray-600 mt-1 ${className}`}>
      {children}
    </p>
  );
}

interface AdminCardContentProps {
  children: ReactNode;
  className?: string;
}

export function AdminCardContent({ children, className = '' }: AdminCardContentProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}


