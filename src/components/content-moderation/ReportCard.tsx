import { useModal } from "../../hooks/useModal";
import Button from "../ui/button/Button";
import ReportDetailsModal from "./ReportDetailsModal";

interface Report {
  id: string;
  user: string;
  reportedBy: string;
  reason: string;
  details: string;
  date: string;
  status: string;
  isBlocked: boolean;
}

interface ReportCardProps {
  report: Report;
  onUpdate: (updatedReport: Partial<Report>) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onUpdate }) => {
  const {
    isOpen: isDetailsOpen,
    openModal: openDetailsModal,
    closeModal: closeDetailsModal,
  } = useModal();

  return (
    <>
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
              Report on {report.user} by {report.reportedBy}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Reason: {report.reason}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Status: {report.status} | Account:{" "}
              {report.isBlocked ? "Blocked" : "Active"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Reported on {report.date}
            </p>
          </div>
          <Button size="sm" onClick={openDetailsModal}>
            View Details
          </Button>
        </div>
      </div>

      <ReportDetailsModal
        isOpen={isDetailsOpen}
        onClose={closeDetailsModal}
        report={report}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default ReportCard;
