import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditHotelMutation, useGetHotelQuery } from '../../../services/hotelAPI';
import { Loading } from '../../utilites-components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import { Handler } from '../../../features/handlers/Handler';
import { CarouselImagesEdit } from '../../utilites-components/CarouselImage/CarouselImagesEdit';
import { error } from 'console';
import { useAppDispatch } from '../../../store/store';
import { MAX_LENGTH_DESCRIPTION_HOTEL, MAX_LENGTH_TITLE_HOTEL } from '../../../config/config';

export interface HotelEditInitial {
  id: string,
  title: string,
  description: string,
  images: string[],
  imagesFiles: File[]
  imagesPreview: string[],
}


export function HotelCardEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const initialState: HotelEditInitial = {
    id: '',
    title: '',
    images: [],
    description: '',
    imagesFiles: [],
    imagesPreview: [],
  };

  const [ formState, setForm ] = useState( initialState );

  const { data: hotel, isLoading, isFetching } = useGetHotelQuery(id!);
  const [ editHotel, { isLoading: isEditing } ] = useEditHotelMutation();

  useEffect(() => {
    if (hotel) {
      const { _id, title, images, description } = hotel!;
      setForm({
        id: _id!,
        title,
        images,
        description,
        imagesFiles: [],
        imagesPreview: [],
      });
    }
  }, [hotel]);

  const handlers = {

    onSubmit: (event: React.FormEvent) => {
      event.preventDefault();
      editHotel(formState).then((response: any) => {
        if (response.data) navigate('..')
      })
    },

    onChangeInput: (e: React.ChangeEvent) => Handler.onChangeInput<HotelEditInitial>( e, setForm ),
    onChangeFile: (e: React.ChangeEvent) => Handler.onChangeFile<HotelEditInitial>( e, setForm, dispatch ),
    onDelete: ( index: number ) => Handler.onDelete<HotelEditInitial>( index, setForm ),
    onDeletePreview: ( index: number ) => Handler.onDeletePreview<HotelEditInitial>( index, setForm ),
  };

  if (isLoading || isFetching) return <Loading />;

  return (
            <Card>
                <Form onSubmit={ handlers.onSubmit }>
                    <CarouselImagesEdit 
                        images={ formState.images } 
                        imagesPreview={ formState.imagesPreview } 
                        imagesInRow={3} 
                        handlers={ handlers }
                        variant={'dark'} 
                        className="p-4"
                        fade/>
                    <Card.Body>
                        <Card.Title>
                            <Form.Group className="mb-3" controlId="formBasicHotelTitle">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Название отеля" 
                                    name='title'
                                    value={formState.title} 
                                    maxLength={ MAX_LENGTH_TITLE_HOTEL }
                                    onChange={ handlers.onChangeInput }
                                    disabled={ isEditing }
                                    readOnly={ isEditing }
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
                                    maxLength={ MAX_LENGTH_DESCRIPTION_HOTEL }
                                    onChange={ handlers.onChangeInput }
                                    disabled={ isEditing }
                                    readOnly={ isEditing }
                                />
                            </Form.Group>
                        </Card.Text>
                        <Button 
                            variant="primary" 
                            type="submit"
                            disabled={ isEditing }
                        >
                            { isEditing ? 'Загрузка...' : 'Сохранить'}
                        </Button>
                    </Card.Body>
                </Form>            
            </Card>
  );
}