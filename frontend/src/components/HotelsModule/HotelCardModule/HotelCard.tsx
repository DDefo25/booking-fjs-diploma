import { Button, Card, Stack } from 'react-bootstrap';
import { Hotel } from '../interfaces/Hotel.interface.dto';
import { CarouselImages } from '../../utilites-components/CarouselImage/CarouselImages';
import { useCheckRoles } from '../../../hooks/useCheckRoles';
import { Role } from '../../../config/roles.enum';
import { Link } from 'react-router-dom';

export enum HotelCardType {
    General = 'general',
    Detail = 'detail'
}

export function HotelCard({ hotel, type }: { hotel: Hotel, type: HotelCardType }) {
  const isRole = useCheckRoles();

    const Buttons = () => {
        switch (type) {
            case HotelCardType.General:
            return (
                <Link to={ `/hotel/${ hotel._id }` }>
                    <Button variant="primary">Подробнее</Button>
                </Link>
            )
            case HotelCardType.Detail:
            return (<>
                <Link to={`/hotel/${ hotel._id }/edit`}>
                    <Button variant="warning">Редактировать</Button>
                </Link>
                <Link to={`/hotel/${ hotel._id }/add`}>
                    <Button variant="primary">Добавить комнату</Button>
                </Link>
            </>)        
        }
    }

  return ( 
        <>
            { hotel ? 
            <Card className="mb-3">
                <CarouselImages images={hotel.images} imagesInRow={3} variant={'dark'} fade className='p-3' style={{ minHeight: '30vh' }}/>
                <Card.Body>
                    <Card.Title as='h4'>{hotel.title}</Card.Title>
                    <Card.Text>{hotel.description}</Card.Text>
                    { isRole([Role.Admin] ) ? 
                        <Stack direction="horizontal" gap={3}>
                            { Buttons() }
                        </Stack>
                      : null }
                </Card.Body>
            </Card>
              : null } 
        </>
  );
}