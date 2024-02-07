import { Button, Container, Image, ListGroup, OverlayTrigger, Popover } from "react-bootstrap"
import { logoutUser, userSelector } from "../../features/userSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux"
import { AuthService } from "../../services/auth.service"

const placement = 'bottom'

export default function UserGreeting () {
    const {user} = useAppSelector(userSelector)
    const dispatch = useAppDispatch()

    const handlers = {
        logout: async () => {
            try {
                const result = await AuthService.logout()
                dispatch(logoutUser())
                console.log(result)
              } catch (error) {
                console.log(error)
              }
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
                    <Popover.Header as="h3">{ user.name }</Popover.Header>
                    <Popover.Body>
                        <ListGroup variant="flush">
                            {/* <ListGroup.Item><strong>id</strong> { user._id }</ListGroup.Item> */}
                            <ListGroup.Item><strong>email</strong> { user.email }</ListGroup.Item>
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