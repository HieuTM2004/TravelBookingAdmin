import { useEffect, useState, useCallback } from "react";
import {
  getIncomeAnalytics,
  AccomIncomeAnalytics,
  ReviewQueryParams,
} from "../../api/dashboardAPI";

export default function IncomeAnalytics() {
  const [data, setData] = useState<AccomIncomeAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ReviewQueryParams>({
    year: 2026,
    granularity: 1,
  });

  const fetchIncome = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getIncomeAnalytics(filters);
      setData(res);
    } catch (error) {
      console.error("Error fetching income analytics:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchIncome();
  }, [fetchIncome]);

  const handleFilterChange = (name: keyof ReviewQueryParams, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [name]:
        value === "" ||
        (typeof value === "string" &&
          isNaN(parseInt(value)) &&
          name !== "from" &&
          name !== "to")
          ? undefined
          : ["year", "month", "granularity"].includes(name)
          ? parseInt(value)
          : value,
    }));
  };

  // Currency formatter (keeps VND but uses English locale for formatting)
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(val);

  const inputClass =
    "w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all \
    bg-white border-gray-200 text-gray-800 \
    dark:bg-gray-900 dark:border-gray-700 dark:text-white \
    focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500";

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex flex-col gap-6 mb-8 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Income Analytics
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track revenue growth across all accommodations
          </p>
        </div>

        {/* TOOLBAR FILTERS */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <div>
            <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Year
            </label>
            <input
              type="number"
              className={inputClass}
              value={filters.year ?? ""}
              onChange={(e) => handleFilterChange("year", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Month
            </label>
            <select
              className={inputClass}
              value={filters.month || ""}
              onChange={(e) => handleFilterChange("month", e.target.value)}
            >
              <option value="">All Months</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Month {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              From Date
            </label>
            <input
              type="date"
              className={inputClass}
              value={filters.from || ""}
              onClick={(e) => e.currentTarget.showPicker?.()}
              onChange={(e) => handleFilterChange("from", e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              To Date
            </label>
            <input
              type="date"
              className={inputClass}
              value={filters.to || ""}
              onClick={(e) => e.currentTarget.showPicker?.()}
              onChange={(e) => handleFilterChange("to", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Granularity
            </label>
            <select
              className="w-full px-3 py-2 text-sm font-medium text-white border border-transparent rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors"
              value={filters.granularity}
              onChange={(e) =>
                handleFilterChange("granularity", e.target.value)
              }
            >
              <option value={0}>Daily</option>
              <option value={1}>Monthly</option>
              <option value={2}>Yearly</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div
              key={item.accomId}
              className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 dark:border-gray-800 dark:bg-white/[0.02] hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="max-w-[65%]">
                  <h4 className="font-bold text-gray-800 dark:text-white/90 truncate">
                    {item.accomName}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">
                    ID: {item.accomId.slice(0, 8)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(item.total)}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-medium">
                    Total Revenue
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-2">
                  Recent Trends
                </p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {item.points.slice(-5).map((p, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 px-3 py-2 bg-white border border-gray-100 rounded-xl dark:bg-gray-800 dark:border-gray-700 min-w-[90px]"
                    >
                      <div className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">
                        {p.period}
                      </div>
                      <div className="text-xs font-bold text-gray-700 dark:text-white">
                        {formatCurrency(p.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {data.length === 0 && (
            <div className="col-span-full py-10 text-center text-gray-500 dark:text-gray-400 italic text-sm">
              No income data found for the selected period.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
