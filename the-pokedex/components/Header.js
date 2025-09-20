"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode, mounted]);

  if (!mounted) return null;

  return (
    <header className="site-header">
      <nav className="nav">
        <div className="logo">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={880}
              height={0}
              style={{ height: "auto" }}
            />
          </Link>
        </div>

        <ul className="nav-list">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <a href="#about">Sobre Nós</a>
          </li>
          <li>
            <a href="#how">Como Funciona</a>
          </li>
          <li>
            <Link href="/pokedex">Pokedex</Link>
          </li>
        </ul>

        <div className="right-side">
          <button
            className="theme-button"
            onClick={() => setDarkMode((s) => !s)}
            aria-label="Alternar tema claro/escuro"
          >
            <Image
              src={darkMode ? "/icons/ultra_ball.png" : "/icons/great_ball.png"}
              alt="Tema"
              width={26}
              height={26}
            />
          </button>
        </div>
      </nav>
    </header>
  );
}
