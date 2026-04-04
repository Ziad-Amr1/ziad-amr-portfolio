// src/components/Contact.jsx
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/motionVariants";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

// ─────────────────────────────────────────
// Fix: keys read from .env ONLY — no fallback hardcoded values.
// If a key is missing, submission fails gracefully with an error toast.
// Add to your .env:
//   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
//   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
//   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
// ─────────────────────────────────────────

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

// ─────────────────────────────────────────
// Floating label input — reusable within this file
// ─────────────────────────────────────────

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
}) {
  return (
    <div className="relative mb-6">
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
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        className="
          peer w-full bg-transparent border-b-2
          border-gray-300 dark:border-gray-600
          aria-[invalid=true]:border-red-500 dark:aria-[invalid=true]:border-red-400
          focus:border-blue-600 dark:focus:border-blue-soft
          outline-none py-2
          text-gray-700 dark:text-dark-text
          resize-none
        "
      />
      <label
        htmlFor={name}
        className="
          absolute left-0 top-2 text-sm text-gray-500 transition-all pointer-events-none
          peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-soft
          peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-xs
          peer-[:not(:placeholder-shown)]:text-blue-600 dark:peer-[:not(:placeholder-shown)]:text-blue-soft
        "
      >
        {label}
      </label>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-600 dark:text-red-400" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// Component
// ─────────────────────────────────────────

function Contact() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({
    name: null,
    email: null,
    subject: null,
    message: null,
  });

  const validateField = (name, value) => {
    if (name === "name" && !value.trim()) return "Name is required.";
    if (name === "email") {
      if (!value.trim()) return "Email is required.";
      if (!EMAIL_REGEX.test(value)) return "Enter a valid email address.";
    }
    if (name === "message" && !value.trim()) return "Message is required.";
    return "";
  };

  const validateForm = (values) => {
    const nextErrors = {
      name: validateField("name", values.name),
      email: validateField("email", values.email),
      message: validateField("message", values.message),
    };

    return Object.fromEntries(
      Object.entries(nextErrors).filter(([, error]) => error),
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const nextError = validateField(name, value);
      if (prev[name] === nextError) return prev;
      if (!nextError) {
        const { [name]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: nextError };
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const nextError = validateField(name, value);

    setErrors((prev) => {
      if (!nextError && !prev[name]) return prev;
      if (!nextError) {
        const { [name]: _removed, ...rest } = prev;
        return rest;
      }
      if (prev[name] === nextError) return prev;
      return { ...prev, [name]: nextError };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validateForm(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalidField = Object.keys(nextErrors)[0];
      fieldRefs.current[firstInvalidField]?.focus();
      toast.error("Please fill all required fields.");
      return;
    }
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast.error("Email service is not configured.");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Sending message…");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  formData.name,
          from_email: formData.email,
          subject:    formData.subject || "(No subject)",
          message:    formData.message,
        },
        PUBLIC_KEY,
      );

      toast.dismiss(loadingToast);
      toast.success("Message sent successfully ✨");
      setFormData(EMPTY_FORM);
      setErrors({});
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <Toaster position="bottom-center" />

      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="
            text-4xl md:text-5xl font-bold leading-tight
            md:leading-[1.15] pb-1
            bg-gradient-to-r from-blue-link to-blue-muted
            bg-clip-text text-transparent
          ">
            Let's Work Together
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Have a project in mind? I'd love to hear about it.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            mt-10 p-6 sm:p-8 rounded-2xl
            bg-surface-light dark:bg-dark-card
            shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            dark:shadow-[0_8px_30px_rgba(174,212,255,0.08)]
          "
          noValidate
        >
          <FloatingField name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} label="Name" required error={errors.name} inputRef={(node) => { fieldRefs.current.name = node; }} autoComplete="name" />
          <FloatingField name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} label="Email" required type="email" error={errors.email} inputRef={(node) => { fieldRefs.current.email = node; }} autoComplete="email" spellCheck={false} />
          <FloatingField name="subject" value={formData.subject} onChange={handleChange} onBlur={handleBlur} label="Subject (optional)" inputRef={(node) => { fieldRefs.current.subject = node; }} autoComplete="off" />
          <FloatingField tag="textarea" name="message" value={formData.message} onChange={handleChange} onBlur={handleBlur} label="Message" required rows={5} error={errors.message} inputRef={(node) => { fieldRefs.current.message = node; }} autoComplete="off" />

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="
                px-7 py-3 rounded-full font-semibold
                bg-blue-600 text-white
                dark:bg-blue-soft dark:text-dark
                hover:scale-[1.02] transition
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? "Sending…" : "Send message"}
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              I usually respond within 24 hours.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;
