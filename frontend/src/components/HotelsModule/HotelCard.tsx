import { Button, Card, Container } from "react-bootstrap";
import { IHotel } from "./interfaces/Hotel.interface.dto";
import { IHotelRoom } from "./interfaces/HotellRoom.interface.dto";
import { CarouselImages } from "../utilites-components/CarouselImages";

export function HotelCard ({hotel}: {hotel: IHotel}) {
    return (
        <Card>
            <CarouselImages images={hotel.images} imagesInRow={3} variant={"dark"} fade/>
            <Card.Body>
                <Card.Title>{hotel.title}</Card.Title>
                <Card.Text>{hotel.description}</Card.Text>
                <Container>
                    <Button variant="warning">Редактировать</Button>
                    <Button variant="primary">Добавить номер</Button>
                </Container>
            </Card.Body>
        </Card>
    )
}