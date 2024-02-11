import { userSelector } from "../../features/userSlice"
import { useAppSelector } from "../../hooks/hooksRedux"
import UserGreeting from "./UserGreeting"
import GuestGreeting from "./GuestGreeting"

export default function Profile () {


    // if (user) {
        return <UserGreeting />
    // } else {
    //     return <GuestGreeting />
    // }
}