import { Container, Navbar, Stack, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../store/store";
import { selectAuth } from "../features/auth/authSlice";
import { useCheckRoles } from "../hooks/useCheckRoles";
import { Role } from "../config/roles.enum";

export default function SideBar () {
    const isAllow = useCheckRoles()
    
    return (
        <Container>
            <Stack gap={2}>
                <Navbar.Brand>
                    <Link to='hotels'>
                        <Image
                                alt=""
                                    src="https://picsum.photos/30/30"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    rounded
                                />{' '}
                        Все гостиницы
                    </Link>
                </Navbar.Brand>
                <Navbar.Brand className="p-2">
                    <Link to='hotel-rooms'>Поиск номера</Link>
                </Navbar.Brand>
                <Navbar.Brand className="p-2">
                    <Link to='hotel-create'>Добавить гостиницу</Link>
                </Navbar.Brand>
                <Navbar.Brand className="p-2" hidden={ !isAllow([Role.Admin, Role.Manager]) }>
                    <Link to='users'>Пользователи</Link>
                </Navbar.Brand>
            </Stack>
        </Container>
    )
}