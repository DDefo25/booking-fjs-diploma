import { Button, Card, Form } from "react-bootstrap";
import { CarouselImages } from "../../utilites-components/CarouselImages";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { HotelEditRequest, useEditHotelMutation, useGetHotelQuery } from "../../../services/hotelAPI";
import { Loading } from "../../utilites-components/Loading";
import { useEffect, useState } from "react";
import { HandlersForm } from "../../interfaces/handlers";

export function HotelCardEdit () {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: hotel, isLoading } = useGetHotelQuery(id!, { refetchOnMountOrArgChange: true})
    const [ editHotel, { isLoading: isLoadingEdit } ] = useEditHotelMutation()

    const initialState: HotelEditRequest = {
        id: '',
        title: '',
        images: [],
        description: ''
    }

    const [ formState, setForm ] = useState( initialState )

    useEffect(() => {
        const { _id, title, images, description } = hotel!
        setForm({
            id: _id!,
            title,
            images,
            description
        })
    }, [hotel])

    const handlers: HandlersForm = {
        onChange: ({target: { name, value }}) => {
            setForm(prev => ({...prev, [name]: value}))
        },

        onSubmit: (event) => {
            event.preventDefault()
            editHotel(formState).then(() => navigate('..'))
            
        },
    }

    if (isLoading) return <Loading />

    return (
        <>
        { hotel ? 
            <Card>
                <Form onSubmit={handlers.onSubmit}>
                    <CarouselImages images={formState.images} imagesInRow={3} variant={"dark"} fade/>
                    <Card.Body>
                        <Card.Title>
                            <Form.Group className="mb-3" controlId="formBasicHotelTitle">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Название отеля" 
                                    name='title'
                                    value={formState.title} 
                                    onChange={handlers.onChange}
                                    disabled={ isLoadingEdit }
                                    readOnly={ isLoadingEdit }
                                />
                            </Form.Group>
                        </Card.Title>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formBasicHotelDesc">
                                <Form.Control 
                                    as="textarea" 
                                    rows={10} 
                                    placeholder="Описание отеля" 
                                    name='description'
                                    value={formState.description} 
                                    onChange={handlers.onChange}
                                    disabled={ isLoadingEdit }
                                    readOnly={ isLoadingEdit }
                                />
                            </Form.Group>
                        </Card.Text>
                        <Button 
                            variant="primary" 
                            type="submit"
                            disabled={ isLoadingEdit }
                        >
                            { isLoadingEdit ? 'Загрузка...' : 'Сохранить'}
                        </Button>
                    </Card.Body>
                </Form>            
            </Card>
        : null}
        </>

    )
}