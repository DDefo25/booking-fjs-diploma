import { HotelRequest, useGetHotelsQuery } from '../../services/hotelAPI';
import React, { useState } from 'react';
import { Handler } from '../../features/handlers/Handler';
import { Button, Card, Form } from 'react-bootstrap';
import { HotelCard, HotelCardType } from './HotelCardModule/HotelCard';
import { LoadingBox } from '../utilites-components/Loading/LoadingBox';
import { Pagination } from '../utilites-components/Pagination';


export function HotelsModule() {
  const initialState: HotelRequest = {
    limit: 10,
    offset: 0,
    title: '',
  };

  const [ formState, setForm ] = useState( initialState );
  const { data, isLoading, isFetching, refetch } = useGetHotelsQuery( formState);

  const handlers = {
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      refetch();
    },

    onChangeInput: (e: React.ChangeEvent) => Handler.onChangeInput<HotelRequest>(e, setForm),
    onPaginationClick: (i: number) => Handler.onPaginationClick<HotelRequest>(i, setForm),
  };

    
  return ( 
        <> 
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Поиск гостиницы</Card.Title>
                    <Form onSubmit={ handlers.onSubmit }>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formSearchHotelTitle">
                                <Form.Control 
                                    name='title' 
                                    placeholder="Введите название гостиницы (необязательно)" 
                                    type="text" 
                                    value={formState.title}
                                    onChange={ handlers.onChangeInput }
                                />
                            </Form.Group>
                        </Card.Text>
                        <Button 
                            variant="primary" 
                            type="submit"
                            disabled={isLoading || isFetching}
                        >
                            { isLoading || isFetching ? 'Поиск...' : 'Искать' }
                        </Button>
                    </Form> 
                </Card.Body>
        </Card>
            { data && data.hotels.map( hotel => (
                <div className="loading-box-parent">
                    <HotelCard key={hotel._id} hotel={hotel} type={HotelCardType.General} />
                    { isLoading || isFetching ? <LoadingBox /> : null }
                </div>
            ))}
            {  isLoading || isFetching 
              ? <LoadingBox />
              : data
                && (
                    <Pagination 
                    limit={ formState.limit }
                    offset={ formState.offset }
                    count={ data.count }
                    onPaginationClick={ handlers.onPaginationClick }
                    props={{
                        className: 'mt-1',
                    }}
                    />
                )
            }
        </>
  );
}