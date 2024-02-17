import { Button, Card, Container, Stack } from "react-bootstrap";
import { IHotelRoom } from "./interfaces/HotellRoom.interface.dto";
import { CarouselImages } from "../utilites-components/CarouselImages";
import { IHotel } from "./interfaces/Hotel.interface.dto";
import { Link } from "react-router-dom";

export function HotelSearchCard ({hotel}: {hotel: IHotel}) {
    const { _id } = hotel
    return (
        <Card>
            <Stack direction="horizontal" gap={1}>
                <CarouselImages images={hotel.images} imagesInRow={1} variant={"dark"}/>
                <Card.Body>
                    <Card.Title>{hotel.title}</Card.Title>
                    <Card.Text>{hotel.description}</Card.Text>
                    <Container>
                    <Link to={ `/hotel/${ _id }` }><Button variant="primary">Подробнее</Button></Link>
                    </Container>
                </Card.Body>
            </Stack>
        </Card>
    )
}