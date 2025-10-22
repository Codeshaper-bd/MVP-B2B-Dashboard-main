"use client";

import { Check, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          rounded="full"
          className="h-auto w-auto bg-transparent text-default-900 text-secondary-foreground hover:bg-secondary hover:ring-0 hover:ring-offset-0 md:h-8 md:w-8 md:bg-secondary"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "mb-[2px] cursor-pointer p-2 text-sm font-medium text-default-600",
            {
              "bg-default text-default-foreground": theme === "light",
            },
          )}
        >
          <Icon icon="heroicons-outline:sun" className="me-2 h-5 w-5" />
          <span className="me-2">Light</span>
          <Check
            className={cn("ms-auto h-4 w-4 flex-none", {
              hidden: theme !== "light",
            })}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "mb-[2px] cursor-pointer p-2 text-sm font-medium text-default-600 hover:bg-default hover:text-default-foreground dark:hover:bg-background",
            {
              "bg-default text-default-foreground": theme === "dark",
            },
          )}
        >
          <Icon icon="heroicons-outline:moon" className="me-2 h-5 w-5" />
          <span className="me-2">Dark</span>
          <Check
            className={cn("ms-auto h-4 w-4 flex-none text-default-700", {
              hidden: theme !== "dark",
            })}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "mb-[2px] cursor-pointer p-2 text-sm font-medium text-default-600 hover:bg-default hover:text-default-foreground dark:hover:bg-background",
            {
              "bg-default text-default-foreground": theme === "system",
            },
          )}
        >
          <Icon icon="heroicons:computer-desktop" className="me-2 h-5 w-5" />
          <span className="me-2">system</span>
          <Check
            className={cn("ms-auto h-4 w-4 flex-none text-default-700", {
              hidden: theme !== "system",
            })}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeButton;
