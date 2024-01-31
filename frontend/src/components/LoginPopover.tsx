import { Button, Form } from "react-bootstrap"

export default function LoginForm () {
    return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Введите логин" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Введите пароль" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Войти
      </Button>
    </Form>
    )
}