import { Container, Navbar, Stack, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../store/store";
import { selectAuth } from "../../features/slices/authSlice";
import { useCheckRoles } from "../../hooks/useCheckRoles";
import { Role } from "../../config/roles.enum";
import { SideBarLink } from "./SideBarLink";

export default function SideBar () {
    const isAllow = useCheckRoles()

    const links = [
        {
            path: 'hotel-rooms',
            title: 'Поиск гостиницы',
        }, {
            path: 'hotels',
            title: 'Все гостиницы',
            allowedRoles: [ Role.Admin ]
        }, {
            path: 'hotel/create',
            title: 'Добавить гостиницу',
            allowedRoles: [ Role.Admin ]
        }, {
            path: 'users',
            title: 'Пользователи',
            allowedRoles: [ Role.Admin, Role.Manager ]
        }

    ]
    
    return (
        <Container>
            <ListGroup variant="flush">
                { links.map((link, index) => <SideBarLink key={index} params={link}/>)}
            </ListGroup>
        </Container>
    )
}