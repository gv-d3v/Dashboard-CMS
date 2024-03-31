"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const [marginTop, setMarginTop] = useState("0px");

  useEffect(() => {
    const calculateMarginTop = () => {
      const calculatedMarginTop = `${0}px`;
      setMarginTop(calculatedMarginTop);
    };

    calculateMarginTop();

    // Recalculate margin top when window resizes
    window.addEventListener("resize", calculateMarginTop);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", calculateMarginTop);
    };
  }, []);

  return (
    <div
      className="bg-gray-800 footer"
      //style={{ marginTop: `calc(100% - ${marginTop})` }}
    ></div>
  );
}
