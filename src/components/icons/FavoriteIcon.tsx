import React from 'react';
import { ICONS, UI_TEXT, THEME_COLORS } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

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
}) => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];

  return (
    <svg
      width={size}
      height={size}
      viewBox={ICONS.heart.viewBox}
      fill={active ? colors.favoriteActive : colors.favoriteInactive}
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
      onMouseOver={e => (e.currentTarget.style.fill = colors.favoriteHover)}
      onMouseOut={e => (e.currentTarget.style.fill = active ? colors.favoriteActive : colors.favoriteInactive)}
      aria-label={active ? UI_TEXT.ariaLabels.removeFromFavorites : UI_TEXT.ariaLabels.addToFavorites}
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
};

export default FavoriteIcon; 