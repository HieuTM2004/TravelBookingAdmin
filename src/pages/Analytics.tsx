import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";
import PageBreadcrumb from "../components/common/PageBreadcrumb";
import PageMeta from "../components/common/PageMeta";

export default function Analytics() {
  return (
    <>
      <PageMeta
        title="Analytics"
        description="View detailed analytics reports"
      />
      <PageBreadcrumb pageTitle="Analytics" />
      <div className="space-y-6">
        <AnalyticsDashboard />
      </div>
    </>
  );
}
