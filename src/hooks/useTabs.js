// src/hooks/useTabs.js
import { useState } from "react";

export function useTabs(categories = [], defaultCategory) {
  const [activeTab, setActiveTab] = useState(defaultCategory ?? categories[0] ?? "");

  const changeTab = (category) => {
    if (categories.includes(category)) setActiveTab(category);
  };

  const isActive = (category) => activeTab === category;

  return { activeTab, changeTab, isActive };
}