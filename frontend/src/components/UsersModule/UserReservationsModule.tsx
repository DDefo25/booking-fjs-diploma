import { Container, Table } from 'react-bootstrap';
import { IReservationDto } from './interfaces/Reservation.interface.dto';
import { IUserDto } from './interfaces/User.interface.dto';
import Moment from 'react-moment';

export default function UserReservations({ user, reservations }: { user: IUserDto, reservations: IReservationDto[] }) {
  const columns = [
    'ID',
    'Отель',
    'Даты заезда',
    'Даты выезда',
  ];

  const dateFormat = 'DD.MM.YYYY';

  const reservationThEls = reservations.map((reservation: IReservationDto)=> {
    return (
            <tr>
                <td>{ reservation._id }</td>
                <td>{ reservation.hotel.title }</td>
                <td><Moment format={dateFormat} date={reservation.startDate}/></td>
                <td><Moment format={dateFormat} date={reservation.endDate}/></td>
            </tr>
    );
  });

  function TheadEls({ columns }: { columns: string[] }) {
    const theadEls = columns.map((value) => <th>{value}</th>);
    return (
            <tr>
                {theadEls}
            </tr>
    );
  }

  const UserReservationsTable = () => {
    return (
            <Table striped bordered hover>
              <thead>
                <TheadEls columns={columns} />
              </thead>
              <tbody>
                {reservationThEls}
              </tbody>
            </Table>
    );
  };

  return (
        <Container>
            <h2>{user.name}</h2>
            <UserReservationsTable />
        </Container>
  );
}