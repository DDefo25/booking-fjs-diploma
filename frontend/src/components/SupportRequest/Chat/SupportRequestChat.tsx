import './SupportRequestChat.css'
import { useTypedSelector } from "../../../store/store"
import { useCloseSupportRequestMutation, useGetSupportRequestMessagesQuery, useReadSupportRequestMessagesMutation, useSendSupportRequestMessageMutation } from "../../../services/supportRequestAPI"
import { selectUser } from "../../../features/slices/authSlice"
import { User } from "../../../interfaces/User.interface"
import { ChatContainer, MessageList, Message, MessageInput, Button } from '@chatscope/chat-ui-kit-react';
import { formatDistanceToNow } from "date-fns"
import { ru } from 'date-fns/locale'
import { useEffect, useState } from "react"
import { useCheckRoles } from '../../../hooks/useCheckRoles'
import { Role } from '../../../config/roles.enum'
import { socket } from '../../../socket/SocketClient'

interface ChatInput {
    text: string
}

const initialState: ChatInput = {
    text: ''
}

interface IHandlers {
    onSubmit: (e: React.FormEvent) => void,
    onChangeMessageInput: (innerHtml: string, textContent: string, innerText: string, nodes: NodeList) => void,
    onSend: (innerHtml: string, textContent: string, innerText: string, nodes: NodeList) => void,
    onClose: () => void,
    onScrollDown: () => void
}


export const SupportRequestChat = ({
    id, 
    hasNewMessages,
    dispatch
} : {
    id: string, 
    hasNewMessages: boolean,
    dispatch: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { _id: userId } = useTypedSelector( selectUser ) || {} as User
    const isAllow = useCheckRoles()


    const { data: messages, isLoading, isFetching, refetch } = useGetSupportRequestMessagesQuery(id)
    const [ sendMessage, { isLoading: isSending } ] = useSendSupportRequestMessageMutation()
    const [ closeSupportRequest, { isLoading: isClosing }] = useCloseSupportRequestMutation()
    const [ readMessages, { isLoading: isReading }] = useReadSupportRequestMessagesMutation()
    const [ formState, setForm ] = useState(initialState)

    useEffect(() => {
        socket.on('subscribeToChat', refetch);
        return () => {
            socket.off('subscribeToChat', refetch);
          };
    })

    const handlers: IHandlers = {
        onSubmit: ( e ) => {
            e.preventDefault()
        },

        onChangeMessageInput: ( innerHtml: string  ) => {
            setForm( prev => ({
                ...prev,
                text: innerHtml
            }))
        },

        onSend: () => {
            sendMessage({...formState, id })
            setForm(() => initialState)
        },

        onClose: () => {
            closeSupportRequest(id)
            setForm(() => initialState)
        },

        onScrollDown: () => {
            if (!isReading && hasNewMessages) {
                dispatch( false )
                readMessages({
                    id,
                    createdBefore: new Date().toISOString()
                })
            }
        }
    }

    const messagesComponent = messages && messages.map( message => {
        const { author: { _id: authotId, name, role }, text, sentAt, readAt } = message
        const direction = userId === authotId ? 'outgoing' : 'incoming'
        
        return (<Message model={{
            message: text,
            direction,
            position: 'single',
            type: 'text'
        }}>
            <Message.Footer 
                sentTime={ formatDistanceToNow(sentAt, { locale: ru }) }
                sender={ name } 
            />
        </Message>
    )})
    
    return (<>
    <ChatContainer className="support-request-chat">       
        <MessageList
            loading={isLoading || isFetching || isSending || isReading}
            autoScrollToBottomOnMount={true}
            autoScrollToBottom={true}
            disableOnYReachWhenNoScroll={true}
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
    </>)
}