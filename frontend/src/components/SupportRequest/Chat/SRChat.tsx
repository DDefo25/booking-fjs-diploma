import { Card } from "react-bootstrap"
import { selectSocketSubscribeToChatEvents } from "../../../features/slices/socket.io.Slice"
import { useTypedSelector } from "../../../store/store"
import { SupporRequestChatInput } from "./SRChatInput"
import { useGetSupportRequestMessagesQuery, useGetSupportRequestsQuery } from "../../../services/supportRequestAPI"
import { useState } from "react"
import { selectUser } from "../../../features/slices/authSlice"
import { User } from "../../../interfaces/User.interface"
import { Loading } from "../../utilites-components/Loading"
import { SupporRequestChatMessage } from "./SRChatMessage"

// interface GetSupportRequest {
//     limit: number,
//     offset: number,
//     isActive: boolean,
// }

// const initialState: GetSupportRequest = {
//     limit: 10,
//     offset: 0,
//     isActive: true
// }

export const SupportRequestChat = ({id} : {id: string}) => {
    const subscribeToChatEvents = useTypedSelector( selectSocketSubscribeToChatEvents )
    const { role } = useTypedSelector( selectUser ) || {} as User

    // const [ formState, setForm ] = useState(initialState)

    const { data: messages, isLoading, isFetching } = useGetSupportRequestMessagesQuery(id)
    
    return (
        <>
            <Card.Body>
                { isLoading || isFetching 
                    ? <Loading />
                    : messages?.map( message => <SupporRequestChatMessage message={message} />)
                }
            </Card.Body>
            <Card.Footer>
                <SupporRequestChatInput/>
            </Card.Footer>
        </>
    )
}