import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { AuthService } from "../../services/auth.service"
import { useAppDispatch } from "../../hooks/hooksRedux";
import { loginUser } from "../../features/userSlice";

export default function PopoverLogin () {
    const dispatch = useAppDispatch();

    const [inputEmail, setInputEmail] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");


    const handlers = {
      submit: async (e: any) => {
        e.preventDefault();
        try {
          const user = await AuthService.login({ email: inputEmail, password: inputPassword })
          dispatch(loginUser({user}))
        } catch (error) {
          console.log(error)
        }
      }
    }

    return (
    <Form onSubmit={handlers.submit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control 
          type="email" 
          placeholder="Введите логин" 
          name='email' 
          onChange={ (e) => setInputEmail(e.target.value) } 
          value={ inputEmail } />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control 
          type="password" 
          placeholder="Введите пароль" 
          name='password' 
          onChange={ (e) => setInputPassword(e.target.value) } 
          value={ inputPassword }/>
      </Form.Group>

      <Button variant="primary" type="submit">Войти</Button>
    </Form>
    )
}