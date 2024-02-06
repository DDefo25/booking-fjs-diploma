import { Container } from "react-bootstrap";
import UsersTable from "./UsersTable";
import { UserSearchForm } from "./UserSearchForm";
import UserReservations from "./UserReservationsModule";
import { useReducer } from "react";
import { reducer } from "../../reducers/common.reducer";
import { useLoaderData } from "react-router-dom";
import { AxiosResponse } from "axios";
import { IUserDto } from "./interfaces/User.interface.dto";



export default function UsersModule () {
    // const loaderData: any = useLoaderData()
    const initialState: IUserDto[] = []

    const [ users, dispatch ] = useReducer(reducer, initialState)

    return (
        <Container>
            <UserSearchForm />
            <UsersTable users={users}/>
        </Container>
    )
}