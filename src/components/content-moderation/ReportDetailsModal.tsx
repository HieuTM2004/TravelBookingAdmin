import { Modal } from "../ui/modal/Modal";
import Button from "../ui/button/Button";
import Label from "../form/Label";

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

interface ReportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report;
  onUpdate: (updatedReport: Partial<Report>) => void;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  isOpen,
  onClose,
  report,
  onUpdate,
}) => {
  const handleBlockAccount = () => {
    onUpdate({ status: "resolved", isBlocked: true });
    onClose();
  };

  const handleUnblockAccount = () => {
    onUpdate({ status: "resolved", isBlocked: false });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] m-4 w-full h-full"
    >
      <div className="relative w-full min-h-full p-4 overflow-y-auto bg-white rounded-3xl dark:bg-gray-900 lg:p-6">
        <div className="px-2">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Report Details: {report.user}
          </h4>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 lg:mb-5">
            Review the report and take appropriate action.
          </p>
        </div>
        <div className="px-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Label>User</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {report.user}
              </p>
            </div>
            <div>
              <Label>Reported By</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {report.reportedBy}
              </p>
            </div>
            <div>
              <Label>Reason</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {report.reason}
              </p>
            </div>
            <div>
              <Label>Date</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {report.date}
              </p>
            </div>
            <div className="lg:col-span-2">
              <Label>Details</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {report.details}
              </p>
            </div>
            <div>
              <Label>Status</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {report.status}
              </p>
            </div>
            <div>
              <Label>Account Status</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {report.isBlocked ? "Blocked" : "Active"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>
          {report.isBlocked ? (
            <Button size="sm" onClick={handleUnblockAccount}>
              Unblock Account
            </Button>
          ) : (
            <Button size="sm" onClick={handleBlockAccount}>
              Block Account
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ReportDetailsModal;
