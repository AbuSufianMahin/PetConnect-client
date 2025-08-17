import { useTheme } from '../../../hooks/useTheme';
import { motion } from "framer-motion";

const ThemeButton = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === "light") setTheme("dark");
        else if (theme === "dark") setTheme("light");
        else setTheme("light"); // default if system
    };

    return (
        <motion.button
            onClick={toggleTheme}
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-10 h-10 rounded-full p-2 bg-primary shadow-lg text-white relative overflow-hidden"
        >
            {/* Animated icon */}
            <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {theme === "dark" ? "🌙" : "🌞"}
            </motion.div>

            {/* Optional ripple effect */}
            <motion.span
                className="absolute w-32 h-32 bg-white opacity-20 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
            />
        </motion.button>
    );
};

export default ThemeButton;