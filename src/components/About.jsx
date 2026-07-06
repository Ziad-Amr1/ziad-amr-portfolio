// src/components/About.jsx

import React from "react";

import { motion } from "framer-motion";

import {
  FaUserTie,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";

import { fadeInUp } from "../utils/motionVariants";
import { useTranslation } from "../i18n";

/* ========================================
   CONTAINER ANIMATION
======================================== */

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/* ========================================
   REUSABLE CARD
======================================== */

function AboutCard({
  icon: Icon,
  title,
  children,
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{
        y: -8,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
      }}
      className="
      group
      relative
      overflow-hidden

      rounded-[28px]

      border
      border-slate-200
      dark:border-white/10

      bg-white
      dark:bg-white/[0.03]

      backdrop-blur-xl

      p-8

      shadow-[0_10px_35px_rgba(15,23,42,0.05)]
      dark:shadow-none

      transition-all
      duration-500

      hover:-translate-y-2

      hover:border-blue-200
      dark:hover:border-blue-400/30

      hover:shadow-[0_18px_50px_rgba(59,130,246,0.12)]
      dark:hover:shadow-[0_0_45px_rgba(59,130,246,0.15)]
      "
    >
      {/* Glow Hover */}
      <div
        className="
        absolute
        inset-0

        opacity-0
        group-hover:opacity-100

        transition-opacity
        duration-500

        bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_45%)]
        "
      />

      {/* Top Accent Line */}
      <div
        className="
        absolute
        top-0
        left-0

        w-full
        h-[1px]

        bg-gradient-to-r
        from-transparent
        via-blue-400/40
        to-transparent
        "
      />

      {/* Icon */}
      <div
        className="
        relative
        z-10

        w-16
        h-16

        rounded-2xl

        border
        border-slate-200
        dark:border-white/10

        bg-blue-50
        dark:bg-blue-500/10

        flex
        items-center
        justify-center

        mb-7
        "
      >
        <Icon
          className="
          text-2xl

          text-blue-500
          dark:text-blue-300
          "
        />
      </div>

      {/* Title */}
      <h3
        className="
        relative
        z-10

        text-2xl
        font-bold

        text-foreground
        dark:text-white

        mb-5
        "
      >
        {title}
      </h3>

      {/* Divider */}
      <div
        className="
        relative
        z-10

        w-14
        h-[3px]

        rounded-full

        bg-gradient-to-r
        from-blue-400
        to-cyan-300

        mb-7
        "
      />

      {/* Content */}
      <div
        className="
        relative
        z-10

        text-muted
        dark:text-gray-400

        leading-relaxed

        space-y-4
        "
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ========================================
   ABOUT SECTION
======================================== */

