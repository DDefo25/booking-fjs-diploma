import { logout, selectUser } from "../../features/auth/authSlice"

import { useNavigate } from "react-router-dom"
import { useAppDispatch, useTypedSelector } from "../../store/store"
import { Button, Container, ListGroup, OverlayTrigger, Popover, Image } from "react-bootstrap"

const placement = 'bottom'

export default function UserGreeting () {
    const user = useTypedSelector(selectUser)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handlers = {
        logout: () => {
            dispatch(logout())
            navigate('/')
        }
    }
    
    return (
        <Container>
            <OverlayTrigger
                trigger="click"
                key={placement}
                placement={placement}
                overlay={
                <Popover id={`popover-positioned-${placement}`}>
                    <Popover.Header as="h3">{ user?.name }</Popover.Header>
                    <Popover.Body>
                        <ListGroup variant="flush">
                            {/* <ListGroup.Item><strong>id</strong> { user._id }</ListGroup.Item> */}
                            <ListGroup.Item><strong>email</strong> { user?.email }</ListGroup.Item>
                        </ListGroup>
                    </Popover.Body>
                    <Button variant="secondary" onClick={handlers.logout}>Выйти</Button>
                </Popover>
                }
            >   
                <Image src="https://picsum.photos/60/60" fluid rounded />
            </OverlayTrigger>
        </Container>
    )
}