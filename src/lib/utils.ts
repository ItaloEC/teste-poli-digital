import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInicials(name: string): string {
  const words = name.trim().split(" ");

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  const firstChar = words[0].charAt(0).toUpperCase();
  const lastChar = words[words.length - 1].charAt(0).toUpperCase();

  return firstChar + lastChar;
}
