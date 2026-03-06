"use client";

import { useEffect, useState, useRef } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  days: ContributionDay[];
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const BLOCK_CHARS = [" ", "░", "▒", "▓", "█"];
const BLOCK_COLORS = [
  "text-dos-bright-black",
  "text-[#005500]",
  "text-dos-green",
  "text-[#00FF00]",
  "text-dos-bright-green",
];

const cache = new Map<string, any>();

async function cachedFetch(url: string) {
  if (cache.has(url)) return cache.get(url);
  const res = await fetch(url);
  const data = await res.json();
  cache.set(url, data);
  return data;
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
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    async function fetchAccountCreation() {
      try {
        const data = await cachedFetch(
          `https://api.github.com/users/${username}`
        );
        if (mountedRef.current && data.created_at) {
          setAccountCreationYear(new Date(data.created_at).getFullYear());
        }
      } catch (error) {
        console.error("Error fetching account creation date:", error);
        if (mountedRef.current) setAccountCreationYear(2015);
      }
    }

    fetchAccountCreation();
  }, [username]);

  useEffect(() => {
    async function fetchContributions() {
      setLoading(true);
      try {
        const yearParam = selectedYear === currentYear ? "last" : selectedYear;
        const url = `https://github-contributions-api.jogruber.de/v4/${username}?y=${yearParam}`;
        const data = await cachedFetch(url);

        if (mountedRef.current && data.contributions) {
          const contributionWeeks: ContributionWeek[] = [];
          const contributions = data.contributions;

          let currentWeek: ContributionDay[] = [];
          contributions.forEach((day: any) => {
            const date = parseDate(day.date);
            const dayOfWeek = date.getDay();

            currentWeek.push({
              date: day.date,
              count: day.count,
              level: day.level,
            });

            if (dayOfWeek === 6) {
              contributionWeeks.push({ days: [...currentWeek] });
              currentWeek = [];
            }
          });

          if (currentWeek.length > 0) {
            contributionWeeks.push({ days: [...currentWeek] });
          }

          setWeeks(contributionWeeks);
          setTotalContributions(data.total[Object.keys(data.total)[0]] || 0);
        }
        if (mountedRef.current) setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        if (mountedRef.current) setLoading(false);
      }
    }

    fetchContributions();
  }, [username, selectedYear, currentYear]);

  const minYear = accountCreationYear ?? currentYear;
  const canGoBack = selectedYear > minYear;
  const canGoForward = selectedYear < currentYear;

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

  return (
    <div className="w-full border border-dos-white p-3">
      <div className="text-dos-bright-white mb-3 border-b border-dos-white pb-1">
        ══ GITHUB CONTRIBUTIONS ══
      </div>

      {/* Year selector */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => canGoBack && setSelectedYear((y) => y - 1)}
            disabled={!canGoBack || loading}
            className={`px-1 transition-colors ${
              canGoBack && !loading
                ? "text-dos-bright-cyan hover:bg-dos-cyan hover:text-dos-black cursor-pointer"
                : "text-dos-bright-black cursor-default"
            }`}
          >
            {"<"}
          </button>
          <span className="text-dos-bright-white min-w-[4ch] text-center">
            {selectedYear}
          </span>
          <button
            onClick={() => canGoForward && setSelectedYear((y) => y + 1)}
            disabled={!canGoForward || loading}
            className={`px-1 transition-colors ${
              canGoForward && !loading
                ? "text-dos-bright-cyan hover:bg-dos-cyan hover:text-dos-black cursor-pointer"
                : "text-dos-bright-black cursor-default"
            }`}
          >
            {">"}
          </button>
        </div>
        <div className="text-sm text-dos-bright-black">
          {loading ? (
            "Loading..."
          ) : (
            <>
              {totalContributions.toLocaleString()} contribution
              {totalContributions !== 1 ? "s" : ""}
            </>
          )}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-1">
            <div className="w-6 sm:w-8" />
            <div className="flex-1 relative h-4">
              {monthLabels.map((label, index) => (
                <div
                  key={index}
                  className="absolute text-xs text-dos-bright-black"
                  style={{ left: `${label.offset * 11}px` }}
                >
                  {label.month}
                </div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="flex gap-0">
            {/* Day labels */}
            <div className="flex flex-col justify-around text-[10px] sm:text-xs text-dos-bright-black pr-1 w-6 sm:w-8">
              <div>Mo</div>
              <div>We</div>
              <div>Fr</div>
            </div>

            {/* Contribution grid */}
            <div className="flex gap-0 flex-1 leading-none" style={{ fontSize: "10px" }}>
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-0">
                  {weekIndex === 0 &&
                    Array.from({
                      length: parseDate(week.days[0].date).getDay(),
                    }).map((_, i) => (
                      <div
                        key={`pad-${i}`}
                        className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px]"
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
                    const titleText = `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${formattedDate}`;

                    return (
                      <div
                        key={dayIndex}
                        className={`w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] flex items-center justify-center cursor-default ${BLOCK_COLORS[day.level]} hover:text-dos-bright-white`}
                        title={titleText}
                        style={{ fontSize: "10px", lineHeight: 1 }}
                      >
                        {BLOCK_CHARS[day.level]}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1 mt-3 text-xs text-dos-bright-black">
            <span>Less</span>
            <div className="flex gap-0" style={{ fontSize: "10px" }}>
              {[0, 1, 2, 3, 4].map((level) => (
                <span
                  key={level}
                  className={`w-[11px] h-[11px] inline-flex items-center justify-center ${BLOCK_COLORS[level]}`}
                >
                  {BLOCK_CHARS[level]}
                </span>
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
