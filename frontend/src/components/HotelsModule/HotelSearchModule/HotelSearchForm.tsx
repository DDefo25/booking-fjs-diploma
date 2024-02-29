import { Button, Card, Form } from 'react-bootstrap';
import { useTypedSelector } from '../../../store/store';
import { selectReservationDates } from '../../../features/slices/reservationDateSlice';
import { useCheckRoles } from '../../../hooks/useCheckRoles';
import { Role } from '../../../config/roles.enum';




export function HotelSearchForm({ handlers, formState }: { handlers: any, formState: any }) {
    const isAllow = useCheckRoles()
    const { dateStart, dateEnd } = useTypedSelector( selectReservationDates );

  return (
        <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Поиск гостиницы</Card.Title>
                    <Form onSubmit={ handlers.onSubmit }>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formSearchHotelTitle">
                                <Form.Control 
                                    name='title' 
                                    placeholder="Введите название гостиницы (необязательно)" 
                                    type="text" 
                                    value={ formState.title }
                                    onChange={ handlers.onChange }/>
                            </Form.Group>
                        </Card.Text>
                        { !isAllow([Role.Admin]) && 
                        <>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formSearchHotelStartDate">
                                <Form.Label>Заезд</Form.Label>
                                <Form.Control 
                                    name='dateStart'
                                    type="date" 
                                    placeholder="Заезд" 
                                    value={dateStart} 
                                    onChange={ handlers.onChangeDate }/>
                            </Form.Group>
                        </Card.Text>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formSearchHotelEndDate">
                                <Form.Label>Выезд</Form.Label>
                                <Form.Control 
                                    name='dateEnd'
                                    type="date" 
                                    placeholder="Выезд" 
                                    value={ dateEnd } 
                                    onChange={ handlers.onChangeDate }/>
                            </Form.Group>
                        </Card.Text>
                        </>}
                        <Button variant="primary" type="submit">Искать</Button>
                    </Form> 
                </Card.Body>
        </Card>
  );
}