import { Button, Form } from "react-bootstrap"
import { reducer } from "../../reducers/common.reducer"
import { useReducer } from "react"
import { AuthService } from "../../services/auth.service"

export default function RegisterForm () {
    const initialState = {
      email: '',
      name: '',
      password: '',
      contactPhone: '',
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
        const { email, name, password, contactPhone } = state
        
        try {
          const data = await AuthService.register({ email, name, password, contactPhone })
          console.log(data)
        } catch (error) {
          console.log(e)
        }
      }
    }

    return (
      <Form onSubmit={handlers.submit}>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control type="text" placeholder="Введите имя" name='name' onChange={handlers.input} value={state.name}/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Введите логин" name='email' onChange={handlers.input} value={state.email} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Введите пароль" name='password' onChange={handlers.input} value={state.password}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicContactPhone">
          <Form.Control type="phone" placeholder="Введите номер телефона" name='contactPhone' onChange={handlers.input} value={state.contactPhone}/>
        </Form.Group>

        <Button variant="primary" type="submit">Регистрация</Button>

    </Form>
    )
}