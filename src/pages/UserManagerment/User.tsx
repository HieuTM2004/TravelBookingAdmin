import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import PageMeta from "../../components/common/PageMeta";
import UserCard from "../../components/user/UserCard";

// Dữ liệu giả lập cho danh sách người dùng
const users = [
  {
    username: "john_doe",
    email: "john.doe@example.com",
    phonenumber: "+1234567890",
    fullname: "John Doe",
    dateofbirth: "1990-05-15",
    gender: "Male",
    avatarURL: "https://example.com/avatars/john_doe.jpg",
    registrationDate: "2023-01-10",
    lastLoginDate: "2025-05-08",
    purchases: ["Book 1", "Book 2"],
    progress: ["Book 1: 50%", "Book 2: 20%"],
    bookmarks: ["Book 1 - Chapter 3", "Book 2 - Chapter 1"],
    favorites: ["Book 1", "Book 3"],
    playlist: ["Playlist 1", "Playlist 2"],
    ratings: ["Book 1: 4/5", "Book 2: 3/5"],
    downloads: ["Book 1", "Book 2"],
  },
  {
    username: "jane_smith",
    email: "jane.smith@example.com",
    phonenumber: "+0987654321",
    fullname: "Jane Smith",
    dateofbirth: "1995-08-22",
    gender: "Female",
    avatarURL: "https://example.com/avatars/jane_smith.jpg",
    registrationDate: "2023-02-15",
    lastLoginDate: "2025-05-07",
    purchases: ["Book 3", "Book 4"],
    progress: ["Book 3: 75%", "Book 4: 10%"],
    bookmarks: ["Book 3 - Chapter 5"],
    favorites: ["Book 4"],
    playlist: ["Playlist 3"],
    ratings: ["Book 3: 5/5"],
    downloads: ["Book 3"],
  },
];

export default function User() {
  return (
    <>
      <PageMeta title="User Management" description="User Management" />
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <ComponentCard title="User Management">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user, index) => (
              <UserCard key={index} user={user} />
            ))}
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
