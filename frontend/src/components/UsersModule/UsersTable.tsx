import { Table } from "react-bootstrap";
import { IUserDto } from "./interfaces/User.interface.dto";
import UserRow from "./UserRow";


export default function UsersTable ({users}: {users: IUserDto[]}) {
    const columns = {
        _id: 'ID',
        name: 'ФИО',
        email: 'Email',
        contactPhone: "Телефон",
        role: 'Права',
    }

    function TheadEls({columns}: {columns: Object}) {
        const theadEls = Object.values(columns).map((value) => <th>{value}</th>)
        return (
            <tr>
                {theadEls}
            </tr>
        )
    }
    

    const UsersEls = users.map(user => <UserRow user={user} columns={columns} />)

    return (
        <Table striped bordered hover>
          <thead>
            <TheadEls columns={columns} />
          </thead>
          <tbody>
            {UsersEls}
          </tbody>
        </Table>
      );
}