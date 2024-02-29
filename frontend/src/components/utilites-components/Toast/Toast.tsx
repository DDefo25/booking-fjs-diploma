import { Toast as ReactToast } from 'react-bootstrap';
import { CommonToast, ErrorToast, Toast as IToast, MessageSupportToast, NotifyToast, deleteToast } from '../../../features/slices/toastSlice';
import { useAppDispatch } from '../../../store/store';
import { ToastClasses, ToastImage, ToastTypes } from '../../../config/toasts.enums';

interface ToastCard {
  header: string,
  body: string,
  className: ToastClasses,
  image: ToastImage,
}

export const Toast = ({ toast }: { toast: IToast }) => {
  const { id, type } = toast || {} as IToast;
  const toastCard = {} as ToastCard;

  switch ( type ) {
    case ToastTypes.ErrorResponse: {
      const { data: { data, statusText } } = toast as ErrorToast;
      toastCard.header = statusText;
      toastCard.body = typeof data === 'string' ? data : data.message;
      toastCard.className = ToastClasses.Error;
      toastCard.image = ToastImage.Error;    
      break;
    }
    case ToastTypes.Notify: {
      const { data: { title, message } } = toast as NotifyToast;
      toastCard.header = title;
      toastCard.body = message;
      toastCard.className = ToastClasses.Notify;
      toastCard.image = ToastImage.Notify;    
      break;
    }
    case ToastTypes.MessageSupport: {
      const { data: { title, message } } = toast as MessageSupportToast;
      toastCard.header = title;
      toastCard.body = message;
      toastCard.className = ToastClasses.MessageSupport;
      toastCard.image = ToastImage.MessageSupport;    
      break;
    }
    case ToastTypes.Common: {
      const { data: { title, message } } = toast as CommonToast;
      toastCard.header = title;
      toastCard.body = message;
      toastCard.className = ToastClasses.Common;
      toastCard.image = ToastImage.Common;    
      break;
    }
  }
    
  const dispatch = useAppDispatch();
  const handlers = {
    onClose: () => {
      dispatch( deleteToast(id!));
    },
  };
  
  return (
      <ReactToast 
        className={ toastCard.className }
        delay={ 6000 } 
        onClose={ handlers.onClose }
        autohide
      >
        <ReactToast.Header>
          <img src={ toastCard.image } className="rounded me-2" alt="" />
            <strong className="me-auto">{ toastCard.header }</strong>
        </ReactToast.Header>
      <ReactToast.Body>{ toastCard.body }</ReactToast.Body>
    </ReactToast>
  );
};
