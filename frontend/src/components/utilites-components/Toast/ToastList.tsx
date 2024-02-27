import { ToastContainer } from 'react-bootstrap';
import { selectToastList } from '../../../features/slices/toastSlice';
import { useTypedSelector } from '../../../store/store';
import { Toast } from './Toast';

export const ToastList = () => {
  const toastList = useTypedSelector( selectToastList );

  return (
        <ToastContainer className="position-fixed start-0 m-4" style={{ bottom: '10vh' }}>
            { toastList.map( (toast, index) => <Toast key={index} toast={toast} /> ) }
        </ToastContainer>
  );
};