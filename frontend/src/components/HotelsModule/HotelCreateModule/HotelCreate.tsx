import { Button, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddHotelMutation } from "../../../services/hotelAPI";
import { Handler, HandlersForm } from "../../../features/handlers/Handler";
import { Loading } from "../../utilites-components/Loading";
import { CarouselImagesAdd } from "../../utilites-components/CarouselImagesAdd";

export interface HotelAddInitial {
    title: string,
    description: string,
    images: File[],
    imagesPreview: string[]
}


export function HotelCreate () {

    const initialState: HotelAddInitial = {
        title: '',
        description: '',
        images: [],
        imagesPreview: []
    }

    const navigate = useNavigate()
    const [ formState, setForm ] = useState( initialState )
    const [ addHotel, { isLoading }] = useAddHotelMutation()

    const handlers = {
        onSubmit: (event: React.FormEvent) => {
            event.preventDefault()
            addHotel(formState).then(({ data }: any) => {
                navigate(`/hotel/${data?._id}`)
            })
        },

        onChangeInput: (e: React.ChangeEvent) => Handler.onChangeInput<HotelAddInitial>( e, setForm ),
        onChangeFile: (e: React.ChangeEvent) => Handler.onChangeFile<HotelAddInitial>( e, setForm ),
        onDeletePreview: ( index: number ) => Handler.onDeletePreview<HotelAddInitial>( index, setForm )
        // onChangeFile: ({target: { name, files }}) => {
        //     console.log('{ name, files }', { name, files })
        //     const filesPreview = files && [...files].map(file => URL.createObjectURL(file))
        //     setForm(prev => ({...prev, [name]: files, imagesPreview: filesPreview!}))
        // },

        // onDeletePreview: (index) => {
        //     setForm(prev => {
        //         return {
        //         ...prev,
        //         imagesFiles: [...prev.images].filter((_, i) => index !== i),
        //         imagesFilesPreview: prev.imagesPreview.filter((_, i) => index !== i)
        //     }})
        // }
    }

    if (isLoading) return <Loading />

    return (
        <Card>
            <Form onSubmit={handlers.onSubmit}>
                <CarouselImagesAdd 
                    imagesPreview={formState.imagesPreview} 
                    handlers={handlers} 
                    imagesInRow={3} 
                    variant={"dark"} 
                    fade/>
                <Card.Body>
                    <Card.Title>
                        <Form.Group className="mb-3" controlId="formBasicHotelTitle">
                            <Form.Control 
                                name='title' 
                                placeholder="Название отеля" 
                                type="text" 
                                value={formState.title} 
                                onChange={ handlers.onChangeInput }/>
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
                                onChange={ handlers.onChangeInput }/>
                        </Form.Group>
                    </Card.Text>
                    <Button variant="primary" type="submit">Сохранить</Button>
                </Card.Body>
            </Form>            
        </Card>
    )
}