"use client";

import { ThemeProvider as Theme } from "next-themes";

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <Theme
    attribute="class"
    defaultTheme="system"
    enableSystem
    themes={["light", "dark"]}
  >
    {children}
  </Theme>
);
