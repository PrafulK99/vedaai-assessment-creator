import React from "react";
import { LucideIcon } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

interface ComingSoonStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export function ComingSoonState({
  icon: Icon,
  title,
  description,
  actionText,
  onAction
}: ComingSoonStateProps) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center w-full max-w-lg mx-auto text-center px-6 py-16"
    >
      <motion.div variants={itemVariants} className="w-24 h-24 bg-gray-50/80 rounded-[32px] flex items-center justify-center mb-8 shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] border border-gray-100 relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-transparent rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Icon className="w-10 h-10 text-gray-400 stroke-[1.5] relative z-10" />
      </motion.div>
      
      <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100/80 rounded-full text-xs font-semibold text-gray-500 mb-6 uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
        In Development
      </motion.div>

      <motion.h2 variants={itemVariants} className="text-2xl font-extrabold text-[#111827] tracking-tight mb-4 leading-tight">
        {title}
      </motion.h2>
      
      <motion.p variants={itemVariants} className="text-[#6B7280] text-[15px] leading-relaxed mb-10 max-w-md">
        {description}
      </motion.p>
      
      {actionText && onAction && (
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="bg-white border border-gray-200 text-[#374151] font-semibold py-3 px-8 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm text-sm"
        >
          {actionText}
        </motion.button>
      )}
    </motion.div>
  );
}
