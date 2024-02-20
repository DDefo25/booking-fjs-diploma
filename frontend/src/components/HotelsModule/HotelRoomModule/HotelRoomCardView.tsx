import { Button, Card, Container, Stack } from "react-bootstrap";
import { IHotelRoom } from "../interfaces/HotellRoom.interface.dto";
import { CarouselImages } from "../../utilites-components/CarouselImages";
import { useCheckRoles } from "../../../hooks/useCheckRoles";
import { Role } from "../../../config/roles.enum";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export function HotelRoomCardView ({hotelRoom}: {hotelRoom: IHotelRoom}) {
    const isRole = useCheckRoles()
    return (
        <Card>
            <CarouselImages images={ hotelRoom.images } imagesInRow={3} variant={"dark"} fade/>
            <Card.Body>
                <Card.Text>{ hotelRoom.description }</Card.Text>
                <Stack direction="horizontal" gap={3}>
                { isRole([Role.Admin]) ? 
                    <Link to={`${ hotelRoom._id }/edit`}>
                        <Button variant="warning">Редактировать</Button>
                    </Link>
                :   
                    <Link to={""}>
                        <Button variant="primary">Забронировать</Button>
                    </Link>
                }
                </Stack>
            </Card.Body>
        </Card>
    )
}