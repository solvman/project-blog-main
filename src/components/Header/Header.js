"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants";
import Cookies from "js-cookie";

function Header({ theme: initialTheme, className, ...delegated }) {
  const [theme, setTheme] = useState(initialTheme);

  function handleThemeToggle() {
    const nextTheme = theme === "light" ? "dark" : "light";

    // 1 — Change the state variable, for the sun/moon icon
    setTheme(nextTheme);

    // 2 — Update the cookie, for the user's next visit
    Cookies.set("color-theme", nextTheme, {
      expires: 1000,
    });

    // 3 — Update the DOM to present the new colors
    const root = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_COLORS : DARK_COLORS;

    // 3.1 — Edit the data-attribute, so that we can apply CSS
    // conditionally based on the theme.
    root.setAttribute("data-color-theme", nextTheme);

    // 3.2 — Swap out the actual colors on the <html> tag.
    //       We do this by iterating over each CSS variable
    //       and setting it as a new inline style.
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <a
          href="http://localhost:3000/feed.xml"
          rel="noreferrer"
          target="_blank"
        >
          <button className={styles.action}>
            <Rss
              size="1.5rem"
              style={{
                // Optical alignment
                transform: "translate(2px, -2px)",
              }}
            />
            <VisuallyHidden>View RSS feed</VisuallyHidden>
          </button>
        </a>
        <button className={styles.action} onClick={handleThemeToggle}>
          {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
