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
              width={50}
              height={50}
            />
          </Link>
        </div>

        {/* MENU */}
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
            <a href="#contact">Contato</a>
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

          <Link href="/login">
            <div className="user-icon">
              <Image
                src="/icons/user.png"
                alt="Usuário"
                width={32}
                height={32}
              />
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}