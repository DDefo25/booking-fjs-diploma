import './SupportRequestModule.css';
import { useState } from 'react';
import { useAppDispatch, useTypedSelector } from '../../store/store';
import { Accordion, Image, Offcanvas } from 'react-bootstrap';
import { SupportRequestResponse, useGetSupportRequestsQuery } from '../../services/supportRequestAPI';
import { User } from '../../interfaces/User.interface';
import { selectUser } from '../../features/slices/authSlice';
import { LoadingBox } from '../utilites-components/Loading/LoadingBox';
import { Handler } from '../../features/handlers/Handler';
import { Pagination } from '../utilites-components/Pagination';
import { SupportRequestItem } from './SupportRequestitem';
import { Button } from '@chatscope/chat-ui-kit-react';
import { CreateSupportRequestModal } from './CreateSupportRequestModal';
import { DOWNLOAD_ASSETS_ICON_URL } from '../../config/config';
import { useSubcribeSupportChats } from '../../hooks/useSubcribeSupportChats';
import { BageNewMessages } from '../utilites-components/BadgeNewMessages';
import { useOnSocketMessage } from '../../hooks/useOnSocketMessage';
import { OnSubscribeToChatMessage } from '../../features/slices/socket.io.Slice';
import { ToastTypes } from '../../config/toasts.enums';
import { addToast } from '../../features/slices/toastSlice';

interface GetSupportRequest {
  limit: number,
  offset: number,
  isActive: boolean,
}

const initialState: GetSupportRequest = {
  limit: 5,
  offset: 0,
  isActive: true,
};

export const SupporRequestModule = () => {
  const [ showChats, setShowChats ] = useState(false);
  const [ showBadge, setShowBadge ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ formState, setForm ] = useState(initialState);

  const { role } = useTypedSelector( selectUser ) || {} as User;
  const dispatch = useAppDispatch();

  const { data, isLoading, isFetching, refetch } = useGetSupportRequestsQuery({ ...formState, role });
  const { supportRequests, count } = data || {} as SupportRequestResponse;

  useSubcribeSupportChats();
    
  const listener = (value: OnSubscribeToChatMessage) => {
    refetch();
    dispatch( addToast({
      type: ToastTypes.MessageSupport,
      data: {
        title: 'Новое сообщение от техподдержки',
        message: `ID: ${value.supportReqID}. ${value.message.text}`, 
      },
    }) );
    setShowBadge(true);

  };
  useOnSocketMessage('subscribeToChat', listener);

  const handlers = {
    onClose: () => {
      setShowBadge(false);
      setShowChats(false);
    },
    toggleShow: () => {
      setShowChats((state) => !state);
    },
    toggleShowModal: () => setShowModal(true),
    onPaginationClick: (i: number) => Handler.onPaginationClick<GetSupportRequest>(i, setForm),
  };
    
  return (
      <div className="position-fixed m-4 bottom-0" style={{ right: '15vw' }}>
        <Image 
            className='support-chat-icon'   
            src={DOWNLOAD_ASSETS_ICON_URL + 'support_agent.svg'} rounded onClick={ handlers.toggleShow }/>
        <BageNewMessages 
            show={ showBadge }
        />
        <Offcanvas 
            show={ showChats } 
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
                <Accordion 
                    flush 
                    className="loading-box-parent">
                { supportRequests && supportRequests.map((sr, index) => {
                  return <SupportRequestItem 
                                key={index}
                                eventKey={`${index}`} 
                                supportRequest={sr}
                                refetchSupportRequest={refetch}
                            />;
                })} 
                { isLoading ? <LoadingBox /> : null }
                </Accordion>
                
                <Pagination 
                    limit={ formState.limit }
                    offset={ formState.offset }
                    count={ count }
                    onPaginationClick={ handlers.onPaginationClick }
                    props={{
                      className: 'mt-1',
                    }}
                />
        </Offcanvas>
        <CreateSupportRequestModal state={ showModal } dispatch={ setShowModal }/>
      </div>
  );
};