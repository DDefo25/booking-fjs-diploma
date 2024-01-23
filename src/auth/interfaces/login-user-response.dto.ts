export interface LoginUserResponseDto  {
    user: {
        email: string,
        name: string,
        contactPhone: string
    },
    accessToken: string

}