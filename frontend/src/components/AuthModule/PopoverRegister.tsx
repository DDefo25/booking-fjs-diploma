import { Button, Form } from "react-bootstrap"
import { useState } from "react"
import { AuthService } from "../../services/auth.service"
import { useAppDispatch } from "../../hooks/hooksRedux"
import { loginUser } from "../../features/userSlice"

export default function PopoverRegister () {
    const [inputEmail, setInputEmail] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [inputName, setInputName] = useState<string>("");
    const [inputContactPhone, setInputContactPhone] = useState<string>("");

    const dispatch = useAppDispatch();

    const handlers = {
      submit: async (e: any) => {
        e.preventDefault();
        
        const data = { 
          email: inputEmail, 
          name: inputName, 
          password: inputPassword, 
          contactPhone: inputContactPhone
        }
        
        try {
          const user = await AuthService.register(data)
          dispatch(loginUser({user}))
        } catch (error) {
          console.log(e)
        }
      }
    }

    return (
      <Form onSubmit={handlers.submit}>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control 
            type="text" 
            placeholder="Введите имя" 
            name='name' 
            onChange={ (e) => setInputName(e.target.value) } 
            value={ inputName }
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control 
            type="email" 
            placeholder="Введите логин" 
            name='email' 
            onChange={ (e) => setInputEmail(e.target.value) } 
            value= {inputEmail }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control 
            type="password" 
            placeholder="Введите пароль" 
            name='password' 
            onChange={ (e) => setInputPassword(e.target.value) } 
            value={ inputPassword }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicContactPhone">
          <Form.Control 
            type="phone" 
            placeholder="Введите номер телефона" 
            name='contactPhone' 
            onChange={ (e) => setInputContactPhone(e.target.value) } 
            value={ inputContactPhone }
          />
        </Form.Group>

        <Button variant="primary" type="submit">Регистрация</Button>

    </Form>
    )
}