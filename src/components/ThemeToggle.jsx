import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
      document.querySelectorAll("img, picture, video, canvas").forEach(el => {
        el.style.filter = "invert(1) hue-rotate(180deg)";
      });
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.style.filter = "none";
      document.querySelectorAll("img, picture, video, canvas").forEach(el => {
        el.style.filter = "none";
      });
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="p-2 hover:bg-gray-100 rounded-full">
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}