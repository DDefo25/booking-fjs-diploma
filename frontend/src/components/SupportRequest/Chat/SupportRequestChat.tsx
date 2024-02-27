import './SupportRequestChat.css';
import { useTypedSelector } from '../../../store/store';
import { useCloseSupportRequestMutation, useReadSupportRequestMessagesMutation, useSendSupportRequestMessageMutation, Message as MessageType } from '../../../services/supportRequestAPI';
import { selectUser } from '../../../features/slices/authSlice';
import { User } from '../../../interfaces/User.interface';
import { ChatContainer, MessageList, Message, MessageInput, Button } from '@chatscope/chat-ui-kit-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { useCheckRoles } from '../../../hooks/useCheckRoles';
import { Role } from '../../../config/roles.enum';

interface ChatInput {
  text: string
}

const initialState: ChatInput = {
  text: '',
};

interface IHandlers {
  onSubmit: (e: React.FormEvent) => void,
  onChangeMessageInput: (innerHtml: string, textContent: string, innerText: string, nodes: NodeList) => void,
  onSend: (innerHtml: string, textContent: string, innerText: string, nodes: NodeList) => void,
  onClose: () => void,
  onScrollDown: () => void
}


export const SupportRequestChat = ({
  id, 
  refetchSupportRequest,
  hasNewMessages,
  messagesQuery,
} : {
  id: string, 
  refetchSupportRequest: () => any,
  hasNewMessages: boolean,
  messagesQuery: any
}) => {
  const { _id: userId } = useTypedSelector( selectUser ) || {} as User;
  const isAllow = useCheckRoles();

  const [ sendMessage, { isLoading: isSending } ] = useSendSupportRequestMessageMutation();
  const [ closeSupportRequest, { isLoading: isClosing }] = useCloseSupportRequestMutation();
  const [ readMessages, { isLoading: isReading }] = useReadSupportRequestMessagesMutation();
  const [ formState, setForm ] = useState(initialState);

  const { data: messages, isLoading } = messagesQuery;


  const handlers: IHandlers = {
    onSubmit: ( e ) => {
      e.preventDefault();
    },

    onChangeMessageInput: ( innerHtml: string  ) => {
      setForm( prev => ({
        ...prev,
        text: innerHtml,
      }));
    },

    onSend: () => {
      sendMessage({ ...formState, id });
      setForm(() => initialState);
    },

    onClose: () => {
      closeSupportRequest(id);
      setForm(() => initialState);
    },

    onScrollDown: () => {
      if (!isReading && hasNewMessages) {
        refetchSupportRequest();
        readMessages({
          id,
          createdBefore: new Date().toISOString(),
        });
      }
    },
  };

  const messagesComponent = messages && messages.map( (message: MessageType, index: number) => {
    const { author: { _id: authotId, name, role }, text, sentAt, readAt } = message;
    const direction = userId === authotId ? 'outgoing' : 'incoming';
        
    return (<Message key={index} model={{
      message: text,
      direction,
      position: 'single',
      type: 'text',
    }}>
            <Message.Footer 
                sentTime={ formatDistanceToNow(sentAt, { locale: ru }) }
                sender={ name } 
            />
        </Message>
    );
  });
    
  return (<>
    <ChatContainer className="support-request-chat">       
        <MessageList
            loading={ 
                isLoading ||
                isSending
            }
            onYReachEnd={ handlers.onScrollDown }
        >
            { messagesComponent }
        </MessageList>
        <MessageInput 
            placeholder="введите сообщение"
            value={formState.text}
            onChange={handlers.onChangeMessageInput}
            onSend={handlers.onSend}
            attachButton={false}
            disabled={isSending}
        /> 
    </ChatContainer>
    { isAllow([ Role.Manager ]) 
        && <Button 
            onClick={handlers.onClose}
            disabled={isClosing}
        > 
            { isClosing ? 'Закрытие...' : 'Закрыть тикет'}
        </Button> 
    }
    </>);
};