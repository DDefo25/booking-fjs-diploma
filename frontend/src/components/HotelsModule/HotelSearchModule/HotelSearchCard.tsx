import { Button, Card, Container, Stack } from 'react-bootstrap';
import { CarouselImages } from '../../utilites-components/CarouselImage/CarouselImages';
import { Hotel } from '../interfaces/Hotel.interface.dto';
import { Link } from 'react-router-dom';

export function HotelSearchCard({ hotelGrouped: { hotel } }: { hotelGrouped: { hotel: Hotel } }) {
  const { _id } = hotel;
  return (
        <Card className="mb-3" style={{ minHeight: '30vh' }}>
            <Stack direction="horizontal" gap={1}>
                <CarouselImages 
                    images={hotel.images} 
                    imagesInRow={1} 
                    variant={'dark'} 
                    className="p-4"
                    style={{ 
                      minWidth: '16vw', 
                      minHeight: '20vh', 
                    }}
                />
                <Card.Body>
                    <Card.Title>{hotel.title}</Card.Title>
                    <Card.Text>{hotel.description}</Card.Text>
                    <Container>
                        <Link to={ `/hotel/${ _id }` }><Button variant="primary">Подробнее</Button></Link>
                    </Container>
                </Card.Body>
            </Stack>
        </Card>
  );
}