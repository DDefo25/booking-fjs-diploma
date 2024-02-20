import { ComponentPropsWithoutRef, useRef } from "react";
import { Carousel, Col, Container, Row, Image, CarouselProps, Form, CloseButton, Overlay, Button } from "react-bootstrap";
import { DOWNLOAD_IMAGE_URL, SERVER_URL } from "../../config/config";
import { HandlersForm } from "../../features/handlers/Handler";

interface InputGroupProps extends CarouselProps {
    imagesPreview: string[],
    imagesInRow: number,
    handlers: HandlersForm,
}

const emptyImageSrc = 'https://picsum.photos/150/150'



export function CarouselImagesAdd({ imagesPreview, imagesInRow, handlers, ...props }: InputGroupProps) {
    const imagesPreviewComponents = imagesPreview.map((image, index) => {
        return (
            <Col style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
                <Image src={image} rounded style={{width: '12vw', border: 'dashed purple'}}/>
                <CloseButton style={{position: 'absolute', top: 10, right: 10}} onClick={() => { if (handlers && handlers.onDeletePreview) handlers.onDeletePreview(index)}}/>
            </Col>
        )
    })

    const filePickerRef = useRef<HTMLInputElement>(null)

    const addComponent = (
        <Col>
            <Image src={emptyImageSrc} rounded onClick={() => filePickerRef.current?.click()} style={{cursor: "pointer", width: '12vw'}}/>
            <Form.Control ref={filePickerRef} name='images' type="file" onChange={handlers.onChangeFile} multiple accept="image/*" hidden/>
        </Col>
    )

    const imagesSliced = []
    for (let i = 0; i < Math.ceil((imagesPreviewComponents.length + 1) / imagesInRow); i++) {
        imagesSliced[i] = (
            <Carousel.Item>
                <Container>
                    <Row>
                        {[...imagesPreviewComponents, addComponent].slice( (i * imagesInRow), (i * imagesInRow) + imagesInRow )}
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
