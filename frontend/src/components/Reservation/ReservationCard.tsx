import { Button, Card, Stack } from 'react-bootstrap';
import { CarouselImages } from '../utilites-components/CarouselImage/CarouselImages';
import { Reservation } from '../../services/interfaces/Reservation.interface';
import Moment from 'react-moment';
import { CustomModal, ModalHandlers, ModalProps } from '../utilites-components/CustomModal';
import { format } from 'date-fns';
import { useState } from 'react';

export function ReservationCard({ reservation, onClick }: { reservation: Reservation, onClick: () => void }) {
    const { _id, hotel, hotelRoom, dateStart, dateEnd } = reservation;
    const [ showModal, setShow ] = useState( false )

    const handlers = {
        onShowModal: () => setShow( true ),
        onClose: () => setShow(false),
        onClickSubmit: () => {
            onClick()
            handlers.onClose()
        }
    }
    
    const modalProps: ModalProps = {
        title: 'Подтверждение',
        body: `Вы действительно хотите отменить бронирование ${hotelRoom.title} c ${format(dateStart, 'dd-MM-yyyy')} по ${format(dateEnd, 'dd-MM-yyyy')} ?`,
        buttons: [{ 
                variant: "secondary", 
                onClick: handlers.onClose,
                text: 'Отмена'
            }, { 
                variant: "primary", 
                onClick: handlers.onClickSubmit,
                text: 'Подтвердить'
        }],
        handlers: handlers,
        show: showModal
    }

    return (
        <>
        <Card style={{ minHeight: '40vh' }}>
            <Stack direction="horizontal" gap={1}>
                <CarouselImages 
                    images={ hotelRoom.images } 
                    imagesInRow={1} 
                    variant={'dark'}
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
                    <Button variant="warning" className="p-2 ms-auto" onClick={ handlers.onShowModal }>Отменить бронирование</Button>
                </Stack>
            </Card.Footer>
        </Card>
        <CustomModal props={modalProps}/>
        </>
    );
}