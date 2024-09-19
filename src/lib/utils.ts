import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const paths = ['sign-in', 'sign-up', 'forget-password', 'reset-password'];

export const proctedRoutes = (str:string) => {
  const cleanedStr = str.startsWith('/') ? str.slice(1) : str;
  return paths.some(p => cleanedStr.startsWith(p));
}