import { Button, Card, Container, Stack } from "react-bootstrap";
import { HotelRoom } from "../interfaces/HotellRoom.interface.dto";
import { CarouselImages } from "../../utilites-components/CarouselImages";
import { useCheckRoles } from "../../../hooks/useCheckRoles";
import { Role } from "../../../config/roles.enum";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export function HotelRoomCardView ({hotelRoom}: {hotelRoom: HotelRoom}) {
    const isRole = useCheckRoles()
    return (
        <Card className="mb-3">
            <CarouselImages images={ hotelRoom.images } imagesInRow={3} variant={"dark"} fade className="p-4"/>
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