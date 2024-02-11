import { Button, Container, Image, ListGroup, OverlayTrigger, Popover, Spinner } from "react-bootstrap"
import { clearCredentials, userSelector } from "../../features/userSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux"
import { AuthService, useLoginMutation, useLogoutMutation } from "../../services/auth.service"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const placement = 'bottom'

export default function UserGreeting () {
    const user = useAppSelector(userSelector)
    const dispatch = useAppDispatch()
    const [logout, { isLoading }] = useLogoutMutation()
    const navigate = useNavigate()

    
    useEffect(() => {
        console.log('user form useEffect from UserGreeting Component' + JSON.stringify(user))
    }, [user])

    const handlers = {
        logout: async () => {
            try {
                const result = await logout(undefined).unwrap()
                console.log(result)
                navigate('/')
              } catch (error) {
                console.log(error)
              }
        }
    }
    
    return (
        <Container>
            {user ? (
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
                    { isLoading ? 
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>  
                    : 
                        <Button variant="secondary" onClick={handlers.logout}>Выйти</Button>
                    }
                </Popover>
                }
            >   
                <Image src="https://picsum.photos/60/60" fluid rounded />
            </OverlayTrigger>
            ) : null }
        </Container>
    )
}