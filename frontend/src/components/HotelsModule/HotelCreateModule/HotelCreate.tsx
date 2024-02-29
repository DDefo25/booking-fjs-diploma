import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddHotelMutation } from '../../../services/hotelAPI';
import { Handler } from '../../../features/handlers/Handler';
import { Loading } from '../../utilites-components/Loading/Loading';
import { CarouselImagesAdd } from '../../utilites-components/CarouselImage/CarouselImagesAdd';
import { useAppDispatch } from '../../../store/store';
import { MAX_LENGTH_DESCRIPTION_HOTEL, MAX_LENGTH_TITLE_HOTEL } from '../../../config/config';

export interface HotelAddInitial {
  title: string,
  description: string,
  images: File[],
  imagesPreview: string[]
}


export function HotelCreate() {

  const initialState: HotelAddInitial = {
    title: '',
    description: '',
    images: [],
    imagesPreview: []
  };

  const navigate = useNavigate();
  const [ formState, setForm ] = useState( initialState );
  const [ addHotel, { isLoading }] = useAddHotelMutation();
  const dispatch = useAppDispatch()

  const handlers = {
    onSubmit: (event: React.FormEvent<HTMLFormElement> ) => {
        addHotel(formState).then((response: any) => {
          if (response.data) navigate('..')
        });
    },

    onChangeInput: (e: React.ChangeEvent) => Handler.onChangeInput<HotelAddInitial>( e, setForm ),
    onChangeFile: (e: React.ChangeEvent) => Handler.onChangeFile<HotelAddInitial>( e, setForm, dispatch ),
    onDeletePreview: ( index: number ) => Handler.onDeletePreview<HotelAddInitial>( index, setForm ),
  };

  if (isLoading) return <Loading />;

  return (
        <Card className="mb-3">
            <Form 
              onSubmit={handlers.onSubmit} 
            >
                <CarouselImagesAdd 
                    imagesPreview={formState.imagesPreview} 
                    handlers={handlers} 
                    imagesInRow={3} 
                    variant={'dark'} 
                    fade/>
                <Card.Body>
                    <Card.Title>
                        <Form.Group className="mb-3" controlId="formBasicHotelTitle">
                          <InputGroup hasValidation>
                            <Form.Control 
                                required
                                name='title' 
                                placeholder="Название отеля" 
                                type="text" 
                                value={formState.title} 
                                maxLength={ MAX_LENGTH_TITLE_HOTEL }
                                onChange={ handlers.onChangeInput }/>
                            <Form.Control.Feedback type="invalid">
                                Максимально { MAX_LENGTH_TITLE_HOTEL } символов
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                    </Card.Title>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formBasicHotelDesc">
                          <InputGroup hasValidation>
                            <Form.Control 
                                name='description' 
                                as="textarea" 
                                rows={10} 
                                placeholder="Описание отеля" 
                                value={formState.description}
                                maxLength={ MAX_LENGTH_DESCRIPTION_HOTEL }
                                onChange={ handlers.onChangeInput }/>
                            <Form.Control.Feedback type="invalid">
                                Максимально { MAX_LENGTH_DESCRIPTION_HOTEL } символов
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                    </Card.Text>
                    <Button 
                      variant="primary" 
                      type="submit"
                    > Сохранить </Button>
                </Card.Body>
            </Form>         
        </Card>
  );
}