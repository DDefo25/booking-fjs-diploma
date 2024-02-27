import { Card, Container, Stack } from 'react-bootstrap';
import { Loading } from '../utilites-components/Loading/Loading';
import { useSearchParams } from 'react-router-dom';
import { useDeleteReservationMutation, useGetReservationsByIdQuery, useGetReservationsQuery } from '../../services/reservationAPI';
import { ReservationCard } from './ReservationCard';
import { LoadingBox } from '../utilites-components/Loading/LoadingBox';
import { useTypedSelector } from '../../store/store';
import { selectUser } from '../../features/slices/authSlice';
import { Role } from '../../config/roles.enum';
import { User } from '../../interfaces/User.interface';
import { EmptyCard } from '../utilites-components/EmptyCard';

export function ReservationModule() {
  const { role } = useTypedSelector( selectUser ) || {} as User;

  const [ searchParams, setSearchParams ] = useSearchParams();
  const userIdFromQuery = searchParams.get('userId');

  const skip = {
    queryById: true,
    query: true,
  };
    
  switch ( role ) {
    case Role.Manager: 
      skip.queryById = false;
      break;
    case Role.Client: 
      skip.query = false;
      break;
  }

  const responseFromQuery = useGetReservationsByIdQuery( userIdFromQuery!, { skip: skip.queryById });
  const response = useGetReservationsQuery( undefined, { skip: skip.query });

  const { data: reservations, isLoading, isFetching, refetch } = !!userIdFromQuery ? responseFromQuery : response;

  const [ deleteReservation, { isLoading: isDeleteLoading } ] = useDeleteReservationMutation();

  const handlers = {
    onDelete: (id: string) => {
      deleteReservation({ id, role });
      refetch();
    },
  };



  if (isLoading) return <Loading />;

  return (
        <>
        <Container>
            <Stack className="loading-box-parent" gap={3}>
            <Card.Header>
                <Card.Title>Бронирования</Card.Title>
            </Card.Header>
            { 
                isLoading ? <Loading />
                  : reservations && reservations.length > 0 ? 
                    reservations.map( reservation => <ReservationCard reservation={reservation} onClick={() => handlers.onDelete(reservation._id)}/>) 
                    : <EmptyCard text='Не найдены' /> 
            }
            { isFetching && <LoadingBox />}
            </Stack>
        </Container>
          
        </>
  );
}