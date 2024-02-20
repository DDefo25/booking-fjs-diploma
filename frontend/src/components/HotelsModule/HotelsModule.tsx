import { HotelRequest, useGetHotelsQuery } from "../../services/hotelAPI";
import React, { useState } from "react";
import { Handler } from "../../features/handlers/Handler";
import { Button, Card, Container, Form } from "react-bootstrap";
import { HotelCard } from "./HotelCardModule/HotelCard";
import { LoadingBox } from "../utilites-components/LoadingBox";


export function HotelsModule () {
    const initialState: HotelRequest = {
        limit: 10,
        offset: 0,
        title: ''
    }

    const [ formState, setForm ] = useState( initialState );
    const { data: hotels, isLoading, isFetching, refetch } = useGetHotelsQuery( formState, { refetchOnFocus: true })

    const handlers = {
        onSubmit: (e: React.FormEvent) => {
            e.preventDefault()
            refetch()
        },

        onChangeInput: (e: React.ChangeEvent) => Handler.onChangeInput<HotelRequest>(e, setForm)
    }

    
    return ( 
        <> 
            <Card>
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
            { hotels && hotels.map( hotel => (
                <Container className="loading-box-parent">
                    <HotelCard key={hotel._id} hotel={hotel}/>
                    { isLoading || isFetching ? <LoadingBox /> : null }
                </Container>
            ))}


        </>
    )
}