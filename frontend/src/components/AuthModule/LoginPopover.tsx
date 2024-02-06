import { useReducer } from "react"
import { Button, Form } from "react-bootstrap"
import { reducer } from "../../reducers/common.reducer"
import { AuthService } from "../../services/auth.service"

export default function LoginForm () {
    const initialState = {
      email: '',
      password: '',
      isLoading: true,
      message: ''
    }

    const [ state, dispatch ] = useReducer(reducer, initialState)


    const handlers = {
      input: (e: any) => {
        dispatch({
            type: 'HANDLE CUSTOM FIELD',
            field: e.target.name,
            payload: e.target.value,
        })
      },

      submit: async (e: any) => {
        e.preventDefault();
        
        try {
          const data = await AuthService.login({ email: state.email, password: state.password })
        } catch (error) {
          console.log(e)
        }
      }
    }
  

    return (
    <Form onSubmit={handlers.submit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Введите логин" name='email' onChange={handlers.input} value={state.email} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Введите пароль" name='password' onChange={handlers.input} value={state.password}/>
      </Form.Group>

      <Button variant="primary" type="submit">Войти</Button>
    </Form>
    )
}