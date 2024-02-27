import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterRequest, useRegisterMutation } from '../../services/authAPI';
import { HandlersForm } from '../../features/handlers/Handler';



export default function PopoverRegister() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<RegisterRequest>({
    email: '',
    password: '',
    name: '',
    contactPhone: '',
  });
  
  const [ register ] = useRegisterMutation({ fixedCacheKey: 'shared-register' });

  const handlers: HandlersForm = {
    onChange: ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: value }));
    },
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      register(formState);
      navigate('/');
    },
  };

  return (
      <>
      <Form onSubmit={handlers.onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control 
            type="text" 
            placeholder="Введите имя" 
            name='name' 
            onChange={ handlers.onChange } 
            value={ formState.name }
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control 
            type="email" 
            placeholder="Введите email" 
            name='email' 
            onChange={ handlers.onChange } 
            value= { formState.email }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control 
            type="password" 
            placeholder="Введите пароль" 
            name='password' 
            onChange={ handlers.onChange } 
            value={ formState.password }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicContactPhone">
          <Form.Control 
            type="phone" 
            placeholder="Введите номер телефона" 
            name='contactPhone' 
            onChange={ handlers.onChange } 
            value={ formState.contactPhone }
          />
        </Form.Group>

        <Button variant="primary" type="submit">Регистрация</Button>
    </Form>
    </>
  );
}