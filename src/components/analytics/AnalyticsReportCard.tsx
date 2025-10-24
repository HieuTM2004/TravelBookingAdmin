interface ReportData {
  title: string;
  data: { label: string; value: string | number }[];
}

interface AnalyticsReportCardProps {
  report: ReportData;
}

const AnalyticsReportCard: React.FC<AnalyticsReportCardProps> = ({
  report,
}) => {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-3">
        {report.title}
      </h4>
      <div className="space-y-2">
        {report.data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-sm text-gray-600 dark:text-gray-400"
          >
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsReportCard;
