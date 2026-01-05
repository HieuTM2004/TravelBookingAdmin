import IncomeAnalytics from "../../components/dashboard/IncomeAnalytics";
import ReviewAnalytics from "../../components/dashboard/ReviewAnalytics";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";

export default function Home() {
  return (
    <div className="p-4 mx-auto max-w-screen-2xl md:p-6">
      {/* Tiêu đề trang */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
          Dashboard Overview
        </h2>
        <p className="text-sm text-gray-500">
          Welcome back to the Admin Dashboard.
        </p>
      </div>

      <EcommerceMetrics />

      <div className="grid grid-cols-1 gap-6 mt-6 xl:grid-cols-1">
        <IncomeAnalytics />
        <ReviewAnalytics />
      </div>
    </div>
  );
}
