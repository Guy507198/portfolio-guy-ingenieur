"use client";

import { useEffect, useState } from "react";
import ShieldLoader from "./ShieldLoader";

export default function ShieldLoaderGate({ ms = 600 }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [ms]);

  return <ShieldLoader show={loading} />;
}
