import { Table } from "react-bootstrap";
import { IUserDto } from "./interfaces/User.interface.dto";
import UserRow from "./UserRow";
import { User } from "../../interfaces/User.interface";
import { useLazyGetUsersQuery } from "../../services/userAPI";
import { useEffect } from "react";


export default function UsersTable ({users} : { users: User[]}) {
    const columns = {
        email: 'Email',
        name: 'ФИО',
        contactPhone: "Телефон",
        _id: 'ID',
        role: 'Права',
    }

    useEffect(() => {
      console.log('users', users)
    }, [users])

    function TheadEls({columns}: {columns: Object}) {
        const theadEls = Object.values(columns).map((value) => <th>{value}</th>)
        return (
            <tr>
                {theadEls}
            </tr>
        )
    }

    return (
        <Table striped bordered hover>
          <thead>
            <TheadEls columns={columns} />
          </thead>
          <tbody>
            {users && users.map(user => <UserRow user={user} columns={columns} />)}
          </tbody>
        </Table>
      );
}