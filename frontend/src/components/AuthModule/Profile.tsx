import { useSelector } from "react-redux"
import GuestGreeting from "./GuestGreeting"
import UserGreeting from "./UserGreeting"
import { selectIsAuth } from "../../features/auth/authSlice"
import { useLoginMutation, useRegisterMutation } from "../../services/auth.service"
import { Loading } from "../utilites-components/Loading"


export default function Profile () {
    const isAuth = useSelector(selectIsAuth)

    const [ 
        _login, 
        { isLoading: isLoadingLogin } 
    ] = useLoginMutation({ fixedCacheKey: 'shared-login'})
    
    const [ 
        _register, 
        { isLoading: isLoadingRegister} 
    ] = useRegisterMutation({ fixedCacheKey: 'shared-register'})

    if (isLoadingLogin || isLoadingRegister) return <Loading />

    return (
        isAuth ? 
            <UserGreeting /> 
        : 
            <GuestGreeting /> 
    )
}