import { useCallback } from "react";
import en from "./locales/en.json";

function getNestedValue(obj, path) {
  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return current[key];
    }
    return undefined;
  }, obj);
}

function interpolate(template, values) {
  if (!values) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return key in values ? String(values[key]) : `{{${key}}}`;
  });
}

export function useTranslation() {
  const t = useCallback((key, values) => {
    const value = getNestedValue(en, key);
    if (value === undefined) {
      if (import.meta.env.DEV) {
        console.warn(`[i18n] Missing translation key: "${key}"`);
      }
      return key;
    }
    return interpolate(value, values);
  }, []);

  return { t };
}
