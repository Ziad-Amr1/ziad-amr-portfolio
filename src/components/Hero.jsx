// src/components/Hero.jsx

import { useMemo, useState } from "react";

import { motion } from "framer-motion";

import {
  Download,
  ArrowRight,
} from "lucide-react";

import {
  FaDribbble,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import useTypingEffect from "../hooks/useTypingEffect";
import { useTranslation } from "../i18n";

export default function Hero() {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  const titles = useMemo(
    () => t("hero.titles"),
    [t]
  );

  const { text, blink, pause, resume } = useTypingEffect(titles);

  const socials = [
    {
      id: "linkedin",
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/in/ziadamrsaid/",
    },

    {
      id: "github",
      icon: <FaGithub />,
      link: "https://github.com/Ziad-Amr1/",
    },

    {
      id: "dribbble",
      icon: <FaDribbble />,
      link: "https://dribbble.com/ZiadAmrSaid",
    },
  ];

  return (
    <section
      id="home"
      className="
      relative

      min-h-screen

      flex
      items-center
      justify-center

      overflow-hidden

      px-[6%]
      md:px-[8%]
      lg:px-[10%]

      pt-28
      pb-20

      bg-background

      transition-colors
      duration-300
      "
    >
      {/* ======================================================
         BACKGROUND EFFECTS
      ====================================================== */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Main Glow */}
        <div
          className="
          absolute
          top-[-200px]
          left-[-150px]

          w-[500px]
          h-[500px]

          rounded-full

          bg-blue-500/20
          dark:bg-blue-500/20

          blur-[140px]
          "
        />

        {/* Secondary Glow */}
        <div
          className="
          absolute
          bottom-[-250px]
          right-[-150px]

          w-[450px]
          h-[450px]

          rounded-full

          bg-cyan-400/10
          dark:bg-cyan-400/10

          blur-[120px]
          "
        />

        {/* Radial Overlay */}
        <div
          className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_35%)]

          dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_35%)]
          "
        />

        {/* Grid */}
        <div
          className="
          absolute
          inset-0

          opacity-[0.04]
          dark:opacity-[0.03]

          bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)]

          dark:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]

          bg-[size:80px_80px]
          "
        />
      </div>

      {/* ======================================================
         HERO CARD
      ====================================================== */}

      <div
        className="
        relative

        w-full
        max-w-[1350px]

        rounded-[36px]

        border
        border-black/5
        dark:border-white/10

        bg-white/70
        dark:bg-white/[0.04]

        backdrop-blur-xl

        shadow-[0_10px_50px_rgba(15,23,42,0.06)]
        dark:shadow-[0_0_60px_rgba(59,130,246,0.08)]

        px-8
        md:px-14

        py-10
        md:py-16

        transition-colors
        duration-300
        "
      >
        {/* Glow */}
        <div
          className="
          absolute
          inset-0

          rounded-[36px]

          bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_45%)]

          dark:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_45%)]
          "
        />

        <div
          className="
          relative
          z-10

          flex
          flex-col-reverse
          lg:flex-row

          items-center
          justify-between

          gap-16
          "
        >
          {/* ======================================================
             LEFT CONTENT
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
            max-w-[650px]
            "
          >
            {/* Label */}
            <div
              className="
              inline-flex
              items-center

              px-4
              py-2

              rounded-2xl

              border
              border-black/5
              dark:border-white/10

              bg-slate-900/[0.03]
              dark:bg-white/[0.03]

              text-blue-500
              dark:text-blue-300

              text-sm

              tracking-[0.2em]
              uppercase

              mb-7
              "
            >
              {t("hero.greeting")}
            </div>

            {/* Heading */}
            <h1
              className="
              text-5xl
              sm:text-6xl
              lg:text-8xl

              font-black

              leading-[0.95]
              tracking-tight

              text-foreground
              dark:text-white

              drop-shadow-[0_0_20px_rgba(96,165,250,0.12)]
              dark:drop-shadow-[0_0_25px_rgba(96,165,250,0.2)]
              "
            >
              Ziad{" "}

              <span
                className="
                bg-gradient-to-r
                from-blue-400
                via-cyan-300
                to-blue-500

                bg-clip-text
                text-transparent
                "
              >
                Amr
              </span>
            </h1>

            {/* Typing Text */}
            <div
              onMouseEnter={pause}
              onMouseLeave={resume}
              className="
              mt-5

              text-2xl
              md:text-3xl

              font-semibold

              text-blue-500
              dark:text-blue-300

              min-h-[40px]
              "
            >
              {text}

              <span className="ml-1">
                {blink
                  ? "|"
                  : " "}
              </span>
            </div>

            {/* Description */}
            <p
              className="
              mt-8

              text-muted
              dark:text-gray-400

              text-lg

              leading-relaxed

              max-w-[620px]
              "
            >
              {t("hero.description")}
            </p>

            {/* ======================================================
               BUTTONS
            ====================================================== */}

            <div
              className="
              flex
              flex-col
              sm:flex-row
              flex-wrap
              gap-5
              mt-10
              "
            >
              {/* Primary */}
              <a
                href="#projects"
                className="
                group
                w-full
                sm:w-auto
                justify-center
                inline-flex
                items-center
                gap-3
                px-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-blue-500
                to-cyan-400
                text-white
                font-semibold
                shadow-[0_0_25px_rgba(59,130,246,0.35)]
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:shadow-[0_0_40px_rgba(59,130,246,0.55)]
                "
              >
                {t("hero.cta.workTogether")}

                <ArrowRight
                  className="
                  w-5
                  h-5
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  "
                />
              </a>

              {/* Secondary */}
              <a
                href="/images/Ziad_Amr_Said_CV.pdf"
                download
                className="
                w-full
                sm:w-auto
                justify-center
                inline-flex
                items-center
                gap-3
                px-8
                py-4
                rounded-2xl
                border
                border-slate-200
                dark:border-white/10

                bg-white
                dark:bg-white/[0.03]

                shadow-[0_6px_24px_rgba(15,23,42,0.06)]
                dark:shadow-none

                hover:bg-slate-50
                dark:hover:bg-white/[0.07]

                hover:border-blue-200
                dark:hover:border-blue-400/20

                hover:shadow-[0_10px_35px_rgba(59,130,246,0.12)]
                dark:hover:shadow-none
                text-foreground
                dark:text-white
                font-semibold
                transition-all
                duration-300
                "
              >
                <Download className="w-5 h-5" />

                {t("hero.cta.downloadCv")}
              </a>
            </div>

            {/* ======================================================
               SOCIALS
            ====================================================== */}

            <div
              className="
              flex
              items-center

              gap-6

              mt-12
              "
            >
              {socials.map(
                ({
                  id,
                  icon,
                  link,
                }) => (
                  <motion.a
                    key={id}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("accessibility.socialLink", { site: id })}
                    whileHover={{
                      y: -4,
                      scale: 1.12,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    className="
                        w-12
                        h-12

                        rounded-2xl

                        border
                        border-slate-200
                        dark:border-white/10

                        bg-white
                        dark:bg-white/[0.03]

                        shadow-[0_4px_18px_rgba(15,23,42,0.05)]
                        dark:shadow-none

                        flex
                        items-center
                        justify-center

                        text-xl

                        text-slate-600
                        dark:text-gray-300

                        hover:text-blue-500
                        dark:hover:text-blue-300

                        hover:border-blue-200
                        dark:hover:border-blue-400/30

                        hover:bg-blue-50
                        dark:hover:bg-blue-500/10

                        hover:shadow-[0_10px_30px_rgba(59,130,246,0.14)]
                        dark:hover:shadow-none

                        transition-all
                        duration-300
                        "
                  >
                    {icon}
                  </motion.a>
                )
              )}
            </div>
          </motion.div>

          {/* ======================================================
             RIGHT IMAGE
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
            }}
            className="relative"
          >
            {/* Glow */}
            <div
              className="
              absolute
              inset-0

              rounded-full

              bg-blue-500/20
              dark:bg-blue-500/30

              blur-[80px]

              scale-110
              "
            />

            {/* Dots */}
            <div
              className="
              absolute
              -top-6
              -right-4

              grid
              grid-cols-4

              gap-2

              opacity-40
              dark:opacity-50
              "
            >
              {Array.from({
                length: 16,
              }).map((_, i) => (
                <span
                  key={i}
                  className="
                  w-1.5
                  h-1.5

                  rounded-full

                  bg-blue-400
                  "
                />
              ))}
            </div>

            {/* Image Ring */}
            <div
              className="
              relative

              w-[280px]
              h-[280px]

              sm:w-[340px]
              sm:h-[340px]

              lg:w-[400px]
              lg:h-[400px]

              rounded-full

              p-[4px]

              bg-gradient-to-br
              from-blue-400
              via-cyan-300
              to-blue-600

              shadow-[0_0_40px_rgba(59,130,246,0.28)]
              dark:shadow-[0_0_50px_rgba(59,130,246,0.45)]
              "
            >
              {imgError ? (
                <div
                  className="
                  w-full h-full
                  rounded-full
                  object-cover object-top
                  border-[6px] border-white dark:border-[#020817]
                  bg-slate-200 dark:bg-slate-800
                  flex items-center justify-center
                  text-4xl font-bold
                  text-slate-400 dark:text-slate-500
                  "
                  aria-label="Ziad Amr"
                >
                  ZA
                </div>
              ) : (
                <img
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  src="/images/profile/profile.webp"
                  alt="Ziad Amr"
                  onError={() => setImgError(true)}
                  className="
                  w-full
                  h-full

                  rounded-full

                  object-cover
                  object-top

                  border-[6px]

                  border-white
                  dark:border-[#020817]
                  "
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}