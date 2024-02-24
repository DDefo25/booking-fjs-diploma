import GuestGreeting from "./GuestGreeting"
import UserGreeting from "./UserGreeting"
import { clearError, selectIsAuth } from "../../features/slices/authSlice"
import { Loading } from "../utilites-components/Loading"
import { useLoginMutation, useRegisterMutation } from "../../services/authAPI"
import { useAppDispatch, useTypedSelector } from "../../store/store"
import { Container } from "react-bootstrap"
import { socket } from "../../socket/socket"


export default function Profile () {
    const isAuth = useTypedSelector(selectIsAuth)
    const [,{ 
            isLoading: isLoadingLogin, 
        }] = useLoginMutation({ fixedCacheKey: 'shared-login'})
    
    const [,{ 
        isLoading: isLoadingRegister,
    }] = useRegisterMutation({ fixedCacheKey: 'shared-register'})

    if ( isLoadingLogin || isLoadingRegister ) return <Loading />

    return (
    < Container>
        { isAuth ? 
            <UserGreeting /> 
            : 
            <GuestGreeting /> 
        }

    </ Container>

    )
}