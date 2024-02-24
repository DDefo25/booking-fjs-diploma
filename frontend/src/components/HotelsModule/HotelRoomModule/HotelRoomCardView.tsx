import { Button, Card, OverlayTrigger, Stack } from "react-bootstrap";
import { HotelRoom } from "../interfaces/HotellRoom.interface.dto";
import { CarouselImages } from "../../utilites-components/CarouselImages";
import { useCheckRoles } from "../../../hooks/useCheckRoles";
import { Role } from "../../../config/roles.enum";
import { Link } from "react-router-dom";
import { Tooltip } from "../../utilites-components/Tooltip";
import { useCreateReservationMutation } from "../../../services/reservationAPI";
import { useTypedSelector } from "../../../store/store";
import { selectReservationDates } from "../../../features/slices/reservationDateSlice";

export function HotelRoomCardView ({hotelRoom}: {hotelRoom: HotelRoom}) {
    const isRole = useCheckRoles()
    const { dateStart, dateEnd } = useTypedSelector( selectReservationDates )
    const [ createReservation, { isLoading: isCreating }] = useCreateReservationMutation()

    const handlers = {
        onClick: () => {
            createReservation({
                hotelRoom: hotelRoom._id,
                dateStart,
                dateEnd
            })
        }
    }

    return (
        <Card className="mb-3">
            <CarouselImages images={ hotelRoom.images } imagesInRow={3} variant={"dark"} fade className="p-4"/>
            <Card.Body>
                <Card.Title>{ hotelRoom.title }</Card.Title>
                <Card.Text>{ hotelRoom.description }</Card.Text>
                <Stack direction="horizontal" gap={3}>
                { isRole([Role.Admin]) && 
                    <Link to={`${ hotelRoom._id }/edit`}>
                        <Button variant="warning">Редактировать</Button>
                    </Link>
                }
                    <Tooltip 
                        text='Необходимо войти или зарегистрироваться'
                        hidden={isRole([Role.Admin, Role.Manager, Role.Client])}
                    >   
                            {/* <Link to={isRole([Role.Client]) ? '/' : '#'}> */}
                                <Button 
                                    variant="primary"
                                    onClick={handlers.onClick}
                                    disabled={!isRole([Role.Client]) || isCreating}
                                >
                                Забронировать
                                </Button>
                            {/* </Link> */}
                    </Tooltip>
                </Stack>
            </Card.Body>
        </Card>
    )
}