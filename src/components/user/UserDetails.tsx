import { Modal } from "../ui/modal/Modal";
import Label from "../form/Label";

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

interface UserDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ isOpen, onClose, user }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] m-4 w-full h-full"
    >
      <div className="relative w-full min-h-full p-4 overflow-y-auto bg-white rounded-3xl dark:bg-gray-900 lg:p-6">
        <div className="px-2">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            User Details
          </h4>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 lg:mb-5">
            Detailed information about {user.fullname}.
          </p>
        </div>
        <div className="px-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <Label>Avatar</Label>
              <img
                src={user.avatarURL}
                alt={user.fullname}
                className="w-32 h-32 object-cover rounded-lg mt-2"
              />
            </div>
            <div>
              <Label>Full Name</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.fullname}
              </p>
            </div>
            <div>
              <Label>Username</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.username}
              </p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
            </div>
            <div>
              <Label>Phone Number</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.phonenumber}
              </p>
            </div>
            <div>
              <Label>Date of Birth</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.dateofbirth}
              </p>
            </div>
            <div>
              <Label>Gender</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.gender}
              </p>
            </div>
            <div>
              <Label>Registration Date</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.registrationDate}
              </p>
            </div>
            <div>
              <Label>Last Login Date</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.lastLoginDate}
              </p>
            </div>
            <div className="lg:col-span-2">
              <Label>Purchases</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.purchases.length > 0 ? user.purchases.join(", ") : "None"}
              </p>
            </div>
            <div className="lg:col-span-2">
              <Label>Progress</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.progress.length > 0 ? user.progress.join(", ") : "None"}
              </p>
            </div>
            <div className="lg:col-span-2">
              <Label>Bookmarks</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.bookmarks.length > 0 ? user.bookmarks.join(", ") : "None"}
              </p>
            </div>
            <div className="lg:col-span-2">
              <Label>Favorites</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.favorites.length > 0 ? user.favorites.join(", ") : "None"}
              </p>
            </div>
            <div className="lg:col-span-2">
              <Label>Playlists</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.playlist.length > 0 ? user.playlist.join(", ") : "None"}
              </p>
            </div>
            <div className="lg:col-span-2">
              <Label>Ratings</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.ratings.length > 0 ? user.ratings.join(", ") : "None"}
              </p>
            </div>
            <div className="lg:col-span-2">
              <Label>Downloads</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.downloads.length > 0 ? user.downloads.join(", ") : "None"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetails;
