import { Accordion, Badge, Stack } from "react-bootstrap"
import { SupportRequest } from "../../services/supportRequestAPI"
import { format } from "date-fns"
import { SupportRequestChat } from "./Chat/SupportRequestChat"
import { useState } from "react"


export const SupportRequestItem = ({eventKey, supportRequest}: { eventKey: string, supportRequest: SupportRequest }) => {
    const { id, createdAt, hasNewMessages } = supportRequest
    const [ stateHasNewMessages, setState ] = useState(hasNewMessages)
    
    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header className="position-relative">
                <Stack direction="horizontal" gap={3}>
                    {`ID: ${id}`}
                    <small>{`создан: ${format(createdAt, 'dd-MM-yyyy HH:mm')}`}</small>
                </Stack>
                { stateHasNewMessages && 
                    <Badge 
                        pill 
                        bg="primary" 
                        className="position-absolute"
                        style={{ top: 10, left: 50}}
                    >
                        Новые сообщения
                    </Badge>
                }  
            </Accordion.Header>
            <Accordion.Body>
                <SupportRequestChat 
                id={id} 
                hasNewMessages={stateHasNewMessages}
                dispatch={setState}
            />
            </Accordion.Body>
        </Accordion.Item>
    )
}