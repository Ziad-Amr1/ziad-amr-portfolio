// src/components/Hero.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { FaBehance, FaDribbble, FaGithub, FaLinkedin } from "react-icons/fa";
import useTypingEffect from "../hooks/useTypingEffect";

export default function Hero() {
const titles = useMemo(
  () => ["Frontend Developer", "Graphic Designer", "Architect", "UI/UX Designer", "Creative Coder"],
  []
);

const { text, blink, pause, resume } = useTypingEffect(titles);

const socials = [
  {
    id: "linkedin",
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/ziadamrsaid/"
  },
  { 
    id: "github",
    icon: <FaGithub />,
    link: "https://github.com/Ziad-Amr1/"
  },
  {
    id: "behance",
    icon: <FaBehance />,
    link: "https://www.behance.net/ziadamrsaid",
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
      className={`relative flex flex-col-reverse md:flex-row items-center justify-center
      min-h-[calc(100svh-70px)]
      md:max-h-[calc(100svh-70px)]
      px-[6%] md:px-[10%] lg:px-[12%]
      py-0.5 sm:py-4 md:py-12
      overflow-hidden transition-all duration-700`}
    >
      <div
        className="flex flex-col-reverse md:flex-row items-center justify-between
        gap-6 md:gap-10 lg:gap-14
        p-5 md:p-8 rounded-2xl shadow-xl
        bg-surface-light dark:bg-dark-card bg-opacity-80 backdrop-blur-sm
        w-full max-w-[1200px] mx-auto h-fit md:h-auto"
      >
        {/* Text content */}
        <motion.article
          className="text-center md:text-left max-w-xl md:max-w-[550px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="uppercase tracking-widest font-semibold mb-0 md:mb-3 text-blue-600 dark:text-blue-soft">
            Hello, I'm
          </p>

          <h1
            className="
          text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold mb-0.75 md:mb-3
          leading-tight bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400
          dark:from-blue-soft dark:via-blue-mid dark:to-dark-text
          bg-clip-text text-transparent"
          >
            Ziad Amr
          </h1>

          <div
            className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-dark-text mb-1.25 md:mb-6 min-h-[32px]"
              onMouseEnter={pause}
              onMouseLeave={resume}
          >
            <span>{text}</span>
            <span className="ml-1">{blink ? "|" : " "}</span>
          </div>

          <p className="text-left text-gray-600 dark:text-gray-400 leading-relaxed mb-5 sm:mb-8 text-base md:text-lg">
            Passionate about crafting interactive, responsive, and visually
            engaging digital experiences that merge creativity with functionality.
          </p>

          {/* Buttons */}
          <div className="flex flex-row flex-wrap justify-center md:justify-start gap-4">
            {/* Contact */}
            <a
              href="#contact"
              className="px-5 py-3 text-sm sm:text-base rounded-full font-semibold border transition-all hover:shadow-lg
                  dark:border-blue-soft dark:text-blue-soft dark:hover:bg-blue-soft dark:hover:text-dark
                  border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Get in Touch
            </a>

            {/* Download CV */}
            <a
              href="/images/Ziad_Amr_Said_CV.pdf"
              download
              className="text-sm sm:text-base flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-md transition-all
                        dark:bg-gradient-to-r from-blue-soft to-dark-text dark:hover:from-dark-text dark:hover:to-blue-soft dark:text-dark
                        bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Download className="w-5 h-5" />
              Download CV
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start gap-5 mt-8">
            {socials.map(({ id, icon, link }) => (
              <motion.a
                key={id}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                className="text-2xl transition-colors
              dark:text-blue-soft dark:hover:text-blue-mid text-blue-600 hover:text-blue-500"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.article>

        {/* Profile Image */}
        <motion.figure
          className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72
          rounded-full overflow-hidden shadow-xl border-4 border-blue-500 dark:border-blue-soft p-[3px] flex-shrink-0"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            loading="eager"
            decoding="async"
            fetchPriority="high"
            src="/images/profile/profile.webp"
            alt="Ziad Amr"
            className="rounded-full w-full h-full object-cover object-top"
          />
        </motion.figure>
      </div>
    </section>
  );
}
