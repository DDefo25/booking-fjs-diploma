import { Container, Navbar, Stack, Image } from "react-bootstrap";

export default function SideBar () {
    return (
        <Container>
            <Stack gap={2}>
                <Navbar.Brand href="#home">
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
                <Navbar.Brand href="#home" className="p-2">Поиск номера</Navbar.Brand>
                <Navbar.Brand href="#home" className="p-2">Добавить гостиницу</Navbar.Brand>
                <Navbar.Brand href="#home" className="p-2">Пользователи</Navbar.Brand>
            </Stack>
        </Container>
    )
}