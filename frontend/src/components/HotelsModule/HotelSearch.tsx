import { Button, Card, Form } from "react-bootstrap";
import { CarouselImages } from "../utilites-components/CarouselImages";
import { useEffect, useReducer, useRef, useState } from "react";
import { cardEditReducer } from "./reducers/cardEdit.reducer";
import { IHotelSearch } from "./interfaces/Hotel.search.interface.dto";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { inputText } from "../../features/inputFieldSlice";


export function HotelSearch () {
    const initialFormState: IHotelSearch = {
        title: '',
        startDate: '',
        endDate: ''
    }

    // const [ formState, dispatch ] = useReducer(cardEditReducer, initialFormState )

    // const handleInputChange = (e: any) => {
    //     dispatch({
    //         type: 'HANDLE INPUT TEXT',
    //         field: e.target.name,
    //         payload: e.target.value,
    //     })
    // }

    // useEffect(() => {
    //     console.log(formState)
    // }, [formState])

    const title = useAppSelector((state) => state.input.title)
    const dispatch = useAppDispatch()


    return (
        <Card>
                <Card.Body>
                    <Card.Title>Поиск гостиницы</Card.Title>
                    <Form>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formSearchHotelTitle">
                                <Form.Control 
                                    name='title' 
                                    placeholder="Введите название гостиницы (необязательно)" 
                                    type="text" 
                                    value={title}
                                    onChange={(e) => dispatch(inputText(e.target.value))}/>
                            </Form.Group>
                        </Card.Text>
                        {/* <Card.Text>
                            <Form.Group className="mb-3" controlId="formSearchHotelStartDate">
                                <Form.Label>Заезд</Form.Label>
                                <Form.Control 
                                    name='startDate'
                                    type="date" 
                                    placeholder="Заезд" 
                                    value={formState.startDate} 
                                    onChange={handleInputChange}/>
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
                                    onChange={handleInputChange}/>
                            </Form.Group>
                        </Card.Text> */}
                        <Button variant="primary" type="submit">Искать</Button>
                    </Form> 
                </Card.Body>
        </Card>
    )
}