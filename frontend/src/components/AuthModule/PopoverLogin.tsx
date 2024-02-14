import { useNavigate } from "react-router-dom"
import { LoginRequest, useLoginMutation } from "../../services/auth.service"
import { useState } from "react"
import { Button, Form } from "react-bootstrap"

export default function PopoverLogin () {
  const navigate = useNavigate()

  const [ login ] = useLoginMutation({ fixedCacheKey: 'shared-login'})

  const [formState, setFormState] = useState<LoginRequest>({
    email: '',
    password: '',
  })

  const handlers = {
    onChange: ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: value}))
    },
    
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      login(formState)
      navigate('/')
    }
  }
    
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
    )
}