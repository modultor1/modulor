"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}

export function PasswordInput({ label, value, onChange, placeholder = "••••••••", error }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <div className={`flex items-center rounded-xl border-2 bg-white transition-all ${
        error ? "border-red-400" : "border-accent"
      } focus-within:ring-2 focus-within:ring-accent/50`}>
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="pr-4 pl-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
