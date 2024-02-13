import { useEffect, useState } from "react"
import { Button, Form, Spinner } from "react-bootstrap"
import { LoginRequest, useLoginMutation } from "../../services/auth.service"
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooksRedux";
import { authSelector } from "../../features/userSlice";

export default function PopoverLogin () {
  const navigate = useNavigate()

  const [formState, setFormState] = useState<LoginRequest>({
    email: '',
    password: '',
  })

  const { isAuth, isAuthInProgress } = useAppSelector(authSelector)

  const [login, {isLoading}] = useLoginMutation()
  const handlers = {
    onChange: ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: value}))
    },
    
    onSubmit: async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await login(formState).unwrap()
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    console.log({isAuth, isAuthInProgress})
  }, [isAuth, isAuthInProgress])
    
    return (
      <>
      { isLoading ? 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>  
      : 
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
      }
      </>
    )
}