import axios from "axios";
import apiClient from "./apiClient";
interface LoginDto {
  email: string;
  password: string;
}

interface RefreshRequestDto {
  accessToken: string;
  refreshToken: string;
}

interface AuthDto {
  id: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

interface ChangePasswordDto {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const login = async (loginDto: LoginDto): Promise<AuthDto> => {
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

export const refreshTokenRequest = async (
  refreshDto: RefreshRequestDto
): Promise<AuthDto> => {
  try {
    const response = await apiClient.post("/Auth/refresh-token", refreshDto);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Failed to refresh token");
    }
    throw new Error("Failed to refresh token");
  }
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
