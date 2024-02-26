import { Accordion, Badge, Stack } from "react-bootstrap"
import { SupportRequest, useGetSupportRequestMessagesQuery } from "../../services/supportRequestAPI"
import { format } from "date-fns"
import { SupportRequestChat } from "./Chat/SupportRequestChat"
import { useEffect, useState } from "react"
import { OnSubscribeToChatMessage } from "../../features/slices/socket.io.Slice"
import { socket } from "../../socket/SocketClient"


export const SupportRequestItem = ({eventKey, supportRequest}: { eventKey: string, supportRequest: SupportRequest }) => {
    const { id, createdAt, hasNewMessages } = supportRequest
    const [ stateHasNewMessages, setState ] = useState(hasNewMessages)
    const { refetch, ...queryResult } = useGetSupportRequestMessagesQuery(id)

    useEffect(() => {
        console.log('hasNewMessages',stateHasNewMessages)
    }, [stateHasNewMessages])
    
    
    const listener = (value: OnSubscribeToChatMessage) => {
        if ( value.supportReqID === id ) {
            setState( true )
            refetch()
        }
    }

    useEffect(() => {
        socket.on('subscribeToChat', listener);
        return () => {
            socket.off('subscribeToChat', listener);
          };
    })
    
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
                queryResult={queryResult}
            />
            </Accordion.Body>
        </Accordion.Item>
    )
}