import { Button, Card, Form } from "react-bootstrap";




export function HotelSearchForm ({handlers, formState}: {handlers: any, formState: any}) {
    return (
        <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Поиск гостиницы</Card.Title>
                    <Form onSubmit={handlers.onSubmit}>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formSearchHotelTitle">
                                <Form.Control 
                                    name='title' 
                                    placeholder="Введите название гостиницы (необязательно)" 
                                    type="text" 
                                    value={formState.title}
                                    onChange={handlers.onChange}/>
                            </Form.Group>
                        </Card.Text>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formSearchHotelStartDate">
                                <Form.Label>Заезд</Form.Label>
                                <Form.Control 
                                    name='startDate'
                                    type="date" 
                                    placeholder="Заезд" 
                                    value={formState.startDate} 
                                    onChange={handlers.onChange}/>
                            </Form.Group>
                        </Card.Text>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formSearchHotelEndDate">
                                <Form.Label>Выезд</Form.Label>
                                <Form.Control 
                                    name='endDate'
                                    type="date" 
                                    placeholder="Выезд" 
                                    value={formState.endDate} 
                                    onChange={handlers.onChange}/>
                            </Form.Group>
                        </Card.Text>
                        <Button variant="primary" type="submit">Искать</Button>
                    </Form> 
                </Card.Body>
        </Card>
    )
}