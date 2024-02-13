// import { userSelector } from "../../features/userSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux"
import UserGreeting from "./UserGreeting"
import GuestGreeting from "./GuestGreeting"
import { AuthService } from "../../services/auth.service"
import { authSelector, setCredentials } from "../../features/userSlice"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"

export default function Profile () {
    const dispatch = useAppDispatch()
    const { isAuth, isAuthInProgress } = useAppSelector(authSelector)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!isAuth) {
            AuthService.getUser().then(({user, token} : {user: any, token: any}) => {
                if ( user && token ) {
                    dispatch(setCredentials({user, token}))
                }
                setIsLoading(false)
            })
        }
      }, []);

    useEffect(() => {
        console.log('isAuthInProgress ' + isAuthInProgress)
    }, [isAuthInProgress])

    useEffect(() => {
        console.log('isAuth ' + isAuth)
    }, [isAuth])


    console.log( isAuth )

    return (
        <>
        { !isLoading ? 
            isAuth ? 
                <UserGreeting /> 
            : 
                <GuestGreeting /> 
        :
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>  
        }
        </>
    )


    // if (user) {
        // return <UserGreeting />
    // } else {
    //     return <GuestGreeting />
    // }
}