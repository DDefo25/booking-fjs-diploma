export interface LoginUserResponseDto {
  user: {
    email: string;
    name: string;
    contactPhone: string;
  };
  token: string;
  refreshToken: string;
}
