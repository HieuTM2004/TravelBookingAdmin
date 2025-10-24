import { Modal } from "../ui/modal/Modal";
import Button from "../ui/button/Button";

interface User {
  username: string;
  email: string;
  phonenumber: string;
  fullname: string;
  dateofbirth: string;
  gender: string;
  avatarURL: string;
  registrationDate: string;
  lastLoginDate: string;
  purchases: string[];
  progress: string[];
  bookmarks: string[];
  favorites: string[];
  playlist: string[];
  ratings: string[];
  downloads: string[];
}

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] m-4 w-full h-full"
    >
      <div className="relative w-full min-h-full p-4 overflow-y-auto bg-white rounded-3xl dark:bg-gray-900 lg:p-6">
        <div className="px-2">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit User: {user.fullname}
          </h4>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 lg:mb-5">
            Edit details for this user.
          </p>
        </div>
        <div className="px-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Editing functionality will be implemented soon.
          </p>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserEditModal;
