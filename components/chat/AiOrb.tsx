"use client";

import { motion } from "framer-motion";

export default function AiOrb() {
  return (
    <div className="flex justify-center">
      <motion.div
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
          relative
          w-14 h-14
          rounded-full
          bg-linear-to-br
          from-fuchsia-500
          via-purple-500
          to-violet-600
          shadow-[0_0_60px_rgba(168,85,247,0.55)]
        "
      >
        <div className="absolute inset-1 rounded-full bg-black/15 backdrop-blur-xl" />
      </motion.div>
    </div>
  );
}
