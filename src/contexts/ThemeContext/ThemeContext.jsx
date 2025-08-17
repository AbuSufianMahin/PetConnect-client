import { createContext } from "react";

const ThemeContext = createContext({
    theme: "system",
    setTheme: () => { },
});

export default ThemeContext;