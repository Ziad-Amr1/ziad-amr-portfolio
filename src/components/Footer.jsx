// src/components/Footer.jsx

import { motion } from "framer-motion";

import { fadeInUp } from "../utils/motionVariants";
import { useTranslation } from "../i18n";

import {
  FaLinkedin,
  FaGithub,
  FaDribbble,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

/* ======================================================
   SOCIALS
====================================================== */

const socialLinks = [
  {
    id: "linkedin",
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/ziadamrsaid/",
  },

  {
    id: "github",
    icon: <FaGithub />,
    url: "https://github.com/Ziad-Amr1",
  },

  {
    id: "dribbble",
    icon: <FaDribbble />,
    url: "https://dribbble.com/ziadamrsaid",
  },

  {
    id: "email",
    icon: <FaEnvelope />,
    url: "mailto:zyadamr177@gmail.com",
  },

  {
    id: "phone",
    icon: <FaPhone />,
    url: "tel:01122708543",
  },
];

/* ======================================================
   FOOTER
====================================================== */

function Footer() {
  const { t } = useTranslation();
  return (
    <footer
      className="
      relative
      overflow-hidden

      border-t
      border-slate-200
      dark:border-white/10

      bg-slate-50
      dark:bg-background

      pt-24
      pb-10

      transition-colors
      duration-300
      "
    >
      {/* ======================================================
         BACKGROUND EFFECTS
      ====================================================== */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top Glow */}
        <div
          className="
          absolute
          top-[-180px]
          left-1/2
          -translate-x-1/2

          w-[550px]
          h-[300px]

          rounded-full

          bg-blue-500/10

          blur-[140px]
          "
        />

        {/* Left Glow */}
        <div
          className="
          absolute
          left-[-180px]
          bottom-[-120px]

          w-[350px]
          h-[350px]

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

      <div
        className="
        max-w-[1350px]
        mx-auto

        px-[6%]
        md:px-[8%]
        lg:px-[10%]
        "
      >
        {/* ======================================================
           TOP CTA
        ====================================================== */}

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
          relative
          overflow-hidden

          rounded-[36px]

          border
          border-slate-200
          dark:border-white/10

          bg-white
          dark:bg-white/[0.03]

          shadow-[0_10px_40px_rgba(15,23,42,0.05)]
          dark:shadow-none

          backdrop-blur-xl

          p-8
          md:p-12

          mb-16
          "
        >
          {/* Glow */}
          <div
            className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_45%)]
            "
          />

          <div
            className="
            relative
            z-10

            flex
            flex-col
            lg:flex-row

            items-start
            lg:items-center

            justify-between

            gap-10
            "
          >
            {/* Left */}
            <div className="max-w-2xl">
              {/* Label */}
              <div
                className="
                inline-flex
                items-center
                gap-2

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
                <Sparkles className="w-4 h-4" />

                {t("footer.ctaLabel")}
              </div>

              {/* Heading */}
              <h2
                className="
                text-3xl
                md:text-5xl

                font-black

                leading-tight
                tracking-tight

                text-foreground
                dark:text-white
                "
              >
                {t("footer.ctaHeading")}
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
                  {t("footer.ctaHeadingHighlight")}
                </span>
              </h2>

              {/* Text */}
              <p
                className="
                mt-6

                text-muted
                dark:text-gray-400

                text-lg
                leading-relaxed

                max-w-xl
                "
              >
                {t("footer.ctaDescription")}
              </p>
            </div>

            {/* Button */}
            <a
              href="#contact"
              className="
              group

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

              hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]
              "
            >
              {t("footer.ctaButton")}

              <ArrowUpRight
                className="
                w-5
                h-5

                transition-transform
                duration-300

                group-hover:-translate-y-1
                group-hover:translate-x-1
                "
              />
            </a>
          </div>
        </motion.div>

        {/* ======================================================
           FOOTER MAIN
        ====================================================== */}

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
          flex
          flex-col
          lg:flex-row

          items-center
          justify-between

          gap-10
          "
        >
          {/* LEFT */}
          <div className="text-center lg:text-left">
            {/* Logo */}
            <h3
              className="
              text-3xl

              font-black
              tracking-tight

              text-foreground
              dark:text-white
              "
            >
              Ziad{" "}

              <span
                className="
                bg-gradient-to-r
                from-blue-400
                to-cyan-300

                bg-clip-text
                text-transparent
                "
              >
                Amr
              </span>
            </h3>

            {/* Description */}
            <p
              className="
              mt-4

              text-muted
              dark:text-gray-400

              leading-relaxed

              max-w-md
              "
            >
              {t("footer.description")}
            </p>

            {/* Copyright */}
            <p
              className="
              mt-6

              text-sm

              text-gray-500
              "
            >
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="
            flex
            flex-col

            items-center
            lg:items-end
            "
          >
            {/* Socials */}
            <div
              className="
              flex
              items-center
              flex-wrap
              justify-center

              gap-4
              "
            >
              {socialLinks.map(
                ({
                  id,
                  icon,
                  url,
                }) => (
                  <motion.a
                    key={id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("accessibility.socialLink", { site: id })}
                    whileHover={{
                      y: -4,
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    className="
                    group

                    w-14
                    h-14

                    rounded-2xl

                    border
                    border-slate-200
                    dark:border-white/10

                    bg-white
                    dark:bg-white/[0.03]

                    shadow-[0_4px_18px_rgba(15,23,42,0.04)]
                    dark:shadow-none

                    flex
                    items-center
                    justify-center

                    text-xl

                    text-slate-600
                    dark:text-gray-400

                    hover:text-blue-500
                    dark:hover:text-blue-300

                    hover:border-blue-200
                    dark:hover:border-blue-400/30

                    hover:bg-blue-50
                    dark:hover:bg-blue-500/10

                    hover:shadow-[0_10px_30px_rgba(59,130,246,0.12)]
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

            {/* Divider */}
            <div
              className="
              mt-8

              w-full
              h-px

              bg-gradient-to-r
              from-transparent
              via-slate-300
              dark:via-white/10
              to-transparent
              "
            />

            {/* Bottom Text */}
            <p
              className="
              mt-6

              text-sm

              text-gray-500

              text-center
              lg:text-right
              "
            >
              {t("footer.builtWith")}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;