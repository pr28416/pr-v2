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
  return date.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
}

export function formatToMMMYYYY(date: Date): string {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function formatFromMMMYYYY(dateString: string): Date {
  const [month, year] = dateString.split(" ");
  return new Date(Date.UTC(parseInt(year), getMonthIndex(month), 1));
}

function getMonthIndex(month: string): number {
  const months = {
    "Jan": 0,
    "Feb": 1,
    "Mar": 2,
    "Apr": 3,
    "May": 4,
    "Jun": 5,
    "Jul": 6,
    "Aug": 7,
    "Sep": 8,
    "Oct": 9,
    "Nov": 10,
    "Dec": 11,
  };
  return months[month as keyof typeof months];
}

export function getDeviceMetadata(): Record<string, string> {
  const metadata: Record<string, string> = {};

  // Browser info
  metadata.userAgent = navigator.userAgent;
  metadata.browser = getBrowser();
  metadata.browserVersion = getBrowserVersion();

  // Screen and window
  metadata.screenWidth = window.screen.width.toString();
  metadata.screenHeight = window.screen.height.toString();
  metadata.windowWidth = window.innerWidth.toString();
  metadata.windowHeight = window.innerHeight.toString();
  metadata.devicePixelRatio = window.devicePixelRatio.toString();

  // Platform
  metadata.platform = navigator.platform;
  metadata.language = navigator.language;

  // Device type
  metadata.deviceType = getDeviceType();

  // Time
  metadata.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  metadata.timestamp = new Date().toISOString();

  return metadata;
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("SamsungBrowser")) return "Samsung Browser";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  if (ua.includes("Edge")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Unknown";
}

function getBrowserVersion(): string {
  const ua = navigator.userAgent;
  let tem: RegExpMatchArray | null;
  let match =
    ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ||
    [];

  if (/trident/i.test(match[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua);
    return tem?.[1] || "";
  }

  if (match[1] === "Chrome") {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) {
      return tem[1];
    }
  }

  match = match[2]
    ? [match[1], match[2]]
    : [navigator.appName, navigator.appVersion, "-?"];
  tem = ua.match(/version\/(\d+)/i);
  if (tem != null) {
    match.splice(1, 1, tem[1]);
  }

  return match[1];
}

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/
      .test(ua)
  ) {
    return "mobile";
  }
  return "desktop";
}
