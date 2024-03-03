import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddHotelMutation } from '../../../services/hotelAPI';
import { Handler } from '../../../features/handlers/Handler';
import { useAppDispatch } from '../../../store/store';
import { useForm } from 'react-hook-form';
import { Loading } from '../../utilites-components/Loading/Loading';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { CarouselImagesAdd } from '../../utilites-components/CarouselImage/CarouselImagesAdd';
import { MAX_LENGTH_TITLE_HOTEL, MAX_LENGTH_DESCRIPTION_HOTEL } from '../../../config/config';

export interface HotelAddRequest {
  title: string,
  description: string,
  images: File[]
}

interface TextForm {
  title: string,
  description: string,
}

interface ImagesForm {
  images: File[],
  imagesPreview: string[]
}


export function HotelCreate() {

  const initialImagesForm: ImagesForm = {
    imagesPreview: [],
    images: []
  };

  const initialTextForm: TextForm = {
    title: '',
    description: '',
  };

  const [ imagesState, setImages ] = useState( initialImagesForm );
  const { 
    formState: { errors, isValid, isDirty, submitCount }, 
    register, 
    handleSubmit: textFormSubmit,
  } = useForm<TextForm>({
    defaultValues: initialTextForm
  })

  const navigate = useNavigate();
  const [ addHotel, { isLoading } ] = useAddHotelMutation();
  const dispatch = useAppDispatch()

  const handlers = {
    onSubmitData: (data: TextForm ) => { 
      const  { images } = imagesState    
      addHotel({ ...data, images }).then((response: any) => {
          if (response.data) navigate('/hotels')
      });
    },

    onChangeFile: (e: React.ChangeEvent) => Handler.onChangeFile<ImagesForm>( e, setImages, dispatch ),
    onDeletePreview: ( index: number ) => Handler.onDeletePreview<ImagesForm>( index, setImages ),
  };

  if (isLoading) return <Loading />;

  return (
        <Card className="mb-3">
            <Form 
              validated={isValid && isDirty }
              onSubmit={ textFormSubmit(handlers.onSubmitData) } 
            >
                <CarouselImagesAdd 
                    imagesPreview={imagesState.imagesPreview} 
                    handlers={handlers} 
                    imagesInRow={3} 
                    variant={'dark'} 
                    fade
                />
                <Card.Body>
                    <Card.Title>
                        <InputGroup className="mb-3" >
                            <Form.Control 
                                placeholder="Название отеля" 
                                isInvalid={ !!errors.title }
                                { ...register('title', {
                                  required: 'Введите название отеля',
                                  maxLength: {
                                    value: MAX_LENGTH_TITLE_HOTEL,
                                    message: `Максимально ${ MAX_LENGTH_TITLE_HOTEL } символов`
                                  }
                                })}
                            />
                            { errors.title &&
                              <div className="invalid-tooltip" style={{display: 'block'}}>
                                {errors.title.message}
                              </div> 
                            }
                         </InputGroup>
                    </Card.Title>
                    <Card.Text>
                          <InputGroup className="mb-3">
                            <Form.Control 
                                as="textarea" 
                                rows={5} 
                                placeholder="Описание отеля"
                                isInvalid={ !!errors.description }
                                { ...register('description', {
                                  required: 'Введите описание отеля',
                                  maxLength: {
                                    value: MAX_LENGTH_DESCRIPTION_HOTEL,
                                    message: `Максимально ${ MAX_LENGTH_DESCRIPTION_HOTEL } символов`
                                  }
                                })}
                            />
                            { errors.description &&
                              <div className="invalid-tooltip" style={{display: 'block'}}>
                                {errors.description.message}
                              </div> 
                            }
                          </InputGroup>
                    </Card.Text>
                    <Button 
                      variant="primary" 
                      type="submit"
                      disabled={ !isValid || !isDirty }
                    > Сохранить </Button>
                </Card.Body>
            </Form>         
        </Card>
  );
}