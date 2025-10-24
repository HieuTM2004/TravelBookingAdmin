import { useModal } from "../../hooks/useModal";
import Button from "../ui/button/Button";
import EditButton from "../ui/button/EditButton";
import UserDetails from "./UserDetails";
import UserEditModal from "./UserEditModal";

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

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const {
    isOpen: isDetailsOpen,
    openModal: openDetailsModal,
    closeModal: closeDetailsModal,
  } = useModal();
  const {
    isOpen: isEditOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] transition-all hover:shadow-md">
        <img
          src={user.avatarURL}
          alt={user.fullname}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
          {user.fullname}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span className="font-medium">Username:</span> {user.username}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span className="font-medium">Phone:</span> {user.phonenumber}
        </p>
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={openDetailsModal}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            View More
          </Button>
          <EditButton onClick={openEditModal} />
        </div>
      </div>

      <UserDetails
        isOpen={isDetailsOpen}
        onClose={closeDetailsModal}
        user={user}
      />
      <UserEditModal isOpen={isEditOpen} onClose={closeEditModal} user={user} />
    </>
  );
};

export default UserCard;
