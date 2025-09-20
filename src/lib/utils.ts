import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ClassValueLocal =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: boolean }
  | Array<string | number | { [key: string]: boolean } | null | undefined | boolean>;

export function cn(...inputs: ClassValueLocal[]): string {
  // cast via unknown to match clsx parameter types without introducing `any`
  const args = inputs as unknown as Parameters<typeof clsx>;
  return twMerge(clsx(...args));
}
