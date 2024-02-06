import { Container } from "react-bootstrap";
import UsersModule from "./UsersModule/UsersModule";
import UserReservations from "./UsersModule/UserReservationsModule";
import HotelsModule from "./HotelsModule/HotelSearchModule";

export function MainContainer () {
    const users = [{
        _id: '1',
        name: 'Maksim',
        email: 'is@mail.ru',
        contactPhone: "+79112222222",
        role: 'admin',
    }]

    const reservations = [{
        _id: '1',
        startDate: '2024-02-21T00:00:00.000+00:00',
        endDate: '2024-02-22T00:00:00.000+00:00',
        hotelRoom: {
          description: 'Номера категории Стандарт выполнены в элегантном бизнес-стиле. Это уютные номера с удобным и практичным интерьером, где предусмотрено все что нужно для полноценного отдыха и комфортного проживания. Вашим услугам: Индивидуальное кондиционирование, сейф, интерактивное и спутниковое телевидение, подогреваемые полы в ванной комнате, фен, гладильная доска и утюг, чайный сет, минеральная вода, халат, тапочки, ванные принадлежности.',
          images: [
            "images-1705674274318-421276093"
          ]
        },
        hotel: {
          title: 'Holiday Inn Kaliningrad',
          description: 'Современный четырехзвездочный отель с обширным номерным фондом, расположенный в центральном районе Калининграда'
        }
    }]


    return (
        <Container>
            {/* <UsersModule /> */}
            {/* <UserReservations user={users[0]} reservations={reservations}/> */}
            <HotelsModule />
        </Container>
    )
}