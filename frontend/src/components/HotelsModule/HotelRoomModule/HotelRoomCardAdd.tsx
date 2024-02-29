import { Button, Card, Form, Stack } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateHotelRoomMutation } from '../../../services/hotelAPI';
import { useState } from 'react';
import { Handler } from '../../../features/handlers/Handler';
import { CarouselImagesAdd } from '../../utilites-components/CarouselImage/CarouselImagesAdd';
import { useAppDispatch } from '../../../store/store';
import { MAX_LENGTH_DESCRIPTION_HOTEL_ROOM, MAX_LENGTH_TITLE_HOTEL_ROOM } from '../../../config/config';

interface FormState {
  title: string,
  hotel: string,
  description: string,
  images: File[],
  imagesPreview: string[]
}


export function HotelRoomCardAdd() {
  const { id: hotel } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [ createHotelRoom, { isLoading: isCreating } ] = useCreateHotelRoomMutation();

  const initialState: FormState = {
    title: '',
    hotel: hotel!,
    images: [],
    description: '',
    imagesPreview: [],
  };

  const [ formState, setForm ] = useState( initialState );

  const handlers = {
    onSubmit: (event: React.FormEvent) => {
        event.preventDefault();
        const { imagesPreview, ...request } = formState;
        createHotelRoom(request).then((response: any) => {
            if (response.data) navigate('..')
        });
    },

    onChangeInput: (e: React.ChangeEvent) => Handler.onChangeInput<FormState>( e, setForm ),
    onChangeFile: (e: React.ChangeEvent) => Handler.onChangeFile<FormState>( e, setForm, dispatch),
    onDeletePreview: ( index: number ) => Handler.onDeletePreview<FormState>( index, setForm ),
  };


  return (
        <Card className="mb-3">
            <Form onSubmit={handlers.onSubmit}>
                <CarouselImagesAdd 
                    imagesPreview={formState.imagesPreview} 
                    handlers={handlers} 
                    imagesInRow={3} 
                    variant={'dark'} 
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
                                maxLength={ MAX_LENGTH_TITLE_HOTEL_ROOM }
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
                                maxLength={ MAX_LENGTH_DESCRIPTION_HOTEL_ROOM }
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
  );
}