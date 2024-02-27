import { User } from '../../interfaces/User.interface';
import { Button, Card, ListGroup, Stack } from 'react-bootstrap';
import { Image } from '../utilites-components/Image';
import { Link } from 'react-router-dom';
import { useCheckRoles } from '../../hooks/useCheckRoles';
import { Role } from '../../config/roles.enum';

export default function UserCard({ user }: { user: User }) {
  const isAllow = useCheckRoles();

  return (
        <Card>
            <Stack direction="horizontal" gap={2}>
                <Image attributes={{
                  src: 'https://picsum.photos/100/100', 
                  fluid: true, 
                  rounded: true,
                  className: 'm-4',
                }}/>
                <Card.Body>
                    <Card.Title>{ user.name }</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">ID: { user._id }</Card.Subtitle>
                    {/* <Card.Text>{ hotelRoom.description }</Card.Text> */}
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>email <strong>{user.email}</strong></ListGroup.Item>
                        <ListGroup.Item>телефон <strong>{user.contactPhone}</strong></ListGroup.Item>
                        <ListGroup.Item>роль <strong>{user.role}</strong></ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                
            </Stack>
            { isAllow([Role.Client, Role.Manager]) 
                && <Card.Footer className="bg-body">                
                    <Stack gap={3} direction="horizontal">
                        <Link to={`/reservation?userId=${user._id}`} className="ms-auto">   
                            <Button variant="warning"> Бронирования </Button>
                        </Link>  
                    </Stack>
                </Card.Footer>
            }
        </Card>
  );
}