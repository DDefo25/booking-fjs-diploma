import { Container } from "react-bootstrap";
import UsersModule from "./UsersModule/UsersModule";
import UserReservations from "./UsersModule/UserReservationsModule";
import { HotelSearchModule } from "./HotelsModule/HotelSearchModule/HotelSearchModule";


export function MainContainer () {
    return (
        <Container>
            {/* <UsersModule /> */}
            {/* <UserReservations user={users[0]} reservations={reservations}/> */}
            <HotelSearchModule />
        </Container>
    )
}