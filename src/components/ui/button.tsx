
import { cn } from "../../lib/utils";

export function Button({ children, onClick, disabled = false, variant = "default", className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-all",
        variant === "default" ? "bg-blue-500 text-white hover:bg-blue-600" : "border border-gray-400 hover:bg-gray-100",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
    >
      {children}
    </button>
  );
}
