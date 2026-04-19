import { createContext, useContext, useEffect, useState } from "react";

// Context Kurulumu
export const ThemeContext = createContext();

//Context Saglayicisi (HOC)
export const ThemeProvider = ({ children }) => {
  //tema state i yaz
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    //localstorage a kaydedilmis bir tema varsa onu kullan
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    //projeye ilk defa giren biri icintarayicida tercih edilen temayi kullan
    return window.matchMedia("(prefers-color-scheme: dark)").matches;

});

  //temayi degistirme fonksiyonu yaz
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  // tema degisiminin tailwindin algilamasi icin html elementine dark classi ekle
useEffect(() => {
const root = document.documentElement;

if(isDarkTheme) {
root.classList.add("dark");
localStorage.setItem("theme", "dark");
}else {
root.classList.remove("dark");
localStorage.setItem("theme", "light");
}
}, [isDarkTheme]);

  //Context yapisinda diger bilesenlere saglanacak verileri belirle
  return <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>{children} </ThemeContext.Provider>;
};

//Context e abone olmak icin hook
export const useTheme = () => useContext(ThemeContext);
