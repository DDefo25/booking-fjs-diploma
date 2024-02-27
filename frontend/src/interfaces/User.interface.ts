import { Role } from '../config/roles.enum';

export interface User {
  _id: string,
  name: string,
  email: string,
  role: Role,
  contactPhone: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuth: boolean,
  isAuthInProgress: boolean 
}