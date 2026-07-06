// src/components/ui/ThemeToggle.jsx

import {
  Moon,
  SunMedium,
} from "lucide-react";

import { useTranslation } from "../../i18n";

export default function ThemeToggle({
  isDark,
  onToggle,
}) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={t("accessibility.toggleTheme")}
      className="
      relative

      w-[72px]
      h-[42px]

      rounded-full

      border
      border-black/5
      dark:border-white/10

      bg-white/80
      dark:bg-white/[0.04]

      backdrop-blur-xl

      transition-all
      duration-300

      hover:border-blue-400/30
      "
    >
      {/* Track */}
      <div
        className="
        absolute
        inset-1

        rounded-full

        bg-slate-200
        dark:bg-[#081120]
        "
      />

      {/* Icons */}
      <div
        className="
        absolute
        inset-0

        flex
        items-center
        justify-between

        px-3
        "
      >
        <SunMedium
          size={16}
          className="
          text-amber-500
          "
        />

        <Moon
          size={16}
          className="
          text-blue-300
          "
        />
      </div>

      {/* Ball */}
      <div
        className={`
        absolute
        top-1

        w-8
        h-8

        rounded-full

        bg-gradient-to-br
        from-blue-400
        to-cyan-300

        shadow-[0_0_18px_rgba(59,130,246,0.35)]

        transition-all
        duration-300

        flex
        items-center
        justify-center

        ${
          isDark
            ? "translate-x-[34px]"
            : "translate-x-[4px]"
        }
        `}
      >
        {isDark ? (
          <Moon
            size={15}
            className="
            text-[#081120]
            "
          />
        ) : (
          <SunMedium
            size={15}
            className="
            text-white
            "
          />
        )}
      </div>
    </button>
  );
}