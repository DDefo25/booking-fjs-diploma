import { Accordion, Button, Card } from "react-bootstrap"
import { SupportRequest } from "../../services/supportRequestAPI"
import { format } from "date-fns"
import { SupportRequestChat } from "./Chat/SupportRequestChat"

export const SupportRequestItem = ({eventKey, supportRequest}: { eventKey: string, supportRequest: SupportRequest }) => {
    const { id, createdAt } = supportRequest
    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>
                {`ID: ${id}`}
                <small>{`создан: ${format(createdAt, 'dd-MM-yyyy HH:mm')}`}</small>
            </Accordion.Header>
            <Accordion.Body>
                <SupportRequestChat id={id}/>
            </Accordion.Body>
        </Accordion.Item>
    )
}