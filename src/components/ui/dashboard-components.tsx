import React from "react";

// ==================== COMPOSANTS UI ====================
export const Card = ({
    children,
    className = "",
    gradient = false,
    glow = false,
    onClick
}: {
    children: React.ReactNode;
    className?: string;
    gradient?: boolean;
    glow?: boolean;
    onClick?: () => void;
}) => (
    <div
        onClick={onClick}
        className={`
      bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden
      ${gradient ? "bg-gradient-to-br from-white to-gray-50" : ""}
      ${glow ? "shadow-xl shadow-purple-500/10" : ""}
      ${onClick ? "cursor-pointer hover:scale-105 transition-all duration-300" : ""}
      ${className}
    `}
    >
        {children}
    </div>
);

export const Badge = ({
    children,
    variant = "default",
    size = "sm",
    pulse = false,
    className = ""
}: {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "danger" | "premium" | "vip" | "fire" | "streak";
    size?: "xs" | "sm" | "md" | "lg";
    pulse?: boolean;
    className?: string;
}) => {
    const variants = {
        default: "bg-gray-100 text-gray-800",
        success: "bg-emerald-100 text-emerald-800",
        warning: "bg-amber-100 text-amber-800",
        danger: "bg-rose-100 text-rose-800",
        premium: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800",
        vip: "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800",
        fire: "bg-gradient-to-r from-orange-100 to-red-100 text-orange-800",
        streak: "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800"
    };

    const sizes = {
        xs: "px-1.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1.5 text-base"
    };

    return (
        <span className={`
      inline-flex items-center rounded-full font-medium 
      ${variants[variant]} ${sizes[size]} 
      ${pulse ? "animate-pulse" : ""}
      ${className}
    `}>
            {children}
        </span>
    );
};

export const GradientButton = ({
    children,
    onClick,
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    fullWidth = false
}: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "accent" | "outline" | "success";
    size?: "sm" | "md" | "lg";
    className?: string;
    disabled?: boolean;
    fullWidth?: boolean;
}) => {
    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white",
        secondary: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white",
        accent: "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
        success: "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        inline-flex items-center justify-center rounded-xl font-medium 
        transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} 
        ${fullWidth ? "w-full" : ""} 
        ${className}
      `}
        >
            {children}
        </button>
    );
};
