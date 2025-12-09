"use client";

import { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  days: ContributionDay[];
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Parse date string (YYYY-MM-DD) without timezone conversion
function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export default function GitHubCalendar({ username }: { username: string }) {
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [accountCreationYear, setAccountCreationYear] = useState<number | null>(
    null
  );

  useEffect(() => {
    async function fetchAccountCreation() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        const data = await response.json();
        if (data.created_at) {
          const year = new Date(data.created_at).getFullYear();
          setAccountCreationYear(year);
        }
      } catch (error) {
        console.error("Error fetching account creation date:", error);
        // Default to 2015 if we can't fetch
        setAccountCreationYear(2015);
      }
    }

    fetchAccountCreation();
  }, [username]);

  useEffect(() => {
    async function fetchContributions() {
      setLoading(true);
      try {
        // Fetch from GitHub's public contribution API
        const yearParam = selectedYear === currentYear ? "last" : selectedYear;
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=${yearParam}`
        );
        const data = await response.json();

        if (data.contributions) {
          // Transform the data into weeks
          const contributionWeeks: ContributionWeek[] = [];
          const contributions = data.contributions;

          // Group by weeks (Sunday to Saturday)
          let currentWeek: ContributionDay[] = [];
          contributions.forEach((day: any, index: number) => {
            const date = parseDate(day.date);
            const dayOfWeek = date.getDay();

            currentWeek.push({
              date: day.date,
              count: day.count,
              level: day.level,
            });

            // If it's Saturday, push the week
            if (dayOfWeek === 6) {
              contributionWeeks.push({ days: [...currentWeek] });
              currentWeek = [];
            }
          });

          // Push any remaining days as the final partial week
          if (currentWeek.length > 0) {
            contributionWeeks.push({ days: [...currentWeek] });
          }

          setWeeks(contributionWeeks);
          setTotalContributions(data.total[Object.keys(data.total)[0]] || 0);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        setLoading(false);
      }
    }

    fetchContributions();
  }, [username, selectedYear, currentYear]);

  const getColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-slate-800/50";
      case 1:
        return "bg-green-900/60";
      case 2:
        return "bg-green-700/70";
      case 3:
        return "bg-green-500/80";
      case 4:
        return "bg-green-400";
      default:
        return "bg-slate-800/50";
    }
  };

  const getMonthLabels = () => {
    const labels: { month: string; offset: number }[] = [];
    let currentMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDay = week.days[0];
      if (firstDay) {
        const month = parseDate(firstDay.date).getMonth();
        if (month !== currentMonth) {
          currentMonth = month;
          labels.push({
            month: MONTHS[month],
            offset: weekIndex,
          });
        }
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();

  // Generate available years
  const availableYears =
    accountCreationYear !== null
      ? Array.from(
          { length: currentYear - accountCreationYear + 1 },
          (_, i) => currentYear - i
        )
      : [];

  return (
    <div className="w-full">
      {/* Year selector and stats */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(parseInt(value))}
          disabled={loading || availableYears.length === 0}
        >
          <SelectTrigger className="w-[140px] bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900/95 backdrop-blur-md border-white/10">
            {availableYears.map((year) => (
              <SelectItem
                key={year}
                value={year.toString()}
                className="focus:bg-white/10"
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-sm text-foreground/60">
          {loading ? (
            "Loading contributions..."
          ) : (
            <>
              {totalContributions.toLocaleString()} contribution
              {totalContributions !== 1 ? "s" : ""} in {selectedYear}
            </>
          )}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-2">
            <div className="w-8 sm:w-10" /> {/* Spacer for day labels */}
            <div className="flex-1 relative h-4">
              {monthLabels.map((label, index) => (
                <div
                  key={index}
                  className="absolute text-xs text-foreground/40"
                  style={{ left: `${label.offset * 13}px` }}
                >
                  {label.month}
                </div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col justify-around text-[10px] sm:text-xs text-foreground/40 pr-1 sm:pr-2 w-7 sm:w-8">
              <div>Mon</div>
              <div>Wed</div>
              <div>Fri</div>
            </div>

            {/* Contribution grid */}
            <div className="flex gap-[3px] flex-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {/* Pad the first week if it doesn't start on Sunday */}
                  {weekIndex === 0 &&
                    Array.from({
                      length: parseDate(week.days[0].date).getDay(),
                    }).map((_, i) => (
                      <div
                        key={`pad-${i}`}
                        className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-sm"
                      />
                    ))}

                  {week.days.map((day, dayIndex) => {
                    const date = parseDate(day.date);
                    const formattedDate = date.toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });

                    return (
                      <HoverCard key={dayIndex} openDelay={200}>
                        <HoverCardTrigger asChild>
                          <div
                            className={`w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-sm ${getColor(
                              day.level
                            )} hover:ring-2 hover:ring-green-400/50 transition-all cursor-pointer`}
                          />
                        </HoverCardTrigger>
                        <HoverCardContent
                          className="w-auto p-3 bg-slate-900/95 backdrop-blur-md border-white/10"
                          side="top"
                        >
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">
                              {day.count} contribution
                              {day.count !== 1 ? "s" : ""}
                            </p>
                            <p className="text-xs text-foreground/60">
                              {formattedDate}
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-foreground/40">
            <span>Less</span>
            <div className="flex gap-[3px]">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-sm ${getColor(
                    level
                  )}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
