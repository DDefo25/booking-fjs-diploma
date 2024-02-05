import { Container, Navbar, Stack, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SideBar () {
    return (
        <Container>
            <Stack gap={2}>
                <Navbar.Brand href="hotels">
                    <Image
                        alt=""
                            src="https://picsum.photos/30/30"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            rounded
                        />{' '}
                    Все гостиницы
                </Navbar.Brand>
                <Navbar.Brand href="hotel-rooms" className="p-2">Поиск номера</Navbar.Brand>
                <Navbar.Brand href="hotel-create" className="p-2">Добавить гостиницу</Navbar.Brand>
                <Navbar.Brand href='users' className="p-2">Пользователи</Navbar.Brand>
            </Stack>
        </Container>
    )
}