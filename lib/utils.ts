import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWorkPeriod(startDate: Date, endDate?: Date) {
  if (!endDate) {
    return formatToMMMYYYY(startDate) + " - present";
  } else if (startDate.getFullYear() == endDate.getFullYear()) {
    return formatToMMM(startDate) + " - " + formatToMMMYYYY(endDate);
  } else {
    return formatToMMMYYYY(startDate) + " - " + formatToMMMYYYY(endDate);
  }
}

export function formatToMMM(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short" });
}

export function formatToMMMYYYY(date: Date): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export function formatFromMMMYYYY(dateString: string): Date {
  return new Date(Date.parse(dateString + " 01"));
}
