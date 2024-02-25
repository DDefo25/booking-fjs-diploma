import { Button, Card, Form, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { HotelRoomAddRequest, HotelRoomEditRequest, useCreateHotelRoomMutation, useEditHotelRoomMutation, useGetHotelRoomQuery } from "../../../services/hotelAPI";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Loading } from "../../utilites-components/Loading/Loading";
import { CarouselImagesEdit } from "../../utilites-components/CarouselImage/CarouselImagesEdit";
import { Handler } from "../../../features/handlers/Handler";
import { CarouselImagesAdd } from "../../utilites-components/CarouselImage/CarouselImagesAdd";

interface FormState {
    title: string,
    hotel: string,
    description: string,
    images: File[],
    imagesPreview: string[]
}


export function HotelRoomCardAdd () {
    const { id: hotel } = useParams()
    const navigate = useNavigate()
    const [ createHotelRoom, { isLoading: isCreating } ] = useCreateHotelRoomMutation()

    const initialState: FormState = {
        title: '',
        hotel: hotel!,
        images: [],
        description: '',
        imagesPreview: [],
    }

    const [ formState, setForm ] = useState( initialState )

    const handlers = {
        onSubmit: (event: React.FormEvent) => {
            event.preventDefault()
            const { imagesPreview, ...request } = formState
            createHotelRoom(request)
            .then(() => navigate('..'))
        },

        onChangeInput: (e: React.ChangeEvent) => Handler.onChangeInput<FormState>( e, setForm ),
        onChangeFile: (e: React.ChangeEvent) => Handler.onChangeFile<FormState>( e, setForm ),
        onDeletePreview: ( index: number ) => Handler.onDeletePreview<FormState>( index, setForm )
    }


    return (
        <Card className="mb-3">
            <Form onSubmit={handlers.onSubmit}>
                <CarouselImagesAdd 
                    imagesPreview={formState.imagesPreview} 
                    handlers={handlers} 
                    imagesInRow={3} 
                    variant={"dark"} 
                    className="p-4"
                    fade/>
                <Card.Body>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formBasicHotelRoomTitle">
                            <Form.Control 
                                type='text'
                                placeholder="Название комнаты" 
                                name='title'
                                value={ formState.title } 
                                onChange={ handlers.onChangeInput }
                                disabled={ isCreating }
                                readOnly={ isCreating }
                                />
                        </Form.Group> 
                        <Form.Group className="mb-3" controlId="formBasicHotelRoomDesc">
                            <Form.Control 
                                as="textarea" 
                                rows={10} 
                                placeholder="Описание комнаты" 
                                name='description'
                                value={ formState.description } 
                                onChange={ handlers.onChangeInput }
                                disabled={ isCreating }
                                readOnly={ isCreating }
                                />
                        </Form.Group>                    
                    </Card.Text>
                    <Stack direction="horizontal" gap={3}>
                        <Button 
                            type='submit'
                            variant="warning"
                            disabled={ isCreating }
                        >
                            {isCreating ? 'Загрузка...' : 'Сохранить'}
                        </Button>
                    </Stack>
                </Card.Body>
            </Form>
        </Card>
    )
}