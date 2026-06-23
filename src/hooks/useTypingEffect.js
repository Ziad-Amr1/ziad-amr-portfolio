// src/hooks/useTypingEffect.js
import { useState, useEffect, useRef, useMemo } from "react";

export default function useTypingEffect(
  words = [],
  {
    typingSpeed  = 120,
    deletingSpeed = 60,
    pauseTime    = 2000,
    blinkSpeed   = 500,
    autoStart    = true,
  } = {}
) {
  const [text,      setText]      = useState("");
  const [index,     setIndex]     = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink,     setBlink]     = useState(true);
  const [isPaused,  setIsPaused]  = useState(!autoStart);

  const timerRef = useRef(null);

  const safeWords    = useMemo(() => Array.isArray(words) ? words : [], [words]);
  const currentWord  = safeWords[index % safeWords.length] ?? "";

  // ── typing logic ───────────────────────
  useEffect(() => {
    if (!safeWords.length || isPaused) return;

    const delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex < currentWord.length) {
      timerRef.current = setTimeout(() => {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, delay);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timerRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && charIndex > 0) {
      timerRef.current = setTimeout(() => {
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, delay);
    } else {
      setIsDeleting(false);
      setIndex((i) => i + 1);
    }

    return () => clearTimeout(timerRef.current);
  }, [charIndex, isDeleting, index, isPaused, safeWords, currentWord, typingSpeed, deletingSpeed, pauseTime]);

  // ── cursor blink ───────────────────────
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setBlink((b) => !b), blinkSpeed);
    return () => clearInterval(id);
  }, [isPaused, blinkSpeed]);

  const pause  = () => setIsPaused(true);
  const resume = () => setIsPaused(false);
  const reset  = () => {
    clearTimeout(timerRef.current);
    setText(""); setCharIndex(0); setIndex(0);
    setIsDeleting(false); setIsPaused(!autoStart);
  };

  return { text, blink, pause, resume, reset, isPaused };
}