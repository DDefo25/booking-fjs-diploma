import { Accordion, Badge, Stack } from 'react-bootstrap';
import { SupportRequest, useLazyGetSupportRequestMessagesQuery } from '../../services/supportRequestAPI';
import { format } from 'date-fns';
import { SupportRequestChat } from './Chat/SupportRequestChat';
import { useState } from 'react';
import { OnSubscribeToChatMessage } from '../../features/slices/socket.io.Slice';
import { useOnSocketMessage } from '../../hooks/useOnSocketMessage';


export const SupportRequestItem = ({
  eventKey, 
  supportRequest, 
  refetchSupportRequest,
}: { 
  eventKey: string, 
  supportRequest: SupportRequest,
  refetchSupportRequest: () => any
}) => {
  const { id, createdAt, hasNewMessages } = supportRequest;
  const [ show, setShow ] = useState( false );
  const [ getMessages, messagesQuery ] = useLazyGetSupportRequestMessagesQuery();


  const handlers = {
    onEnter: () => {
      getMessages(id);
      setShow(true);
    },
    onExit: () => {
      setShow(false);
    },
  };

  const listener = (value: OnSubscribeToChatMessage) => {
    if ( value.supportReqID === id ) {
      refetchSupportRequest();
      getMessages( id );
    }
  };
  useOnSocketMessage('subscribeToChat', listener);

  return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header className="position-relative">
                <Stack direction="horizontal" gap={3}>
                    {`ID: ${id}`}
                    <small>{`создан: ${format(createdAt, 'dd-MM-yyyy HH:mm')}`}</small>
                </Stack>
                { hasNewMessages 
                    && 
                    <Badge 
                        pill 
                        bg="primary" 
                        className="position-absolute"
                        style={{ top: 10, left: 50 }}
                    >
                        Новые сообщения
                    </Badge>
                }  
            </Accordion.Header>
            <Accordion.Body
                onEnter={handlers.onEnter}
                onExit={handlers.onExit}
            >
                { show && <SupportRequestChat 
                    id={id} 
                    hasNewMessages={hasNewMessages}
                    refetchSupportRequest={refetchSupportRequest}
                    messagesQuery={messagesQuery}
                /> }
            </Accordion.Body>
        </Accordion.Item>
  );
};