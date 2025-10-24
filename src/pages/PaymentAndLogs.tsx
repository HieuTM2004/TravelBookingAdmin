import PageBreadcrumb from "../components/common/PageBreadcrumb";
import PageMeta from "../components/common/PageMeta";
import PaymentManagement from "../components/payment-management/PaymentManagement";
import SystemActivityLogs from "../components/payment-management/SystemActivityLogs";

export default function PaymentAndLogs() {
  return (
    <>
      <PageMeta
        title="Payment & Logs"
        description="Manage payments and system activity logs"
      />
      <PageBreadcrumb pageTitle="Payment & Logs" />
      <div className="space-y-6">
        <PaymentManagement />
        <SystemActivityLogs />
      </div>
    </>
  );
}
