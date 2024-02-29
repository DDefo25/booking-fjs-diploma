import { Button, Card, Stack, Toast } from 'react-bootstrap';
import { HotelRoom } from '../interfaces/HotellRoom.interface.dto';
import { CarouselImages } from '../../utilites-components/CarouselImage/CarouselImages';
import { useCheckRoles } from '../../../hooks/useCheckRoles';
import { Role } from '../../../config/roles.enum';
import { Link } from 'react-router-dom';
import { Tooltip } from '../../utilites-components/Tooltip';
import { useCreateReservationMutation } from '../../../services/reservationAPI';
import { useAppDispatch, useTypedSelector } from '../../../store/store';
import { clearReservationDate, selectReservationDates } from '../../../features/slices/reservationDateSlice';
import { CustomModal, ModalHandlers, ModalProps } from '../../utilites-components/CustomModal';
import { useState } from 'react';
import { format } from 'date-fns';
import { addToast } from '../../../features/slices/toastSlice';
import { ToastTypes } from '../../../config/toasts.enums';


export function HotelRoomCardView({ hotelRoom }: { hotelRoom: HotelRoom; }) {
  const isRole = useCheckRoles();
  const dispatch = useAppDispatch();
  const { dateStart, dateEnd } = useTypedSelector(selectReservationDates);
  const [ createReservation, { isLoading: isCreating }] = useCreateReservationMutation();
  const [ showModal, setShow ] = useState(false);

  const handlers: ModalHandlers & any = {
    onShowModal: () => {
      if ( !dateStart || !dateEnd ) {
        dispatch(addToast({
          type: ToastTypes.Common,
          data: {
            title: 'Некорректные данные',
            message: 'Выберите даты бронирования'
          }
        }));
      } else setShow(true)
    },

    onClose: () => setShow(false),
    onClick: () => {
      createReservation({
        hotelRoom: hotelRoom._id,
        dateStart,
        dateEnd,
      });
      dispatch( clearReservationDate())
      handlers.onClose();
    },
  };

  const modalProps: ModalProps = {
    title: 'Подтверждение',
    body: `Вы действительно хотите забронировать ${hotelRoom.title} c ${dateStart && format(dateStart, 'dd-MM-yyyy')} по ${dateEnd && format(dateEnd, 'dd-MM-yyyy')}?`,
    buttons: [{
      variant: "secondary",
      onClick: handlers.onClose,
      text: 'Отмена'
    }, {
      variant: "primary",
      onClick: handlers.onClick,
      text: 'Подтвердить'
    }],
    handlers: handlers,
    show: showModal
  };

  return (
    <>
      <Card className="mb-3">
        <CarouselImages images={hotelRoom.images} imagesInRow={3} variant={'dark'} fade className="p-4" />
        <Card.Body>
          <Card.Title>{hotelRoom.title}</Card.Title>
          <Card.Text>{hotelRoom.description}</Card.Text>
          <Stack direction="horizontal" gap={3}>
            {isRole([Role.Admin]) &&
              <Link to={`${hotelRoom._id}/edit`}>
                <Button variant="warning">Редактировать</Button>
              </Link>}
            <Tooltip
              text='Необходимо войти или зарегистрироваться'
              hidden={isRole([Role.Admin, Role.Manager, Role.Client])}
            >
              <Button
                variant="primary"
                onClick={handlers.onShowModal}
                disabled={!isRole([Role.Client]) || isCreating}
              >
                Забронировать
              </Button>
            </Tooltip>
          </Stack>
        </Card.Body>
      </Card>
      <CustomModal props={modalProps} />
    </>
  );
}
