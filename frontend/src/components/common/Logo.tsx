import React from 'react';
import { Shield } from 'lucide-react';

interface LogoProps {
  size?: number;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 24, color = '#1a1a2e' }) => {
  return (
    <div className="relative">
      <Shield size={size} color={color} />
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ top: '1px' }}
      >
        <span style={{ 
          color: color, 
          fontSize: `${size * 0.4}px`,
          fontWeight: 'bold'
        }}>
          AI
        </span>
      </div>
    </div>
  );
};

export default Logo;