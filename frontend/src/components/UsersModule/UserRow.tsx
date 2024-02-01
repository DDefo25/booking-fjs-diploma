import { ObjectType } from "typescript";
import { IUserDto } from "./interfaces/User.interface.dto";
// import {Link} from 'react-router-dom'

export default function UserRow ({user, columns}: {user: IUserDto, columns: Object}) {


    const userTdEls = Object.keys(columns).map((key: string)=> {
        if (Object.hasOwn(user, key)) {
            return (
                <td>{user[key as keyof IUserDto]}</td>
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