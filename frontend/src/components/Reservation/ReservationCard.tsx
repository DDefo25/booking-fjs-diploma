import { Button, Card, Stack } from "react-bootstrap";
import { CarouselImages } from "../utilites-components/CarouselImages";
import { Reservation } from "../../services/interfaces/Reservation.interface";
import Moment from "react-moment";

export function ReservationCard ({reservation, onClick}: {reservation: Reservation, onClick: () => void}) {
    const { _id, hotel, hotelRoom } = reservation;
    return (
        <Card style={{ minHeight: '40vh' }}>
            <Stack direction="horizontal" gap={1}>
                <CarouselImages 
                    images={ hotelRoom.images } 
                    imagesInRow={1} 
                    variant={"dark"}
                    style={{ minWidth: '15vw' }}
                />
                <Card.Body>
                    <Card.Title>{ hotelRoom.title }</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{ hotel.title }</Card.Subtitle>
                    <Card.Text>{ hotelRoom.description }</Card.Text>
                </Card.Body>
            </Stack>
            <Card.Footer>                
                <Stack gap={3} direction="horizontal">     
                    <Card.Text className="p-2">
                        Даты бронирования
                    </Card.Text>
                    <Card.Text className="p-2 ">
                        с <Moment format={'DD.MM.YYYY'} date={reservation.dateStart} /> по <Moment format={'DD.MM.YYYY'} date={reservation.dateEnd} />
                    </Card.Text>
                    <Button variant="warning" className="p-2 ms-auto" onClick={ onClick }>Отменить бронирование</Button>
                </Stack>
            </Card.Footer>
        </Card>
    )
}