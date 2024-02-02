import { Button, Card, Container } from "react-bootstrap";
import { IHotelRoom } from "./interfaces/HotellRoom.interface.dto";
import { CarouselImages } from "../utilites-components/CarouselImages";

export function HotelRoomCard ({hotelRoom}: {hotelRoom: IHotelRoom}) {
    return (
        <Card>
            <CarouselImages images={hotelRoom.images} imagesInRow={3} variant={"dark"} fade/>
            <Card.Body>
                <Card.Text>{hotelRoom.description}</Card.Text>
                <Container>
                    <Button variant="warning">Редактировать</Button>
                </Container>
            </Card.Body>
        </Card>
    )
}