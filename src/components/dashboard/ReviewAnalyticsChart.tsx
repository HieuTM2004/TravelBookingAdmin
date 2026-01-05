import { useEffect, useState } from "react";
import {
  getReviewAnalytics,
  AccomReviewAnalytics,
  ReviewQueryParams,
} from "../../api/dashboardAPI";

export default function ReviewAnalyticsChart() {
  const [data, setData] = useState<AccomReviewAnalytics[]>([]);
  const [filters, setFilters] = useState<ReviewQueryParams>({
    year: 2026,
    granularity: 1, // Mặc định theo tháng
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getReviewAnalytics(filters);
        setData(res);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      }
    };
    fetchAnalytics();
  }, [filters]);

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Review Analytics
        </h3>

        {/* Bộ lọc đơn giản */}
        <div className="flex items-center gap-3">
          <select
            className="p-2 border rounded-lg bg-transparent"
            onChange={(e) =>
              setFilters({ ...filters, granularity: Number(e.target.value) })
            }
          >
            <option value={0}>Daily</option>
            <option value={1}>Monthly</option>
            <option value={2}>Yearly</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.accomId} className="p-4 border rounded-xl">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{item.accomName}</span>
              <span className="text-blue-500 font-bold">
                {item.total} Reviews
              </span>
            </div>
            {/* Đây là nơi bạn đặt biểu đồ (Line Chart) dựa trên item.points */}
            <div className="text-xs text-gray-400">
              Data points: {item.points.length} periods tracked
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
