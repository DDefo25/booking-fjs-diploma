import { useEffect, useState } from "react";
import { onConnectSocket, onDisconnectSocket, onSubscribeToChatEvents } from "../../features/slices/socket.io.Slice";
import { useAppDispatch, useTypedSelector } from "../../store/store";
import { socket } from "../../socket/socket";
import { Accordion, Image, Offcanvas } from "react-bootstrap";
import { useGetSupportRequestsQuery } from "../../services/supportRequestAPI";
import { User } from "../../interfaces/User.interface";
import { selectUser } from "../../features/slices/authSlice";
import { LoadingBox } from "../utilites-components/LoadingBox";
import { Handler } from "../../features/handlers/Handler";
import { Pagination } from "../utilites-components/Pagination";
import { SupportRequestItem } from "./SupportRequestitem";

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
    const dispatch = useAppDispatch()
  
    useEffect(() => {
      function onConnect() {
        dispatch( onConnectSocket());
      }
  
      function onDisconnect() {
        dispatch( onDisconnectSocket());
      }
  
      function onFooEvent(value: (...args: any[]) => void ) {
        dispatch( onSubscribeToChatEvents(value));
      }
  
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('foo', onFooEvent);
  
      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('foo', onFooEvent);
      };
    }, []);

    const [show, setShow] = useState(false);
      
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((state) => !state);

    const { role } = useTypedSelector( selectUser ) || {} as User
    const { data: supportRequests, isLoading, isFetching } = useGetSupportRequestsQuery({...initialState, role }, { refetchOnMountOrArgChange: true })

    const [ formState, setForm ] = useState(initialState)

    const handlers = {
        onPaginationClick: (i: number) => Handler.onPaginationClick<GetSupportRequest>(i, setForm)
    }

    useEffect(() => {
        console.log('supportRequests', supportRequests)
    }, [supportRequests])
  
    return (
      <div className="position-fixed m-4 bottom-0" style={{right: '15vw'}}>
        <Image src='https://picsum.photos/60' rounded onClick={toggleShow}/>
        <Offcanvas 
            show={show} 
            onHide={handleClose} 
            scroll 
            backdrop={false} 
            placement='end' 
            name='end' 
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Техническая поддержка</Offcanvas.Title>
            </Offcanvas.Header>
            <div className="loading-box-parent">
                <Accordion flush defaultActiveKey="0">
                { supportRequests && supportRequests.map((sr, index) => {
                    console.log(`${index}`)
                    return <SupportRequestItem eventKey={`${index}`} supportRequest={sr}/>})} 
                </Accordion>
                { isLoading || isFetching ? <LoadingBox /> : null }
                <Pagination 
                    limit={ formState.limit }
                    offset={ formState.offset }
                    count={ 30 }
                    onPaginationClick={ handlers.onPaginationClick }
                    props={{
                        className: 'mt-1'
                    }}
                />
            </div>

        </Offcanvas>
      </div>
    );
}