import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDuration = (duration: string) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return duration;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, hours, minutes, seconds] = match;
  const parts = [];

  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds) parts.push(`${seconds}s`);

  return parts.join(" ");
};

export const calculateStreak = (
  totalStreak: Date[]
): { currentStreak: number; longestStreak: number } => {
  if (!totalStreak || totalStreak.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Sort dates in ascending order
  const sortedDates = [...totalStreak].sort(
    (a, b) => a.getTime() - b.getTime()
  );

  let currentStreak = 1;
  let longestStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const current = sortedDates[i];
    const previous = sortedDates[i - 1];

    // Check if dates are consecutive (one day apart)
    const timeDiff = current.getTime() - previous.getTime();
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

    if (Math.abs(dayDiff - 1) < 0.001) {
      // Using small epsilon for floating-point comparison
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else if (dayDiff > 1) {
      // Reset streak if dates are not consecutive
      currentStreak = 1;
    }
    // If dates are the same, we don't count them as extending the streak
  }

  return {
    currentStreak,
    longestStreak,
  };
};
