import { logout, selectUser } from "../../features/slices/authSlice"

import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useTypedSelector } from "../../store/store"
import { Button, Container, ListGroup, OverlayTrigger, Popover, Image, Card, Stack } from "react-bootstrap"
import { Role } from "../../config/roles.enum"
import { useGetUserQuery } from "../../services/authAPI"
import { useEffect } from "react"


const placement = 'bottom'

export default function UserGreeting () {
    const user = useTypedSelector(selectUser)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // const { data, isLoading, isFetching, isError } = useGetUserQuery()

    // useEffect(() => {
    //     console.log('userData', data)
    //     console.log('userData isLoading', isLoading)
    //     console.log('userData isFetching', isFetching)
    //     console.log('userData isError', data )
    // },[data, isLoading, isFetching, isError])

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
                                <Link to={'/reservation'} style={{textDecoration: "none"}} >Мои бронирования</Link>
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
    )
}