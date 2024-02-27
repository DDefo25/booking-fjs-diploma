import { Button, ButtonProps, Modal } from 'react-bootstrap';

export interface ModalProps {
    title: string,
    body: string,
    buttons: Array<{ text: string } & ButtonProps>,
    handlers: ModalHandlers,
    show: boolean
}

export interface ModalHandlers {
    onClose: () => void
}

export const CustomModal = ({ props }: { props: ModalProps }) => {  
    const { title, body, buttons, handlers, show } = props

  return (
      <>
        <Modal 
            show={ show } 
            onHide={handlers.onClose}
        >
          <Modal.Header closeButton>
            <Modal.Title> { title } </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { body }
          </Modal.Body>
          <Modal.Footer>
            { buttons.map( (props, index) => <Button key={index} {...props}>{props.text}</Button>)}
          </Modal.Footer>
        </Modal>
      </>
  );
};