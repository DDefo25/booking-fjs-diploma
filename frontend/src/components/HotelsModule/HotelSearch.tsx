import { Button, Card, Form } from "react-bootstrap";
import { CarouselImages } from "../utilites-components/CarouselImages";
import { useEffect, useReducer, useRef, useState } from "react";

import { IHotelSearch } from "./interfaces/Hotel.search.interface.dto";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { reducer } from "../../reducers/common.reducer";
import axios from "axios";
import { SERVER_URL } from "../../config";



export function HotelSearch ({handlers, formState}: {handlers: any, formState: any}) {
    return (
        <Card>
                <Card.Body>
                    <Card.Title>Поиск гостиницы</Card.Title>
                    <Form onSubmit={handlers.submit}>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formSearchHotelTitle">
                                <Form.Control 
                                    name='title' 
                                    placeholder="Введите название гостиницы (необязательно)" 
                                    type="text" 
                                    value={formState.title}
                                    onChange={handlers.input}/>
                            </Form.Group>
                        </Card.Text>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formSearchHotelStartDate">
                                <Form.Label>Заезд</Form.Label>
                                <Form.Control 
                                    name='startDate'
                                    type="date" 
                                    placeholder="Заезд" 
                                    value={formState.startDate} 
                                    onChange={handlers.input}/>
                            </Form.Group>
                        </Card.Text>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formSearchHotelEndDate">
                                <Form.Label>Выезд</Form.Label>
                                <Form.Control 
                                    name='endDate'
                                    type="date" 
                                    placeholder="Выезд" 
                                    value={formState.endDate} 
                                    onChange={handlers.input}/>
                            </Form.Group>
                        </Card.Text>
                        <Button variant="primary" type="submit">Искать</Button>
                    </Form> 
                </Card.Body>
        </Card>
    )
}