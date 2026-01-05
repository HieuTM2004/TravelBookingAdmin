import { useEffect, useState, useCallback } from "react";
import {
  getReviewAnalytics,
  AccomReviewAnalytics,
  ReviewQueryParams,
} from "../../api/dashboardAPI";

export default function ReviewAnalytics() {
  const [data, setData] = useState<AccomReviewAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<ReviewQueryParams>({
    year: new Date().getFullYear(),
    granularity: 1,
  });

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getReviewAnalytics(filters);
      setData(res);
    } catch (error) {
      console.error("Lỗi fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleFilterChange = (name: keyof ReviewQueryParams, value: any) => {
    setFilters((prev) => {
      let finalValue = value;
      if (["year", "granularity", "month"].includes(name)) {
        finalValue =
          value === "" || isNaN(parseInt(value)) ? undefined : parseInt(value);
      } else if (value === "") {
        finalValue = undefined;
      }
      return { ...prev, [name]: finalValue };
    });
  };

  // Class chung cho Input để code clean hơn
  const inputClass =
    "w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all \
                      bg-white border-gray-200 text-gray-800 \
                      dark:bg-gray-900 dark:border-gray-700 dark:text-white \
                      focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500";

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex flex-col gap-6 mb-8 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Review Analytics
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Rating Growth Analysis Over Time
          </p>
        </div>

        {/* BỘ LỌC */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {/* Year */}
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

          {/* Month */}
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
                  Tháng {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* From Date */}
          <div className="relative">
            <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              From Date
            </label>
            <input
              type="date"
              className={`${inputClass} custom-calendar-icon`}
              value={filters.from || ""}
              onClick={(e) => e.currentTarget.showPicker?.()}
              onChange={(e) => handleFilterChange("from", e.target.value)}
            />
          </div>

          {/* To Date */}
          <div className="relative">
            <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              To Date
            </label>
            <input
              type="date"
              className={`${inputClass} custom-calendar-icon`}
              value={filters.to || ""}
              min={filters.from || undefined}
              onClick={(e) => e.currentTarget.showPicker?.()}
              onChange={(e) => handleFilterChange("to", e.target.value)}
            />
          </div>

          {/* Granularity */}
          <div>
            <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              View By
            </label>
            <select
              className="w-full px-3 py-2 text-sm font-medium text-white border border-transparent rounded-lg outline-none bg-brand-500 hover:bg-brand-600 transition-colors"
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

      {/* HIỂN THỊ DATA */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div
              key={item.accomId}
              className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 \
                         dark:border-gray-800 dark:bg-white/[0.02] hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white/90">
                    {item.accomName}
                  </h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">
                    ID: {item.accomId.slice(0, 8)}
                  </p>
                </div>
                <div className="bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 px-3 py-1 rounded-full text-sm font-bold">
                  {item.total}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-3">
                  Biến động gần đây
                </p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {item.points.slice(-5).map((p, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 px-3 py-2 bg-white border border-gray-100 rounded-xl text-center \
                                 dark:bg-gray-800 dark:border-gray-700 min-w-[60px]"
                    >
                      <div className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">
                        {p.period}
                      </div>
                      <div className="text-xs font-bold text-gray-700 dark:text-white">
                        {p.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {data.length === 0 && (
            <div className="text-center py-10 col-span-full">
              <p className="text-gray-500 dark:text-gray-400 italic">
                Không có dữ liệu cho bộ lọc này.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
