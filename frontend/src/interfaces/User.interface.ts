export interface IUser {
    _id: string,
    name: string,
    email: string
}

export interface IUserState {
    isLoggedIn?: boolean,
    user: IUser
}