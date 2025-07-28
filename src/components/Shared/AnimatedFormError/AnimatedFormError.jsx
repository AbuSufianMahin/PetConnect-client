import React from 'react';
import { AnimatePresence, motion } from "framer-motion"

const AnimatedFormError = ({ message }) => {
    if (!message) return null

    return (
        <AnimatePresence>
            <motion.p
                key={message}
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-red-500 ml-1 mt-2"
            >
                {message}
            </motion.p>
        </AnimatePresence>
    )
};

export default AnimatedFormError;