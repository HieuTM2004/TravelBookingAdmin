interface Log {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  status: string;
}

interface ActivityLogCardProps {
  log: Log;
}

const ActivityLogCard: React.FC<ActivityLogCardProps> = ({ log }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
            {log.user} - {log.action}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Time: {log.timestamp}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Details: {log.details}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Status: {log.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogCard;
