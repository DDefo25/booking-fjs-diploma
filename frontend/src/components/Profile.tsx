import { Button, Container, Nav, OverlayTrigger, Popover } from "react-bootstrap"
import LoginPopover from "./LoginPopover"
import { useEffect, useState } from 'react'
import RegisterPopover from "./RegisterPopover"

export default function Profile ({placement}: any) {
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
            <Nav.Link eventKey={key}>{value}</Nav.Link>
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
        <Container>
            <OverlayTrigger
                trigger="click"
                key={placement}
                placement={placement}
                overlay={
                <Popover id={`popover-positioned-${placement}`}>
                    <Nav 
                        justify variant="tabs" 
                        defaultActiveKey={navKey}
                        onSelect={(eventKey) => handleSelect(eventKey)}
                        >
                        {navsItems}
                    </Nav>
                    <Forms navKey={navKey} />
                </Popover>
                }
            >
                <Button variant="secondary">Войти</Button>
            </OverlayTrigger>
        </Container>
    )
}