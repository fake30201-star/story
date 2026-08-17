'use client';

import { useEffect, useState } from "react";

export function Countdown() {
  const target = new Date(Date.now() + 1000 * 60 * 60 * 42 + 1000 * 60 * 18 + 1000 * 15);
  const [timeLeft, setTimeLeft] = useState(target.getTime() - Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(Math.max(target.getTime() - Date.now(), 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const units = [
    { label: "يوم", value: days },
    { label: "ساعة", value: hours },
    { label: "دقيقة", value: minutes },
    { label: "ثانية", value: seconds },
  ];

  return (
    <div className="flex items-center gap-3 text-center">
      {units.map((unit) => (
        <div key={unit.label} className="rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm">
          <div className="text-2xl font-bold text-white">{String(unit.value).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase text-white/70">{unit.label}</div>
        </div>
      ))}
    </div>
  );
}
