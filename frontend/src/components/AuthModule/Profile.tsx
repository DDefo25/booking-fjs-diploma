import { useDispatch, useSelector } from "react-redux"
import GuestGreeting from "./GuestGreeting"
import UserGreeting from "./UserGreeting"
import { clearError, selectError, selectIsAuth } from "../../features/auth/authSlice"

import { Loading } from "../utilites-components/Loading"
import { useLoginMutation, useRegisterMutation } from "../../services/authAPI"
import { ErrorModal } from "../utilites-components/Error"
import { useEffect, useState } from "react"
import { useAppDispatch, useTypedSelector } from "../../store/store"


export default function Profile () {
    const isAuth = useTypedSelector(selectIsAuth)
    const error = useTypedSelector(selectError)
    const dispatch = useAppDispatch()

    const [,{ 
            isLoading: isLoadingLogin, 
            reset: loginReset
        }] = useLoginMutation({ fixedCacheKey: 'shared-login'})
    
    const [,{ 
        isLoading: isLoadingRegister,
        reset: registerReset
    }] = useRegisterMutation({ fixedCacheKey: 'shared-register'})

    const handlerError = () => {
        loginReset()
        registerReset()
        dispatch(clearError())
    }

    if ( isLoadingLogin || isLoadingRegister ) return <Loading />

    return (
    <>
        { error ? <ErrorModal error={error.data.message} handlerOnClose={handlerError}/> : null }
        { isAuth ? 
            <UserGreeting /> 
            : 
            <GuestGreeting /> 
        }

    </>

    )
}