import { Button, Container, Nav, OverlayTrigger, Popover } from "react-bootstrap"
import LoginPopover from "./LoginPopover"

export default function Profile ({placement}: any) {
    return (
        <Container>
            <OverlayTrigger
                trigger="click"
                key={placement}
                placement={placement}
                overlay={
                <Popover id={`popover-positioned-${placement}`}>
                    <Nav justify variant="tabs" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link eventKey="link-home">Войти</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-register">Зарегистироваться</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <LoginPopover />
                </Popover>
                }
            >
                <Button variant="secondary">Войти</Button>
            </OverlayTrigger>
        </Container>
    )
}