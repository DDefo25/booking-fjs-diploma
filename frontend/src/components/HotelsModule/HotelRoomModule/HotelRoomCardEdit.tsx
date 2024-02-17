import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import { IHotelRoom } from "../interfaces/HotellRoom.interface.dto";
import { CarouselImages } from "../../utilites-components/CarouselImages";
import { useCheckRoles } from "../../../hooks/useCheckRoles";
import { Role } from "../../../config/roles.enum";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HotelRoomEditRequest, useEditHotelRoomMutation, useGetHotelRoomQuery } from "../../../services/hotelAPI";
import { useEffect, useState } from "react";
import { HandlersForm } from "../../interfaces/handlers";
import { Loading } from "../../utilites-components/Loading";

export function HotelRoomCardEdit () {
    const { roomId } = useParams()
    const navigate = useNavigate()

    const { data: hotelRoom, isLoading } = useGetHotelRoomQuery(roomId!, { refetchOnMountOrArgChange: true})
    const [ editHotelRoom, { isLoading: isLoadingEdit } ] = useEditHotelRoomMutation()

    const initialState: HotelRoomEditRequest = {
        id: '',
        hotel: '',
        images: [],
        description: ''
    }

    const [ formState, setForm ] = useState( initialState )

    useEffect(() => {
        const { _id, images, description, hotel } = hotelRoom!
        setForm({
            id: _id!,
            hotel: hotel?._id ? hotel._id : '',
            images,
            description
        })
    }, [hotelRoom])

    const handlers: HandlersForm = {
        onChange: ({target: { name, value }}) => {
            setForm(prev => ({...prev, [name]: value}))
        },

        onSubmit: (event) => {
            event.preventDefault()
            editHotelRoom(formState)
            .then(() => navigate('..'))
        },
    }

    if (isLoading) return <Loading />

    return (
        <>
        { hotelRoom ? 
        <Card>
            <Form onSubmit={handlers.onSubmit}>
                <CarouselImages images={hotelRoom.images} imagesInRow={3} variant={"dark"} fade/>
                <Card.Body>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formBasicHotelRoomDesc">
                            <Form.Control 
                                as="textarea" 
                                rows={10} 
                                placeholder="Описание комнаты" 
                                name='description'
                                value={ formState.description } 
                                onChange={ handlers.onChange }
                                disabled={ isLoadingEdit }
                                readOnly={ isLoadingEdit }
                                />
                        </Form.Group>                    
                    </Card.Text>
                    <Stack direction="horizontal" gap={3}>
                        <Button 
                            type='submit'
                            variant="warning"
                            disabled={ isLoadingEdit }
                        >
                            {isLoadingEdit ? 'Загрузка...' : 'Сохранить'}
                        </Button>
                    </Stack>
                </Card.Body>
            </Form>
        </Card>
        : null}
        </>
    )
}