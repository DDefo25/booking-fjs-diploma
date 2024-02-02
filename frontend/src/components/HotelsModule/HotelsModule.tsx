import { Container, Table } from "react-bootstrap";
import { HotelCard } from "./HotelCard";
import { HotelRoomsList } from "./HotelRoomsList";
import { IHotelRoom } from "./interfaces/HotellRoom.interface.dto";
import { HotelCardEditing } from "./HotelCardEditing";
import { HotelCardCreating } from "./HotelCardCreating";


export default function HotelsModule () {
    const hotel = {
        _id: "65aa64faa60c7d89a254f008",
        title: "Holiday Inn Kaliningrad",
        description: "Современный четырехзвездочный отель с обширным номерным фондом, расположенный в центральном районе Калининграда",
        images: [
            "https://picsum.photos/250/200",
            "https://picsum.photos/250/200",
            "https://picsum.photos/250/200",
        ],
        createdAt: "2024-01-19T12:03:06.241Z",
        updatedAt: "2024-01-23T13:16:09.779Z"
    }

    const hotelRooms = [
        {
            _id: "65aa8015b3b3fd8ab7421b55",
            hotel: {
                _id: "65aa64faa60c7d89a254f008",
                title: "Holiday Inn Kaliningrad",
                description: "Современный четырехзвездочный отель с обширным номерным фондом, расположенный в центральном районе Калининграда",
                createdAt: "2024-01-19T12:03:06.241Z",
                updatedAt: "2024-01-23T13:16:09.779Z",
                images: [
                    "https://picsum.photos/250/200",
                    "https://picsum.photos/250/200",
                    "https://picsum.photos/250/200",
                ]
            },
            description: "Номера категории Стандарт выполнены в элегантном бизнес-стиле. Это уютные номера с удобным и практичным интерьером, где предусмотрено все что нужно для полноценного отдыха и комфортного проживания.\nК Вашим услугам: Индивидуальное кондиционирование, сейф, интерактивное и спутниковое телевидение, подогреваемые полы в ванной комнате, фен, гладильная доска и утюг, чайный сет, минеральная вода, халат, тапочки, ванные принадлежности.",
            images: [
                "https://picsum.photos/250/200",
                "https://picsum.photos/250/200",
                "https://picsum.photos/250/200",
            ],
            createdAt: "2024-01-19T13:58:43.652Z",
            updatedAt: "2024-01-19T13:58:43.653Z",
            isEnabled: true
          },
          {
            _id: "65aa83252393d78592d4438e",
            hotel: {
                _id: "65aa64faa60c7d89a254f008",
                title: "Holiday Inn Kaliningrad",
                description: "Современный четырехзвездочный отель с обширным номерным фондом, расположенный в центральном районе Калининграда",
                createdAt: "2024-01-19T12:03:06.241Z",
                updatedAt: "2024-01-23T13:16:09.779Z",
                images: [
                    "https://picsum.photos/250/200",
                    "https://picsum.photos/250/200",
                    "https://picsum.photos/250/200",
                ]
            },
            description: "Номера категории Стандарт выполнены в элегантном бизнес-стиле. Это уютные номера с удобным и практичным интерьером, где предусмотрено все что нужно для полноценного отдыха и комфортного проживания.\nК Вашим услугам: Индивидуальное кондиционирование, сейф, интерактивное и спутниковое телевидение, подогреваемые полы в ванной комнате, фен, гладильная доска и утюг, чайный сет, минеральная вода, халат, тапочки, ванные принадлежности.",
            images: [
                "https://picsum.photos/250/200",
            ],
            createdAt: "2024-01-19T13:58:43.652Z",
            updatedAt: "2024-01-19T13:58:43.653Z",
            isEnabled: true
          }
    ]


    return (
        <Container>
            <HotelCardCreating />
            {/* <HotelCard hotel={hotel}/> */}
            <HotelRoomsList hotelRooms={hotelRooms}/>
        </Container>
    )
}