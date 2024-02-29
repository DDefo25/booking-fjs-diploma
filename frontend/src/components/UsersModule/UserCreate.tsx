import { Button, Card, Form, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateUserRequest, useCreateUserMutation } from '../../services/userAPI';
import { Role } from '../../config/roles.enum';
import { Handler } from '../../features/handlers/Handler';
import { Loading } from '../utilites-components/Loading/Loading';
import { useTypedSelector } from '../../store/store';
import { selectUser } from '../../features/slices/authSlice';

interface CreateUserRequestExtended extends CreateUserRequest {
  passwordRepeat: string,
  validated: boolean,
  firstName: string,
  lastName: string
  middleName: string
}

export function UserCreate() {

  const user = useTypedSelector( selectUser );

  const initialState: CreateUserRequestExtended = {
    name: '',
    email: '',
    password: '',
    contactPhone: '',
    role: Role.Client,
    requestRole: user && user.role,

    firstName: '',
    lastName: '',
    middleName: '',
    passwordRepeat: '',
    validated: false,
  };

  const navigate = useNavigate();
  const [ formState, setForm ] = useState( initialState );
  const [ createUser, { isLoading }] = useCreateUserMutation();

  const isEqualPasswords = () => formState.password === formState.passwordRepeat;

  const handlers = {
    onChangeInput: (e: React.ChangeEvent) => Handler.onChangeInput<CreateUserRequestExtended>(e, setForm),

    onChangeInputNames: ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...formState,
        [name]: value,
        name: `${formState.lastName} ${formState.firstName} ${formState.middleName}`,
      });

    },

    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      const form = e.currentTarget;

      if ( !form.checkValidity() ) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        const {
          firstName,
          lastName,
          middleName,
          passwordRepeat,
          validated,
          ...requestData
        } = formState;

        createUser(requestData).then(({ data }: any) => {
          navigate('..');
        });
      }
            
      setForm({
        ...formState, 
        validated: true,
      });
    },
  };

  if (isLoading) return <Loading />;

  return (
        <Card>
            <Form 
                noValidate 
                validated={ formState.validated } 
                onSubmit={ handlers.onSubmit }
            >
                <Card.Body>
                    <Card.Text>

                        <Row className="mb-2">
                            <Form.Group as={Col} md="4" controlId="formBasicUserLastName">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name='lastName' 
                                    placeholder="Введите фамилию" 
                                    value={ formState.lastName } 
                                    onChange={ handlers.onChangeInputNames }
                                />
                                <Form.Control.Feedback type="invalid">Введите фамилию</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="formBasicUserFirstName">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name='firstName' 
                                    placeholder="Введите имя" 
                                    value={ formState.firstName } 
                                    onChange={ handlers.onChangeInputNames }
                                />
                                <Form.Control.Feedback type="invalid">Введите имя</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="formBasicUserMiddleName">
                                <Form.Label>Отчество</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='middleName' 
                                    placeholder="Введите отчество" 
                                    value={ formState.middleName } 
                                    onChange={ handlers.onChangeInputNames }
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="formBasicUserEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    required
                                    name='email' 
                                    placeholder="Введите email" 
                                    type="email" 
                                    value={ formState.email } 
                                    onChange={ handlers.onChangeInput }/>
                                <Form.Control.Feedback type="invalid">
                                    Введите email
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="formBasicUserContactPhone">
                                <Form.Label>Номер телефона</Form.Label>
                                <Form.Control 
                                    name='contactPhone' 
                                    placeholder="Введите номер телефона" 
                                    type="text" 
                                    value={ formState.contactPhone } 
                                    onChange={ handlers.onChangeInput }/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="5" controlId="formBasicUserPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control
                                    required
                                    name='password' 
                                    placeholder="Введите пароль" 
                                    type="password" 
                                    value={ formState.password } 
                                    onChange={ handlers.onChangeInput }/>
                                <Form.Control.Feedback type="invalid">
                                    Введите пароль
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="5" controlId="formBasicUserPasswordRepeat">
                                <Form.Label>Повторите пароль</Form.Label>
                                <Form.Control
                                    required
                                    name='passwordRepeat' 
                                    placeholder="Повторите пароль" 
                                    type="password" 
                                    isInvalid={ !!formState.passwordRepeat && !isEqualPasswords() }
                                    value={ formState.passwordRepeat } 
                                    onChange={ handlers.onChangeInput }/>
                                <Form.Control.Feedback type="invalid">
                                    Пароли не совпадают
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="2" controlId="formBasicUserRole">
                                <Form.Label>Роль</Form.Label>
                                <Form.Select 
                                        aria-label="Выберите роль"
                                        name="role"
                                        onChange={ handlers.onChangeInput }
                                    >
                                    { Object.values(Role).map( (role, index) => {
                                      if (role !== 'common') {
                                        return (
                                                <option key={index} value={role}> 
                                                    {role} 
                                                </option>
                                        );
                                      }
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </Card.Text>
                    <Button 
                        variant="primary" 
                        type="submit"
                        disabled={isLoading}
                    >
                        { isLoading ? 'Отправка...' : 'Создать' }
                    </Button>
                </Card.Body>      
            </Form>
        </Card>
  );
}
