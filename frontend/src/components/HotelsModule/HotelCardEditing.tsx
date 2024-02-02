import { Button, Card, Form } from "react-bootstrap";
import { IHotel } from "./interfaces/Hotel.interface.dto";
import { CarouselImages } from "../utilites-components/CarouselImages";

export function HotelCardEditing ({hotel}: {hotel: IHotel}) {
    return (
        <Card>
            <Form>
                <CarouselImages images={hotel.images} imagesInRow={3} variant={"dark"} fade/>
                <Card.Body>
                    <Card.Title>
                        <Form.Group className="mb-3" controlId="formBasicHotelTitle">
                            <Form.Control type="text" placeholder="Название отеля" value={hotel.title} />
                        </Form.Group>
                    </Card.Title>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formBasicHotelDesc">
                            <Form.Control as="textarea" rows={10} placeholder="Описание отеля" value={hotel.description}/>
                        </Form.Group>
                    </Card.Text>
                    <Button variant="primary" type="submit">Сохранить</Button>
                </Card.Body>
            </Form>            
        </Card>
    )
}