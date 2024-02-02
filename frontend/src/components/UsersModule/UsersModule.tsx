import { Container } from "react-bootstrap";
import UsersTable from "./UsersTable";
import { UserSearchForm } from "./UserSearchForm";
import UserReservations from "./UserReservationsModule";

export default function UsersModule () {
    const users = [{
        _id: '1',
        name: 'Maksim',
        email: 'is@mail.ru',
        contactPhone: "+79112222222",
        role: 'admin',
    }]

    return (
        <Container>
            <UserSearchForm />
            <UsersTable users={users}/>
        </Container>
    )
}