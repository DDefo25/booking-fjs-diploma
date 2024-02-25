import { Button, Card, Form, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { HotelRoomEditRequest, useEditHotelRoomMutation, useGetHotelRoomQuery } from "../../../services/hotelAPI";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Loading } from "../../utilites-components/Loading/Loading";
import { CarouselImagesEdit } from "../../utilites-components/CarouselImage/CarouselImagesEdit";
import { Handler } from "../../../features/handlers/Handler";

export function HotelRoomCardEdit () {
    const { roomId } = useParams()
    const navigate = useNavigate()

    const { data: hotelRoom, isLoading } = useGetHotelRoomQuery(roomId!, { refetchOnMountOrArgChange: true})
    const [ editHotelRoom, { isLoading: isLoadingEdit } ] = useEditHotelRoomMutation()

    const initialState: HotelRoomEditRequest = {
        id: '',
        title: '',
        hotel: '',
        images: [],
        description: '',
        imagesFiles: [],
        imagesPreview: [],
    }

    const [ formState, setForm ] = useState( initialState )
    const formRef = useRef() as MutableRefObject<HTMLFormElement>

    useEffect(() => {
        if (hotelRoom) {
            const { _id, images, description, hotel, title } = hotelRoom
            console.log('hotelRoom', hotelRoom)
            setForm({
                id: _id!,
                title,
                hotel,
                images,
                description,
                imagesFiles: [],
                imagesPreview: []
            })
        }
    }, [hotelRoom])

    const handlers = {
        onSubmit: (event: React.FormEvent) => {
            event.preventDefault()

            editHotelRoom({id: roomId, data: formState})
            .then(() => navigate('..'))
        },

        onChangeInput: (e: React.ChangeEvent) => Handler.onChangeInput<HotelRoomEditRequest>( e, setForm ),
        onChangeFile: (e: React.ChangeEvent) => Handler.onChangeFile<HotelRoomEditRequest>( e, setForm ),
        onDelete: ( index: number ) => Handler.onDelete<HotelRoomEditRequest>( index, setForm ),
        onDeletePreview: ( index: number ) => Handler.onDeletePreview<HotelRoomEditRequest>( index, setForm )
    }

    useEffect(() => {
        console.log('formState', formState)

    }, [formState])

    if (isLoading) return <Loading />

    return (
        <>
        { hotelRoom ? 
        <Card className="mb-3">
            <Form ref={formRef} onSubmit={handlers.onSubmit}>
                <CarouselImagesEdit 
                    images={formState.images} 
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
                                disabled={ isLoadingEdit }
                                readOnly={ isLoadingEdit }
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