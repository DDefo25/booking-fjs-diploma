import { Container } from "react-bootstrap";
import UsersModule from "./UsersModule/UsersModule";
import UserReservations from "./UsersModule/UserReservationsModule";
import { HotelModule } from "./HotelsModule/HotelModule";


export function MainContainer () {
    return (
        <Container>
            {/* <UsersModule /> */}
            {/* <UserReservations user={users[0]} reservations={reservations}/> */}
            <HotelModule />
        </Container>
    )
}