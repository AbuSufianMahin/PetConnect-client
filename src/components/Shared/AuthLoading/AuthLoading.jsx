import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import logo from "../../../assets/images/PetConnect-logo.png"

const AuthLoading = () => {
    return (
        <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">

            {/* Soft glowing animated blobs */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.15, scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="absolute w-96 h-96 bg-pink-400 rounded-full blur-3xl top-[-10%] left-[-10%]"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.1, scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                className="absolute w-80 h-80 bg-blue-400 rounded-full blur-3xl bottom-[-10%] right-[-10%]"
            />

            {/* Glass card */}
            <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                className="relative lg:min-w-lg z-10 p-10 px-14 bg-white/70 border border-gray-200 rounded-3xl backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.1)] flex flex-col items-center gap-6"
            >
                {/* Shield icon in a glowing aura */}
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-yellow-400 to-indigo-500 p-1 shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">

                        <img src={logo} alt="" className="p-5 ml-1" />

                    </div>
                </motion.div>

                {/* Message */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-lg font-medium text-gray-800 tracking-wide text-center"
                >
                    Settings things up for you...
                </motion.p>

                {/* Animated role progress shimmer */}
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="h-1 rounded bg-gradient-to-r from-yellow-400 via-indigo-400 to-purple-400"
                    style={{ maxWidth: "200px" }}
                />

            </motion.div>
        </div>
    );
};

export default AuthLoading;
