import ComponentCard from "../../components/common/ComponentCard";
import AnalyticsReportCard from "./AnalyticsReportCard";

// Dữ liệu giả lập cho báo cáo thống kê
const analyticsData = {
  listenCounts: {
    title: "Listen Counts",
    data: [
      { label: "Book 1", value: 1200 },
      { label: "Book 2", value: 850 },
      { label: "Book 3", value: 600 },
    ],
  },
  popularBooks: {
    title: "Popular Books",
    data: [
      { label: "Book 1", value: "1200 listens" },
      { label: "Book 2", value: "850 listens" },
      { label: "Book 3", value: "600 listens" },
    ],
  },
  premiumRevenue: {
    title: "Premium Package Revenue",
    data: [
      { label: "January", value: "$5,000" },
      { label: "February", value: "$6,200" },
      { label: "March", value: "$4,800" },
    ],
  },
  userBehavior: {
    title: "User Behavior",
    data: [
      { label: "Average Listening Time", value: "2.5 hours/day" },
      { label: "Most Active Time", value: "8:00 PM - 10:00 PM" },
      { label: "Preferred Genres", value: "Fiction, Self-Help" },
    ],
  },
};

const AnalyticsDashboard: React.FC = () => {
  return (
    <ComponentCard title="Analytics Dashboard">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <AnalyticsReportCard report={analyticsData.listenCounts} />
        <AnalyticsReportCard report={analyticsData.popularBooks} />
        <AnalyticsReportCard report={analyticsData.premiumRevenue} />
        <AnalyticsReportCard report={analyticsData.userBehavior} />
      </div>
    </ComponentCard>
  );
};

export default AnalyticsDashboard;
