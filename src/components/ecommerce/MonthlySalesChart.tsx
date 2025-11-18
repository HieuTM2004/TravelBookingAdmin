import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { useState, useEffect } from "react";
import { getIncomeData } from "../../api/dashboardAPI";
import type { AccomIncomeDto, IncomePoint } from "../../types/dashboard.types";

export default function MonthlySalesChart() {
  const [options, setOptions] = useState<ApexOptions>({
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
  });

  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([
    {
      name: "Total Income",
      data: [],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for filters
  const [granularity, setGranularity] = useState<"Day" | "Month" | "Year">(
    "Month"
  );
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [fromDate, setFromDate] = useState<string>(
    formatDate(subDays(new Date(), 30))
  );
  const [toDate, setToDate] = useState<string>(formatDate(new Date()));

  const [isOpen, setIsOpen] = useState(false);

  // Dynamic title based on granularity
  const getTitle = () => {
    switch (granularity) {
      case "Day":
        return "Daily Sales";
      case "Month":
        return "Monthly Sales";
      case "Year":
        return "Yearly Sales";
      default:
        return "Monthly Sales";
    }
  };

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // Native date utils
  function formatDate(date: Date): string {
    return date.toISOString().split("T")[0]; // yyyy-mm-dd
  }

  function subDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
  }

  function startOfMonth(date: Date): Date {
    const newDate = new Date(date);
    newDate.setDate(1);
    return newDate;
  }

  function endOfMonth(date: Date): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    newDate.setDate(0);
    return newDate;
  }

  // Format period for xaxis labels
  function formatPeriod(
    period: string,
    granularity: "Day" | "Month" | "Year"
  ): string {
    const parts = period.split("-").map(Number);
    const yearNum = parts[0];
    const month = parts[1] - 1; // 0-based
    let day = 1;
    if (granularity === "Day") {
      day = parts[2];
    }
    const date = new Date(yearNum, month, day);

    if (granularity === "Day") {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } else if (granularity === "Month") {
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } else {
      return yearNum.toString(); // Just the year
    }
  }

  // Fetch income data (for Year: no year param to get all years)
  const fetchIncomeData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: {
        year?: number;
        from?: string;
        to?: string;
        granularity: "Day" | "Month" | "Year";
      } = {
        granularity,
      };

      if (granularity === "Month") {
        params.year = year; // For Month, use year param
      } else if (granularity === "Day") {
        params.from = fromDate;
        params.to = toDate;
      } else {
        // For Year: No year/from/to param to get all years aggregated
        // Backend will return multiple periods like "2020", "2021", etc.
      }

      const response = await getIncomeData(params);
      const data: AccomIncomeDto[] = response;

      if (data && data.length > 0) {
        // Aggregate total income across all accoms per period (sum amounts)
        const periods = [
          ...new Set(
            data.flatMap((accom: AccomIncomeDto) =>
              accom.points.map((p: IncomePoint) => p.period)
            )
          ),
        ].sort();

        const amounts: number[] = periods.map((period: string) =>
          data.reduce((sum: number, accom: AccomIncomeDto) => {
            const point = accom.points.find(
              (p: IncomePoint) => p.period === period
            );
            return sum + (point ? point.amount : 0);
          }, 0)
        );

        setOptions((prev) => ({
          ...prev,
          xaxis: {
            ...prev.xaxis,
            categories: periods.map((period: string) =>
              formatPeriod(period, granularity)
            ),
          },
        }));

        setSeries([{ name: "Total Income", data: amounts }]);
      } else {
        setSeries([{ name: "Total Income", data: [] }]);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Error fetching income data:", errorMessage);
      setError("Failed to fetch income data. Please try again.");
      setSeries([{ name: "Total Income", data: [] }]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and filter change
  useEffect(() => {
    fetchIncomeData();
  }, [granularity, year, fromDate, toDate]);

  // Update from/to based on granularity (for Day/Month; Year no need)
  useEffect(() => {
    if (granularity === "Day") {
      setFromDate(formatDate(subDays(new Date(), 30)));
      setToDate(formatDate(new Date()));
    } else if (granularity === "Month") {
      setFromDate(formatDate(startOfMonth(new Date())));
      setToDate(formatDate(endOfMonth(new Date())));
    } else {
      // For Year: No update, all years shown
    }
  }, [granularity]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {getTitle()}
        </h3>
        <div className="flex items-center space-x-4">
          {/* Granularity Dropdown */}
          <div className="relative">
            <select
              value={granularity}
              onChange={(e) =>
                setGranularity(e.target.value as "Day" | "Month" | "Year")
              }
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="Day">Daily</option>
              <option value="Month">Monthly</option>
              <option value="Year">Yearly</option>
            </select>
          </div>
          {granularity === "Month" ? (
            <input
              type="number"
              value={year}
              onChange={(e) =>
                setYear(parseInt(e.target.value) || new Date().getFullYear())
              }
              placeholder="Year"
              className="w-20 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          ) : granularity === "Day" ? (
            <div className="flex space-x-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          ) : null}{" "}
          <div className="relative inline-block">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                View More
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : series[0].data.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg mb-2">
            No data available for the selected period.
          </p>
          <p className="text-sm">Try adjusting the filters.</p>
        </div>
      ) : (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
            <Chart options={options} series={series} type="bar" height={180} />
          </div>
        </div>
      )}
    </div>
  );
}
