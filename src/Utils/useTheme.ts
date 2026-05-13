import { useState } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('ps-theme', next ? 'dark' : 'light');
    setIsDark(next);
  };

  return { isDark, toggle };
}
