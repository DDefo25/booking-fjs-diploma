import { Button, Card, Container, Form, Image } from "react-bootstrap";
import { IHotel } from "./interfaces/Hotel.interface.dto";
import { CarouselImages } from "../utilites-components/CarouselImages";
import { useReducer, useRef } from "react";
import { reducer } from "../../reducers/common.reducer";

export function HotelCardCreating () {
    const initialFormState: IHotel = {
        title: '',
        description: '',
        images: [
            "https://picsum.photos/250/200",
            "https://picsum.photos/250/200"
        ]
    }

    const [formState, dispatch] = useReducer(reducer, initialFormState )

    const handleInputChange = (e: any) => {
        dispatch({
            type: 'HANDLE CUSTOM FIELD',
            field: e.target.name,
            payload: e.target.value,
        })
    }

    const handleImageAdd = ({name, value}: {name: string, value: string}) => {
        dispatch({
            type: 'HANDLE ADD ITEM TO ARRAY',
            field: name,
            payload: value,
        })
    }

    const handleImageRemove = ({name, id}: {name: string, id: number}) => {
        dispatch({
            type: 'HANDLE DELETE ITEM FROM ARRAY',
            field: name,
            payload: id,
        })
    }

    return (
        <Card>
            <Form>
                <CarouselImages images={formState.images} imagesInRow={3} handleImageAdd={handleImageAdd} variant={"dark"} fade/>
                <Card.Body>
                    <Card.Title>
                        <Form.Group className="mb-3" controlId="formBasicHotelTitle">
                            <Form.Control 
                                name='title' 
                                placeholder="Название отеля" 
                                type="text" 
                                value={formState.title} 
                                onChange={handleInputChange}/>
                        </Form.Group>
                    </Card.Title>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formBasicHotelDesc">
                            <Form.Control 
                                name='description' 
                                as="textarea" 
                                rows={10} 
                                placeholder="Описание отеля" 
                                value={formState.description} 
                                onChange={handleInputChange}/>
                        </Form.Group>
                    </Card.Text>
                    <Button variant="primary" type="submit">Сохранить</Button>
                </Card.Body>
            </Form>            
        </Card>
    )
}