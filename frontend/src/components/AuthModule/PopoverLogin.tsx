import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { LoginRequest, useLoginMutation } from '../../services/authAPI';
import { HandlersForm } from '../../features/handlers/Handler';


export default function PopoverLogin() {
  const navigate = useNavigate();

  const [ login, { error } ] = useLoginMutation({ fixedCacheKey: 'shared-login' });


  const [formState, setFormState] = useState<LoginRequest>({
    email: '',
    password: '',
  });


  const handlers: HandlersForm = {
    onChange: ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((state) => ({ ...state, [name]: value }));
    },
    
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      login(formState);
      navigate('/');
    },
  };

  useEffect(() => {
    
  }, [error]);

  return (
      <>
        <Form onSubmit={handlers.onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control 
              type="email" 
              placeholder="Введите логин" 
              name='email' 
              onChange={ handlers.onChange } 
              value={ formState.email } />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control 
              type="password" 
              placeholder="Введите пароль" 
              name='password' 
              onChange={ handlers.onChange } 
              value={ formState.password }/>
          </Form.Group>
          <Button variant="primary" type="submit">Войти</Button>
        </Form> 
      </>
  );
}