import { useState, useEffect } from "react";

const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("isDark");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
  });

  const color = isDark ? "#00ADB5" : "#fff";

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  return { isDark, color, toggleTheme: () => setIsDark(!isDark) };
};

export { useTheme };
export default useTheme;
