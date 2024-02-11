import { Button, Form, Spinner } from "react-bootstrap"
import { useState } from "react"
import { AuthService, RegisterRequest, useRegisterMutation } from "../../services/auth.service"
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux"
import { userSelector } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../features/userSlice"

export default function PopoverRegister () {
  const navigate = useNavigate()
  const [formState, setFormState] = useState<RegisterRequest>({
    email: '',
    password: '',
    name: '',
    contactPhone: ''
  })
  
  const [ register, { isLoading }] = useRegisterMutation();

  const handlers = {
      onChange: ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, [name]: value}))
      },
      onSubmit: async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await register(formState).unwrap()
          navigate('/')
        } catch (error) {
          console.log(e)
        }
      }
    }

    return (
      <>
      { isLoading ? 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>  
      : 
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
            placeholder="Введите логин" 
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
    }
    </>
    )
}