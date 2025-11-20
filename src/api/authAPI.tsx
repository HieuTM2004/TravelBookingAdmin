import axios from "axios";
import apiClient from "./apiClient";

interface LoginDto {
  userNameOrEmail: string;
  password: string;
}

interface RegisterAdminDto {
  userName: string;
  password: string;
}

interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userName: string;
  email: string;
}

interface ChangePasswordDto {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const registerAdmin = async (
  registerDto: RegisterAdminDto
): Promise<AuthResponseDto> => {
  try {
    const response = await apiClient.post("/Auth/admin-register", registerDto);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Failed to register admin");
    }
    throw new Error("Failed to register admin");
  }
};

export const login = async (loginDto: LoginDto): Promise<AuthResponseDto> => {
  try {
    const response = await apiClient.post("/Auth/login", loginDto);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Failed to login");
    }
    throw new Error("Failed to login");
  }
};

export const refreshTokenRequest = async (tokens: {
  accessToken: string;
  refreshToken: string;
}): Promise<AuthResponseDto> => {
  const response = await apiClient.post("/Auth/refresh", tokens);
  return response.data;
};

export const changePassword = async (
  changePasswordDto: ChangePasswordDto
): Promise<void> => {
  try {
    const response = await apiClient.put(
      "/Auth/change-password",
      changePasswordDto
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Failed to change password");
    }
    throw new Error("Failed to change password");
  }
};