export default function About() {
  const { t } = useTranslation();
  return (
    <section
      id="about"
      className="
      relative

      py-28

      overflow-hidden

      bg-slate-50/70
      dark:bg-background

      transition-colors
      duration-300
      "
    >
      {/* ====================================
         BACKGROUND EFFECTS
      ==================================== */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Left Glow */}
        <div
          className="
          absolute
          left-[-200px]
          top-[20%]

          w-[450px]
          h-[450px]

          rounded-full

          bg-blue-500/10

          blur-[140px]
          "
        />

        {/* Right Glow */}
        <div
          className="
          absolute
          right-[-200px]
          bottom-[10%]

          w-[400px]
          h-[400px]

          rounded-full

          bg-cyan-400/10

          blur-[120px]
          "
        />

        {/* Grid */}
        <div
          className="
          absolute
          inset-0

          opacity-[0.03]

          bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)]

          dark:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]

          bg-[size:80px_80px]
          "
        />
      </div>

      {/* ====================================
         CONTENT
      ==================================== */}

      <div
        className="
        max-w-[1350px]
        mx-auto

        px-[6%]
        md:px-[8%]
        lg:px-[10%]
        "
      >
        {/* ====================================
           SECTION HEADER
        ==================================== */}

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
          text-center

          mb-20
          "
        >
          {/* Label */}
          <div
            className="
            inline-flex
            items-center

            px-5
            py-2

            rounded-2xl

            border
            border-slate-200
            dark:border-white/10

            bg-white
            dark:bg-white/[0.03]

            shadow-[0_4px_20px_rgba(15,23,42,0.04)]
            dark:shadow-none

            text-blue-500
            dark:text-blue-300

            text-sm

            tracking-[0.18em]
            uppercase

            mb-6
            "
          >
            {t("about.label")}
          </div>

          {/* Heading */}
          <h2
            className="
            text-4xl
            md:text-6xl

            font-black

            leading-tight
            tracking-tight

            text-foreground
            dark:text-white
            "
          >
            {t("about.heading")}
            <br />

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
              {t("about.headingHighlight")}
            </span>
          </h2>

          {/* Description */}
          <p
            className="
            mt-8

            max-w-3xl
            mx-auto

            text-muted
            dark:text-gray-400

            text-lg

            leading-relaxed
            "
          >
            {t("about.description")}
          </p>
        </motion.div>

        {/* ====================================
           CARDS
        ==================================== */}

        <motion.div
          variants={
            containerVariants
          }
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
          grid

          md:grid-cols-2
          xl:grid-cols-3

          gap-8
          "
        >
          {/* ====================================
             BIO
          ==================================== */}

          <AboutCard
            icon={FaUserTie}
            title={t("about.bio.title")}
          >
            <p>
              {t("about.bio.paragraph1Start")}{" "}

              <span
                className="
                text-blue-500
                dark:text-blue-300

                font-semibold
                "
              >
                {t("about.bio.paragraph1Highlight")}
              </span>{" "}

              {t("about.bio.paragraph1Middle")}{" "}

              <span
                className="
                text-blue-500
                dark:text-blue-300

                font-semibold
                "
              >
                {t("about.bio.paragraph1Highlight2")}
              </span>
              {t("about.bio.paragraph1End")}
            </p>

            <p>
              {t("about.bio.paragraph2")}
            </p>

            <a
              href="#skills"
              className="
              inline-flex
              items-center
              gap-2

              mt-4

              text-blue-500
              dark:text-blue-300

              font-medium

              hover:text-cyan-500
              dark:hover:text-cyan-300

              transition-colors
              "
            >
              {t("about.bio.cta")}
            </a>
          </AboutCard>

          {/* ====================================
             EDUCATION
          ==================================== */}

          <AboutCard
            icon={FaGraduationCap}
            title={t("about.education.title")}
          >
            <div className="space-y-6">
              {t("about.education.entries").map((entry, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <div
                      className="
                      w-full
                      h-px

                      bg-slate-200
                      dark:bg-white/10
                      "
                    />
                  )}
                  <div>
                    <h4
                      className="
                      text-foreground
                      dark:text-white

                      font-semibold
                      text-lg
                      "
                    >
                      {entry.title}
                    </h4>

                    <p
                      className="
                      text-blue-500
                      dark:text-blue-300

                      mt-1
                      "
                    >
                      {entry.institution}
                    </p>

                    <span
                      className="
                      text-sm
                      text-gray-500
                      "
                    >
                      {entry.period}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </AboutCard>

          {/* ====================================
             EXPERIENCE
          ==================================== */}

          <AboutCard
            icon={FaBriefcase}
            title={t("about.experience.title")}
          >
            <div className="space-y-6">
              {t("about.experience.entries").map((entry, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <div
                      className="
                      w-full
                      h-px

                      bg-slate-200
                      dark:bg-white/10
                      "
                    />
                  )}
                  <div>
                    <h4
                      className="
                      text-foreground
                      dark:text-white

                      font-semibold
                      text-lg
                      "
                    >
                      {entry.role}
                    </h4>

                    <p
                      className="
                      text-muted
                      dark:text-gray-400

                      mt-1
                      "
                    >
                      {entry.description}
                    </p>

                    <span
                      className="
                      text-sm

                      text-blue-500
                      dark:text-blue-300
                      "
                    >
                      {entry.period}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </AboutCard>
        </motion.div>
      </div>
    </section>
  );
}