import React from 'react';
import { UI_TEXT, ICONS } from '../../constants';

interface ThemeToggleContentProps {
  theme: 'light' | 'dark';
  iconClassName?: string;
  textClassName?: string;
}

const ThemeToggleContent: React.FC<ThemeToggleContentProps> = ({
  theme,
  iconClassName = '',
  textClassName = ''
}) => {
  const themeConfig = {
    light: {
      icon: ICONS.emoji.moon,
      text: UI_TEXT.themeLabels.dark
    },
    dark: {
      icon: ICONS.emoji.sun,
      text: UI_TEXT.themeLabels.light
    }
  };

  const config = themeConfig[theme];

  return (
    <>
      <span className={`theme-icon ${iconClassName}`}>
        {config.icon}
      </span>
      <span className={`theme-text ${textClassName}`}>
        {config.text}
      </span>
    </>
  );
};

export default ThemeToggleContent; 