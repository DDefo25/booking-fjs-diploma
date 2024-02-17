import { Button, Card, Container, Stack } from "react-bootstrap";
import { IHotel } from "../interfaces/Hotel.interface.dto";
import { IHotelRoom } from "../interfaces/HotellRoom.interface.dto";
import { CarouselImages } from "../../utilites-components/CarouselImages";
import { useTypedSelector } from "../../../store/store";
import { selectAuth, selectUser } from "../../../features/auth/authSlice";
import { useCheckRoles } from "../../../hooks/useCheckRoles";
import { Role } from "../../../config/roles.enum";
import { Link } from "react-router-dom";

export function HotelCard ({hotel}: {hotel: IHotel}) {
    const isRole = useCheckRoles()

    return (
        <Card>
            <CarouselImages images={hotel.images} imagesInRow={3} variant={"dark"} fade/>
            <Card.Body>
                <Card.Title>{hotel.title}</Card.Title>
                <Card.Text>{hotel.description}</Card.Text>
                { isRole([Role.Admin] ) ? 
                    <Stack direction="horizontal" gap={3}>
                        <Link to='edit'>
                            <Button variant="primary">Редактировать</Button>
                        </Link>
                        <Link to='../add'>
                            <Button variant="primary">Добавить комнату</Button>
                        </Link>
                    </Stack>
                : null }
            </Card.Body>
        </Card>
    )
}