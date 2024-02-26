import './SupportRequestModule.css'
import { useState } from "react";
import { useTypedSelector } from "../../store/store";
import { Accordion, Image, Offcanvas } from "react-bootstrap";
import { SupportRequestResponse, useGetSupportRequestsQuery } from "../../services/supportRequestAPI";
import { User } from "../../interfaces/User.interface";
import { selectUser } from "../../features/slices/authSlice";
import { LoadingBox } from "../utilites-components/Loading/LoadingBox";
import { Handler } from "../../features/handlers/Handler";
import { Pagination } from "../utilites-components/Pagination";
import { SupportRequestItem } from "./SupportRequestitem";
import { Button } from "@chatscope/chat-ui-kit-react";
import { CreateSupportRequestModal } from "./CreateSupportRequestModal";
import { DOWNLOAD_ASSETS_ICON_URL } from "../../config/config";
import { socket } from '../../socket/SocketClient';
import { useSubcribeSupportChats } from '../../hooks/useSubcribeSupportChats';

interface GetSupportRequest {
    limit: number,
    offset: number,
    isActive: boolean,
}

const initialState: GetSupportRequest = {
    limit: 5,
    offset: 0,
    isActive: true
}

export const SupporRequestModule = () => {
    const [ show, setShow ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);

    const { role } = useTypedSelector( selectUser ) || {} as User
    const [ formState, setForm ] = useState(initialState)

    const { data , isLoading, isFetching } = useGetSupportRequestsQuery({...formState, role })
    const { supportRequests, count } = data || {} as SupportRequestResponse

    const token = localStorage.getItem('token') || '' as string
    useSubcribeSupportChats(token)


    const handlers = {
        onClose: () => {
            setShow(false)
        },
        toggleShow: () => {
            setShow((state) => !state)
        },
        toggleShowModal: () => setShowModal(true),
        onPaginationClick: (i: number) => Handler.onPaginationClick<GetSupportRequest>(i, setForm)
    }
    
    return (
      <div className="position-fixed m-4 bottom-0" style={{right: '15vw'}}>
        <Image 
            className='support-chat-icon'   
            src={DOWNLOAD_ASSETS_ICON_URL + 'support_agent.svg'} rounded onClick={ handlers.toggleShow }/>
        <Offcanvas 
            show={show} 
            onHide={ handlers.onClose } 
            scroll 
            backdrop={false} 
            placement='end' 
            name='end' 
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Техническая поддержка</Offcanvas.Title>
                <Button onClick={ handlers.toggleShowModal }>Новый тикет</Button>
            </Offcanvas.Header>
                <Accordion flush defaultActiveKey="0" className="loading-box-parent">
                { supportRequests && supportRequests.map((sr, index) => {
                    return <SupportRequestItem eventKey={`${index}`} supportRequest={sr}/>})} 
                { isLoading || isFetching ? <LoadingBox /> : null }
                </Accordion>
                
                <Pagination 
                    limit={ formState.limit }
                    offset={ formState.offset }
                    count={ count }
                    onPaginationClick={ handlers.onPaginationClick }
                    props={{
                        className: 'mt-1'
                    }}
                />
        </Offcanvas>
        <CreateSupportRequestModal state={ showModal } dispatch={ setShowModal }/>
      </div>
    );
}