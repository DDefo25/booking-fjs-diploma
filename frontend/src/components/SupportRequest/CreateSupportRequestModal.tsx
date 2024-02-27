import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Handler } from '../../features/handlers/Handler';
import { CreateSupportRequest, useCreateSupportRequestMutation } from '../../services/supportRequestAPI';


export const CreateSupportRequestModal = ({ state, dispatch }: { state: boolean, dispatch: React.Dispatch<boolean> }) => {  
  const initialState: CreateSupportRequest = {
    text: '',
  };
  const [ formState, setForm ] = useState(initialState);

  const [ createSupportRequest, { isLoading } ] = useCreateSupportRequestMutation();

  const handlers = {
    onSubmit: (e: FormEvent) => {
      e.preventDefault();
      createSupportRequest( formState );
      if (!isLoading) handlers.onClose();
    },

    onClose: () => {
      setForm(() => initialState);
      dispatch(false);
    },

    onChange: (e: ChangeEvent) => Handler.onChangeInput<CreateSupportRequest>(e, setForm),
  };
  
  return (
      <>
        <Modal show={ state } onHide={handlers.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Новый тикет</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Опишите запрос</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4}
                  autoFocus
                  name="text"
                  value={ formState.text }
                  onChange={ handlers.onChange } 
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlers.onClose}>
              Отмена
            </Button>
            <Button 
              variant="primary" 
              disabled={ isLoading }
              onClick={ handlers.onSubmit }
            >
              { isLoading ? 'Сохранение' : 'Сохранить' }
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  );
};