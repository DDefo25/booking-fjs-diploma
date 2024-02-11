import { Container, Navbar, Stack, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SideBar () {
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
                <Navbar.Brand href="hotel-create" className="p-2">
                    <Link to='hotel-create'>Добавить гостиницу</Link>
                </Navbar.Brand>
                <Navbar.Brand href='users' className="p-2">
                    <Link to='users'>Пользователи</Link>
                </Navbar.Brand>
            </Stack>
        </Container>
    )
}