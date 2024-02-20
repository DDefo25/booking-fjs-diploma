import { ObjectType } from "typescript";
import { IUserDto } from "./interfaces/User.interface.dto";
import { User } from "../../interfaces/User.interface";
// import {Link} from 'react-router-dom'

export default function UserRow ({user, columns}: {user: User, columns: Object}) {


    const userTdEls = Object.keys(columns).map((key: string)=> {
        if (Object.hasOwn(user, key)) {
            return (
                <td>{user[key as keyof User]}</td>
            )
        }
    })

    return (
        <tr key={user._id}>
            {/* <Link to={`/reservations/${user._id}/`} style={{display: 'table-row'}}> */}
                {userTdEls}
            {/* </Link> */}

        </tr>
    )
}