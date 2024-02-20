import { Button, Card, Form } from "react-bootstrap";
import { CarouselImages } from "../../utilites-components/CarouselImages";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { HotelEditRequest, useEditHotelMutation, useGetHotelQuery } from "../../../services/hotelAPI";
import { Loading } from "../../utilites-components/Loading";
import React, { useEffect, useState } from "react";
import { Handler, HandlersForm } from "../../../features/handlers/Handler";
import { CarouselImagesEdit } from "../../utilites-components/CarouselImagesEdit";
import { Image } from "../../utilites-components/Image";
import { DOWNLOAD_IMAGE_URL } from "../../../config/config";

export interface HotelEditInitial {
    id: string,
    title: string,
    description: string,
    images: string[],
    imagesFiles: File[]
    imagesPreview: string[],
}


export function HotelCardEdit () {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: hotel, isLoading } = useGetHotelQuery(id!, { refetchOnMountOrArgChange: true})
    const [ editHotel, { isLoading: isLoadingEdit } ] = useEditHotelMutation()

    const initialState: HotelEditInitial = {
        id: '',
        title: '',
        images: [],
        description: '',
        imagesFiles: [],
        imagesPreview: [],
    }

    const [ formState, setForm ] = useState( initialState )

    useEffect(() => {
        const { _id, title, images, description } = hotel!
        setForm({
            id: _id!,
            title,
            images,
            description,
            imagesFiles: [],
            imagesPreview: []
        })
    }, [hotel])

    const handlers = {

        onSubmit: (event: React.FormEvent) => {
            event.preventDefault()
            editHotel(formState).then(() => navigate('..'))
            
        },

        onChangeInput: (e: React.ChangeEvent) => Handler.onChangeInput<HotelEditInitial>( e, setForm ),
        onChangeFile: (e: React.ChangeEvent) => Handler.onChangeFile<HotelEditInitial>( e, setForm ),
        onDelete: ( index: number ) => Handler.onDelete<HotelEditInitial>( index, setForm ),
        onDeletePreview: ( index: number ) => Handler.onDeletePreview<HotelEditInitial>( index, setForm )

        // onChangeFile: ({target: { name, files }}) => {
        //     console.log('{ name, files }', { name, files })
        //     const filesPreview = files && [...files].map(file => URL.createObjectURL(file))
        //     setForm(prev => ({...prev, [name]: files, imagesFilesPreview: filesPreview!}))
        // },

        // onDelete: ( index) => {
        //     setForm(prev => ({
        //         ...prev,
        //         images: prev.images.filter((_, i) => index !== i)
        //     }))
        // },

        // onDeletePreview: (index) => {
        //     setForm(prev => {
        //         const arrayFiles = [...prev.imagesFiles]
        //         return {
        //         ...prev,
        //         imagesFiles: arrayFiles.filter((_, i) => index !== i),
        //         imagesFilesPreview: prev.imagesFilesPreview.filter((_, i) => index !== i)
        //     }})
        // }
    }

    if (isLoading) return <Loading />

    return (
        <>
        { hotel ? 
            <Card>
                <Form onSubmit={ handlers.onSubmit }>
                    <CarouselImagesEdit 
                        images={ formState.images } 
                        imagesPreview={ formState.imagesPreview } 
                        imagesInRow={3} 
                        handlers={ handlers }
                        variant={"dark"} 
                        fade/>
                    <Card.Body>
                        <Card.Title>
                            <Form.Group className="mb-3" controlId="formBasicHotelTitle">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Название отеля" 
                                    name='title'
                                    value={formState.title} 
                                    onChange={ handlers.onChangeInput }
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
                                    onChange={ handlers.onChangeInput }
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