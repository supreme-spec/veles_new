import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8', 
  lg: 'h-12 w-12'
};

const colorClasses = {
  primary: 'border-indigo-600',
  secondary: 'border-gray-600',
  white: 'border-white'
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
};

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  text,
  className = '' 
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center space-x-3 ${className}`}>
      <motion.div
        className={`
          ${sizeClasses[size]} 
          border-2 border-t-transparent 
          ${colorClasses[color]} 
          rounded-full
        `}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {text && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`
            ${textSizeClasses[size]} 
            ${color === 'white' ? 'text-white' : 'text-gray-600'}
            font-medium
          `}
        >
          {text}
        </motion.span>
      )}
    </div>
  );
}

// Компонент для полноэкранной загрузки
export function FullScreenLoader({ text = 'Загрузка...' }: { text?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <LoadingSpinner size="lg" text={text} />
        <motion.div
          className="mt-4 text-sm text-gray-500"
          animate={{ 
            opacity: [1, 0.5, 1] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity 
          }}
        >
          Пожалуйста, подождите...
        </motion.div>
      </div>
    </motion.div>
  );
}

// Компонент скелетона для контента
export function ContentSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className={`h-4 bg-gray-200 rounded ${
            i === lines - 1 ? 'w-1/2' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}
