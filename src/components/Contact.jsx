// src/components/Contact.jsx

import { useRef, useState } from "react";

import { motion } from "framer-motion";

import {
  Mail,
  Send,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import { fadeInUp } from "../utils/motionVariants";

import emailjs from "@emailjs/browser";

import toast, {
  Toaster,
} from "react-hot-toast";

/* ======================================================
   ENV
====================================================== */

const SERVICE_ID =
  import.meta.env
    .VITE_EMAILJS_SERVICE_ID;

const TEMPLATE_ID =
  import.meta.env
    .VITE_EMAILJS_TEMPLATE_ID;

const PUBLIC_KEY =
  import.meta.env
    .VITE_EMAILJS_PUBLIC_KEY;

/* ======================================================
   CONSTANTS
====================================================== */

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/* ======================================================
   FLOATING INPUT
====================================================== */

function FloatingField({
  tag: Tag = "input",
  name,
  value,
  onChange,
  onBlur,
  label,
  required,
  type,
  rows,
  error,
  inputRef,
  autoComplete,
  spellCheck,
  className = "",
}) {
  return (
    <div
      className={`
      relative
      w-full
      ${className}
      `}
    >
      {/* Input */}
      <Tag
        id={name}
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder=" "
        rows={rows}
        required={required}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
        aria-invalid={
          error ? "true" : "false"
        }
        aria-describedby={
          error
            ? `${name}-error`
            : undefined
        }
        className="
        peer

        w-full

        rounded-2xl

        border
        border-slate-200
        dark:border-white/10

        bg-white
        dark:bg-white/[0.03]

        shadow-[0_2px_10px_rgba(15,23,42,0.03)]
        dark:shadow-none

        backdrop-blur-xl

        px-5
        pt-6
        pb-3

        text-foreground
        dark:text-white

        outline-none

        transition-all
        duration-300

        placeholder-transparent

        focus:border-blue-400/40

        focus:bg-slate-50
        dark:focus:bg-white/[0.05]

        resize-none
        "
      />

      {/* Label */}
      <label
        htmlFor={name}
        className="
        absolute
        left-5
        top-4

        text-gray-500

        text-sm

        transition-all
        duration-300

        pointer-events-none

        peer-focus:top-2
        peer-focus:text-xs

        peer-focus:text-blue-500
        dark:peer-focus:text-blue-300

        peer-[:not(:placeholder-shown)]:top-2
        peer-[:not(:placeholder-shown)]:text-xs

        peer-[:not(:placeholder-shown)]:text-blue-500
        dark:peer-[:not(:placeholder-shown)]:text-blue-300
        "
      >
        {label}
      </label>

      {/* Error */}
      {error && (
        <p
          id={`${name}-error`}
          className="
          mt-2

          text-sm
          text-red-400
          "
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ======================================================
   MAIN COMPONENT
====================================================== */

function Contact() {
  const [formData, setFormData] =
    useState(EMPTY_FORM);

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const fieldRefs = useRef({
    name: null,
    email: null,
    subject: null,
    message: null,
  });

  const submittingRef = useRef(false);
  const lastSubmitRef = useRef(0);
  const SUBMIT_COOLDOWN_MS = 30_000;

  /* ======================================================
     VALIDATION
  ====================================================== */

  const validateField = (
    name,
    value
  ) => {
    if (
      name === "name" &&
      !value.trim()
    ) {
      return "Name is required.";
    }

    if (name === "email") {
      if (!value.trim()) {
        return "Email is required.";
      }

      if (
        !EMAIL_REGEX.test(value)
      ) {
        return "Enter a valid email address.";
      }
    }

    if (
      name === "message" &&
      !value.trim()
    ) {
      return "Message is required.";
    }

    return "";
  };

  const validateForm = (
    values
  ) => {
    const nextErrors = {
      name: validateField(
        "name",
        values.name
      ),

      email: validateField(
        "email",
        values.email
      ),

      message: validateField(
        "message",
        values.message
      ),
    };

    return Object.fromEntries(
      Object.entries(
        nextErrors
      ).filter(
        ([, error]) => error
      )
    );
  };

  /* ======================================================
     EVENTS
  ====================================================== */

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      if (!prev[name])
        return prev;

      const nextError =
        validateField(
          name,
          value
        );

      if (!nextError) {
        const {
          [name]: _removed,
          ...rest
        } = prev;

        return rest;
      }

      return {
        ...prev,
        [name]: nextError,
      };
    });
  };

  const handleBlur = (e) => {
    const { name, value } =
      e.target;

    const nextError =
      validateField(name, value);

    setErrors((prev) => {
      if (!nextError) {
        const {
          [name]: _removed,
          ...rest
        } = prev;

        return rest;
      }

      return {
        ...prev,
        [name]: nextError,
      };
    });
  };

  /* ======================================================
     SUBMIT
  ====================================================== */

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      loading ||
      submittingRef.current
    )
      return;

    const now = Date.now();

    if (
      now - lastSubmitRef.current <
      SUBMIT_COOLDOWN_MS
    ) {
      const remaining = Math.ceil(
        (SUBMIT_COOLDOWN_MS -
          (now -
            lastSubmitRef
              .current)) /
          1000
      );

      toast.error(
        `Please wait ${remaining}s before sending another message.`
      );

      return;
    }

    const nextErrors =
      validateForm(formData);

    if (
      Object.keys(nextErrors)
        .length > 0
    ) {
      setErrors(nextErrors);

      const firstInvalidField =
        Object.keys(nextErrors)[0];

      fieldRefs.current[
        firstInvalidField
      ]?.focus();

      toast.error(
        "Please fill all required fields."
      );

      return;
    }

    if (
      !SERVICE_ID ||
      !TEMPLATE_ID ||
      !PUBLIC_KEY
    ) {
      toast.error(
        "Email service is not configured."
      );

      return;
    }

    submittingRef.current =
      true;

    setLoading(true);

    const loadingToast =
      toast.loading(
        "Sending message..."
      );

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:
            formData.name,

          from_email:
            formData.email,

          subject:
            formData.subject ||
            "(No subject)",

          message:
            formData.message,
        },

        PUBLIC_KEY
      );

      toast.dismiss(
        loadingToast
      );

      toast.success(
        "Message sent successfully ✨"
      );

      setFormData(EMPTY_FORM);

      setErrors({});
    } catch (err) {
      if (
        import.meta.env.DEV
      ) {
        console.error(
          "EmailJS error:",
          err
        );
      }

      toast.dismiss(
        loadingToast
      );

      toast.error(
        err.status === 429
          ? "Too many requests. Please try again later."
          : "Failed to send. Check your connection and try again."
      );
    } finally {
      setLoading(false);

      submittingRef.current =
        false;

      lastSubmitRef.current =
        Date.now();
    }
  };

  return (
    <section
      id="contact"
      className="
      relative

      py-28

      overflow-hidden

      bg-slate-50
      dark:bg-background

      transition-colors
      duration-300
      "
    >
      <Toaster position="bottom-center" />

      {/* ======================================================
         BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Left Glow */}
        <div
          className="
          absolute
          left-[-180px]
          top-[10%]

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
          right-[-180px]
          bottom-[0%]

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
           HEADER
        ====================================================== */}

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          className="
          text-center

          mb-16
          "
        >
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
            <Mail className="w-4 h-4" />

            Contact
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
            Let&apos;s Build
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
              Something Great
              Together
            </span>
          </h2>

          {/* Text */}
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
            Have a project, idea,
            or collaboration in
            mind? I’d love to hear
            about it and bring it
            to life.
          </p>
        </motion.div>

        {/* ======================================================
           MAIN GRID
        ====================================================== */}

        <div
          className="
          grid

          lg:grid-cols-[0.95fr_1.05fr]

          gap-10

          items-stretch
          "
        >
          {/* LEFT */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            className="
            relative
            overflow-hidden

            rounded-[32px]

            border
            border-slate-200
            dark:border-white/10

            bg-white
            dark:bg-white/[0.03]

            shadow-[0_10px_40px_rgba(15,23,42,0.05)]
            dark:shadow-none

            backdrop-blur-xl

            p-8
            lg:p-10

            flex
            flex-col
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

              h-full
              "
            >
              {/* Icon */}
              <div
                className="
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

                mb-8
                "
              >
                <Sparkles
                  className="
                  text-blue-500
                  dark:text-blue-300
                  "
                />
              </div>

              {/* Title */}
              <h3
                className="
                text-3xl

                font-bold

                text-foreground
                dark:text-white

                leading-tight
                "
              >
                Open for
                <br />

                <span
                  className="
                  text-blue-500
                  dark:text-blue-300
                  "
                >
                  freelance &
                  creative work
                </span>
              </h3>

              {/* Text */}
              <p
                className="
                mt-6

                text-muted
                dark:text-gray-400

                leading-relaxed
                text-lg
                "
              >
                Whether you need
                a modern website,
                UI/UX design,
                branding, or
                architecture
                presentation work —
                I’m always excited
                to collaborate on
                meaningful
                projects.
              </p>

              {/* Stats */}
              <div
                className="
                mt-10

                space-y-5

                flex-1
                "
              >
                {[
                  "Frontend Development",
                  "UI / UX Design",
                  "Architecture Visualization",
                  "Branding & Creative Design",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                    flex
                    items-center
                    justify-between

                    rounded-2xl

                    border
                    border-slate-200
                    dark:border-white/10

                    bg-slate-50
                    dark:bg-white/[0.03]

                    px-5
                    py-4

                    transition-all
                    duration-300

                    hover:border-blue-200
                    dark:hover:border-blue-400/20

                    hover:bg-blue-50
                    dark:hover:bg-white/[0.05]
                    "
                  >
                    <span
                      className="
                      text-slate-700
                      dark:text-gray-300
                      "
                    >
                      {item}
                    </span>

                    <ArrowUpRight
                      className="
                      w-5
                      h-5

                      text-blue-500
                      dark:text-blue-300
                      "
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            noValidate
            className="
            relative
            overflow-hidden

            rounded-[32px]

            border
            border-slate-200
            dark:border-white/10

            bg-white
            dark:bg-white/[0.03]

            shadow-[0_10px_40px_rgba(15,23,42,0.05)]
            dark:shadow-none

            backdrop-blur-xl

            p-8
            lg:p-10

            flex
            flex-col
            "
          >
            {/* Glow */}
            <div
              className="
              absolute
              inset-0

              opacity-70

              bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_40%)]
              "
            />

            {/* Content */}
            <div
              className="
              relative
              z-10

              flex
              flex-col

              h-full
              "
            >
              {/* Fields */}
              <div className="space-y-6">
                <FloatingField
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  onBlur={
                    handleBlur
                  }
                  label="Your Name"
                  required
                  error={
                    errors.name
                  }
                  inputRef={(
                    node
                  ) => {
                    fieldRefs.current.name =
                      node;
                  }}
                  autoComplete="name"
                />

                <FloatingField
                  name="email"
                  type="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  onBlur={
                    handleBlur
                  }
                  label="Email Address"
                  required
                  error={
                    errors.email
                  }
                  inputRef={(
                    node
                  ) => {
                    fieldRefs.current.email =
                      node;
                  }}
                  autoComplete="email"
                  spellCheck={
                    false
                  }
                />

                <FloatingField
                  name="subject"
                  value={
                    formData.subject
                  }
                  onChange={
                    handleChange
                  }
                  onBlur={
                    handleBlur
                  }
                  label="Subject"
                  inputRef={(
                    node
                  ) => {
                    fieldRefs.current.subject =
                      node;
                  }}
                  autoComplete="off"
                />
              </div>

              {/* Message */}
              <div
                className="
                mt-6

                flex-1

                flex
                "
              >
                <FloatingField
                  tag="textarea"
                  name="message"
                  value={
                    formData.message
                  }
                  onChange={
                    handleChange
                  }
                  onBlur={
                    handleBlur
                  }
                  label="Your Message"
                  required
                  rows={8}
                  error={
                    errors.message
                  }
                  inputRef={(
                    node
                  ) => {
                    fieldRefs.current.message =
                      node;
                  }}
                  autoComplete="off"
                  className="flex-1"
                />
              </div>

              {/* Footer */}
              <div
                className="
                flex
                flex-col
                sm:flex-row

                sm:items-center
                sm:justify-between

                gap-5

                pt-8
                "
              >
                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                  group

                  w-full
                  sm:w-auto

                  inline-flex
                  items-center
                  justify-center
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

                  hover:scale-[1.02]

                  hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]

                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  "
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send
                      Message

                      <Send
                        className="
                        w-5
                        h-5

                        transition-transform
                        duration-300

                        group-hover:translate-x-1
                        "
                      />
                    </>
                  )}
                </button>

                {/* Text */}
                <p
                  className="
                  text-sm
                  text-gray-500
                  "
                >
                  Usually replies
                  within 24 hours.
                </p>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;