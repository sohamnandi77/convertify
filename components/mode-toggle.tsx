"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [mount, setMount] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <Button
      variant={"ghost"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mount && theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
