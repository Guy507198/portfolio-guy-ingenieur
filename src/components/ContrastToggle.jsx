"use client";
import { useEffect, useState } from "react";

export default function ContrastToggle() {
  const [high, setHigh] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("contrast-high") === "1";
    setHigh(saved);
    document.documentElement.setAttribute("data-contrast", saved ? "high" : "normal");
  }, []);

  const toggle = () => {
    const next = !high;
    setHigh(next);
    localStorage.setItem("contrast-high", next ? "1" : "0");
    document.documentElement.setAttribute("data-contrast", next ? "high" : "normal");
  };

  return (
    <button onClick={toggle} className="btn-outline">
      {high ? "Contrast: High" : "Contrast: Normal"}
    </button>
  );
}
