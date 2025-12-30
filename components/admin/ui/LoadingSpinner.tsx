interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text, 
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-[#FFA800] rounded-full animate-spin`}></div>
          {text && <p className="text-gray-600 font-medium">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-2">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-[#FFA800] rounded-full animate-spin`}></div>
        {text && <p className="text-sm text-gray-600">{text}</p>}
      </div>
    </div>
  );
}


