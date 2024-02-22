import { useEffect, useState } from "react";
import { User } from "../interfaces/User.interface";
import { useTypedSelector } from "../store/store";
import { selectAuth, selectUser } from "../features/slices/authSlice";
import { Role } from "../config/roles.enum";

export const useCheckRoles = () => {
    const { user, isAuth } = useTypedSelector( selectAuth )

    return (roles: Role[]) => {
        if (!isAuth) {
            return false
        } 

        if (Object.values(roles).includes(user!.role)) {
            return true
        }

        return false
    }
}