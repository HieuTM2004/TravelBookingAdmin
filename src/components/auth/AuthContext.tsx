import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { refreshTokenRequest } from "../../api/authAPI";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// SplashScreen component (đơn giản, thay bằng spinner nếu muốn)
const SplashScreen: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const userId = localStorage.getItem("userId");

      if (accessToken && refreshToken && userId) {
        try {
          // Thử làm mới token ngay khi khởi động để kiểm tra tính hợp lệ
          const newTokens = await refreshTokenRequest({
            accessToken,
            refreshToken,
          });
          localStorage.setItem("accessToken", newTokens.accessToken);
          localStorage.setItem("refreshToken", newTokens.refreshToken);
          // userId không thay đổi, giữ nguyên từ localStorage
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token refresh failed:", error);
          // Nếu làm mới token thất bại, xóa token và yêu cầu đăng nhập lại
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userId");
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (accessToken: string, refreshToken: string, userId: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", userId);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    window.location.href = "/signin"; // Hoặc dùng navigate nếu có
  };

  if (isLoading) {
    return <SplashScreen />; // Render splash thay vì children để tránh flash redirect
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
