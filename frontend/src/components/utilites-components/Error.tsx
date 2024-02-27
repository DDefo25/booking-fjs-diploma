import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export const ErrorModal = ({ error, handlerOnClose = () => {} }: { error: string, handlerOnClose?: any }) => {
  const [show, setShow] = useState(true);

  const handlers = {
    onClose: () => {
      setShow(false);
      handlerOnClose();
    },
  };
  
  return (
      <>
        <Modal show={show} onHide={handlers.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ошибка</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlers.onClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  );
};