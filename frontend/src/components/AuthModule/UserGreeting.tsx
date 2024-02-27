import { logout, selectUser } from '../../features/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../../store/store';
import { Button, Container, OverlayTrigger, Popover, Image, Card, Stack } from 'react-bootstrap';
import { Role } from '../../config/roles.enum';
import { User } from '../../interfaces/User.interface';
import { useSocket } from '../../hooks/useSocket';


const placement = 'bottom';

export default function UserGreeting() {
  const user = useTypedSelector(selectUser) || {} as User;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();  

  useSocket();

  const handlers = {
    logout: () => {
      dispatch(logout());
      navigate('/');
    },
  };
    
  return (
        <Container>
            <OverlayTrigger
                trigger="click"
                rootClose={true}
                rootCloseEvent='mousedown'
                key={placement}
                placement={placement}
                overlay={
                <Popover id={`popover-positioned-${placement}`} className="p-2">
                    <Card className="border border-0"> 
                        <Card.Title className="fs-2">{ user?.name }</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"><strong>ID:</strong> { user?._id }</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"><strong>email:</strong> { user?.email }</Card.Subtitle>
                        <Stack gap={2}>
                            <Button variant="info" hidden={user?.role !== Role.Client}>
                                <Link to={'/reservation'} style={{ textDecoration: 'none' }} >Мои бронирования</Link>
                            </Button>
                            <Button variant="secondary" onClick={handlers.logout}>Выйти</Button>
                        </Stack>
                    </Card>
                </Popover>
                }
            >   
                <Image src="https://picsum.photos/60/60" fluid rounded />
            </OverlayTrigger>
        </Container>
  );
}

function isAllow(arg0: Role[]) {
  throw new Error('Function not implemented.');
}
