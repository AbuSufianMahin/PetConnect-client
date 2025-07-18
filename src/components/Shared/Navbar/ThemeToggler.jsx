import { Moon, Sun } from 'lucide-react';
import React, { useState } from 'react';

const ThemeToggler = () => {
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <div className='flex items-center gap-2 justify-around'>
            <p className='font-semibold text-sm'>Theme:</p>
            <button
                onClick={toggleTheme}
                className="relative flex items-center w-14 h-8 bg-muted-foreground/20 dark:bg-white/20 rounded-full transition-colors duration-300 shadow-inner"
            >
                <div
                    className={`absolute w-6 h-6 bg-primary text-background rounded-full flex items-center justify-center transition-transform duration-300 transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"
                        }`}
                >

                    {theme === "dark" ? (
                        <Moon size={16} className="text-white" />
                    ) : (
                        <Sun size={16} className="text-white" />
                    )}
                </div>
            </button>
        </div>
    );
};

export default ThemeToggler;