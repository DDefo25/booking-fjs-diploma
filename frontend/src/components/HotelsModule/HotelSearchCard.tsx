import { Button, Card, Container, Stack } from "react-bootstrap";
import { IHotelRoom } from "./interfaces/HotellRoom.interface.dto";
import { CarouselImages } from "../utilites-components/CarouselImages";
import { IHotel } from "./interfaces/Hotel.interface.dto";

export function HotelSearchCard ({hotel}: {hotel: IHotel}) {
    return (
        <Card>
            <Stack direction="horizontal" gap={1}>
                <CarouselImages images={hotel.images} imagesInRow={1} variant={"dark"}/>
                <Card.Body>
                    <Card.Title>{hotel.title}</Card.Title>
                    <Card.Text>{hotel.description}</Card.Text>
                    <Container>
                        <Button variant="primary">Подробнее</Button>
                    </Container>
                </Card.Body>
            </Stack>
        </Card>
    )
}