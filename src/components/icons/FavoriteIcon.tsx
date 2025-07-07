import React from 'react';
import { ICONS } from '../../constants';

interface FavoriteIconProps {
  active: boolean;
  onClick: () => void;
  size?: number;
  className?: string;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({ 
  active, 
  onClick, 
  size = 32,
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox={ICONS.heart.viewBox}
    fill={active ? '#e53935' : '#ccc'}
    strokeWidth="0"
    className={`favorite-icon ${className}`}
    style={{ 
      cursor: 'pointer', 
      transition: 'fill 0.2s',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      padding: 0,
      margin: 0
    }}
    onClick={onClick}
    onMouseOver={e => (e.currentTarget.style.fill = '#e57373')}
    onMouseOut={e => (e.currentTarget.style.fill = active ? '#e53935' : '#ccc')}
    aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <path d={ICONS.heart.path} />
  </svg>
);

export default FavoriteIcon; 