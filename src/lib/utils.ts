import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isUserPro(user: any): boolean {
  if (!user) return false;

  console.log("🧠 Checking user metadata:", user.publicMetadata);

  return user.publicMetadata?.isPro === true;
}
