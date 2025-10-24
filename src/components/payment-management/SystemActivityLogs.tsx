import ComponentCard from "../../components/common/ComponentCard";
import ActivityLogCard from "./ActivityLogCard";

// Dữ liệu giả lập cho nhật ký hệ thống
const logs = [
  {
    id: "1",
    timestamp: "2025-05-09 09:30 AM",
    user: "admin",
    action: "Logged in",
    details: "Admin logged into the system.",
    status: "Success",
  },
  {
    id: "2",
    timestamp: "2025-05-09 09:35 AM",
    user: "system",
    action: "Database backup",
    details: "Automatic database backup failed due to connection issue.",
    status: "Failed",
  },
];

const SystemActivityLogs: React.FC = () => {
  return (
    <ComponentCard title="System Activity Logs">
      <div className="space-y-4">
        {logs.length > 0 ? (
          logs.map((log) => <ActivityLogCard key={log.id} log={log} />)
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No activity logs to display.
          </p>
        )}
      </div>
    </ComponentCard>
  );
};

export default SystemActivityLogs;
