import { Button, Card, Stack } from "react-bootstrap";
import { Hotel } from "../interfaces/Hotel.interface.dto";
import { CarouselImages } from "../../utilites-components/CarouselImages";
import { useCheckRoles } from "../../../hooks/useCheckRoles";
import { Role } from "../../../config/roles.enum";
import { Link } from "react-router-dom";

export function HotelCard ({hotel}: {hotel: Hotel}) {
    const isRole = useCheckRoles()

    return ( 
        <>
            { hotel ? 
            <Card className="mb-3">
                <CarouselImages images={hotel.images} imagesInRow={3} variant={"dark"} fade className='p-3' style={{ minHeight: '30vh'}}/>
                <Card.Body>
                    <Card.Title as='h4'>{hotel.title}</Card.Title>
                    <Card.Text>{hotel.description}</Card.Text>
                    { isRole([Role.Admin] ) ? 
                        <Stack direction="horizontal" gap={3}>
                            <Link to={`/hotel/${hotel._id}/edit`}>
                                <Button variant="primary">Редактировать</Button>
                            </Link>
                            <Link to={`/hotel/${hotel._id}/add`}>
                                <Button variant="primary">Добавить комнату</Button>
                            </Link>
                        </Stack>
                    : null }
                </Card.Body>
            </Card>
            : null } 
        </>
    )
}