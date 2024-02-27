import { Button, Container, FloatingLabel, Form, Stack } from 'react-bootstrap';
import React, { FormEvent, useState } from 'react';
import { GetUsersRequest, GetUsersResponse, useGetUsersQuery } from '../../services/userAPI';
import { useTypedSelector } from '../../store/store';
import { selectUser } from '../../features/slices/authSlice';
import { Handler } from '../../features/handlers/Handler';
import { LoadingBox } from '../utilites-components/Loading/LoadingBox';
import { Link } from 'react-router-dom';
import { Pagination } from '../utilites-components/Pagination';
import { UsersStack } from './UsersStack';
import { useCheckRoles } from '../../hooks/useCheckRoles';
import { Role } from '../../config/roles.enum';



export default function UsersModule() {
  const user = useTypedSelector( selectUser );

  const initialState: GetUsersRequest = {
    limit: 10,
    offset: 0,
    filter: '',
    requestRole: user && user?.role, 
  };

  const [ formState, setForm ] = useState( initialState );
  const { data, isLoading, isFetching, refetch } = useGetUsersQuery( formState );
  const { users, count } = data || {} as GetUsersResponse;
  const isAllow = useCheckRoles();

  const handlers = {
    onSubmut: (e: FormEvent) => {
      e.preventDefault();
      refetch();
    },

    onChangeInput: (e: React.ChangeEvent) => Handler.onChangeInput<GetUsersRequest>(e, setForm),
    onPaginationClick: (i: number) => Handler.onPaginationClick<GetUsersRequest>(i, setForm),
  };


  return (
        <Container>
            <Form onSubmit={ handlers.onSubmut } className="mb-3">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Введите имя пользователя, id, телефон или почту"
                    className="mb-3"
                >
                    <Form.Control 
                        type="text" 
                        name='filter'
                        placeholder="Введите имя пользователя, id, телефон или почту"
                        onChange={ handlers.onChangeInput }
                    />
                </FloatingLabel>
                <Stack gap={3} direction="horizontal" >
                    <Button 
                        variant="primary" 
                        type="submit"
                        disabled={isLoading || isFetching}
                    >
                        { isLoading || isFetching ? 'Поиск...' : 'Искать' }
                    </Button>
                    { isAllow([ Role.Admin ]) && 
                        <Link to={'create'}>
                            <Button 
                                variant="warning" 
                            >
                                Новый пользователь
                            </Button>
                        </Link>
                    }
                </Stack>
            </Form>
            <Container className="loading-box-parent">
                { users && <UsersStack users={users}/> } 
                { isLoading || isFetching ? <LoadingBox /> : null }
                <Pagination 
                limit={ formState.limit }
                offset={ formState.offset }
                count={ count }
                onPaginationClick={ handlers.onPaginationClick }
                props={{
                  className: 'mt-1',
                }}
                />
            </Container>
        </Container>
  );
}