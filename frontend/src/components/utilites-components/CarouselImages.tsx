import { ComponentPropsWithoutRef, useRef } from "react";
import { Carousel, Col, Container, Row, Image, CarouselProps, Form, CloseButton, Overlay } from "react-bootstrap";

interface InputGroupProps extends CarouselProps {
    images: string[], 
    imagesInRow: number,
    handleImageAdd?: any,
}

const emptyImageSrc = 'https://picsum.photos/150/150'

export function CarouselImages({ images, imagesInRow, handleImageAdd, ...props }: InputGroupProps) {

    const imagesComponents = images.map(image => {
        return (
            <Col xs={6} md={4} >
                <Container style={{position: 'relative'}}>
                    <Image src={image} rounded />
                    <CloseButton variant="white" style={{position: 'absolute', top: 5, right: 5}}/>
                </Container>
            </Col>
        )
    })

    function previewFile(e: any) {
        const reader = new FileReader()
        const selectedFile = e.target.files[0]

        if (selectedFile) {
            reader.readAsDataURL(selectedFile)
        }

        reader.onload = (readerEvent) => {
            handleImageAdd({name: e.target.name, value: readerEvent.target?.result})
        }
    }

    const filePickerRef = useRef<HTMLInputElement>(null)

    if (handleImageAdd) {
        imagesComponents.push(
            <Col xs={6} md={4}>
                <Image src={emptyImageSrc} rounded onClick={() => filePickerRef.current?.click()} style={{cursor: "pointer"}}/>
                <Form.Control ref={filePickerRef} type='file' accept="image/*" name='images' onChange={previewFile} hidden/>
            </Col>
        )
    }

    const imagesSliced = []
    for (let i = 0; i < Math.ceil(imagesComponents.length / imagesInRow); i++) {
        imagesSliced[i] = (
            <Carousel.Item>
                <Container>
                    <Row>
                        {imagesComponents.slice( (i * imagesInRow), (i * imagesInRow) + imagesInRow )}
                    </Row>
                </Container>
            </Carousel.Item>
            )
    }
    
    return (
        <Carousel {...props}>
            {imagesSliced}
        </Carousel>
    );
}
