import { Button, Container, Nav, OverlayTrigger, Popover } from "react-bootstrap"
import LoginPopover from "./PopoverLogin"
import { useState } from 'react'
import RegisterPopover from "./PopoverRegister"

const placement = 'bottom'

export default function GuestGreeting () {
    const navs = {
        login: 'Войти', 
        register: 'Зарегистироваться'
    }

    const [navKey, setNavKey] = useState('login')

    const handleSelect = (selectedKey: any) => {
        setNavKey(selectedKey)
    }

    const navsItems = Object.entries(navs).map((entry) => {
        const [key, value] = entry
        return (
        <Nav.Item>
            <Nav.Link key={key} eventKey={key}>{value}</Nav.Link>
        </Nav.Item>
        )
    })

    const Forms = ({navKey}: {navKey: string}) => {
        switch (navKey) {
            case 'login': 
                return <LoginPopover />
            case 'register': 
                return <RegisterPopover />
            default:
                return <LoginPopover />
        }
    }
    
    
    return (
        <Container >
            <OverlayTrigger
                trigger="click"
                rootClose={true}
                rootCloseEvent='mousedown'
                key={placement}
                placement={placement}
                overlay={
                <Popover id={`popover-positioned-${placement}`} className="p-2">
                    <Nav 
                        justify 
                        variant="pills" 
                        className="mb-2"
                        defaultActiveKey={navKey}
                        onSelect={(eventKey) => handleSelect(eventKey)}
                        >
                        {navsItems}
                    </Nav>
                    <Forms navKey={navKey} />
                </Popover>
                }
            >
                <Button variant="secondary">Вход</Button>
            </OverlayTrigger>
        </Container>
    )
}