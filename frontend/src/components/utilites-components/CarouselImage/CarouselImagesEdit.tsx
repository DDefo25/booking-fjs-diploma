import { ComponentPropsWithoutRef, useRef } from "react";
import { Carousel, Col, Container, Row, Image as React, CarouselProps, Form, CloseButton, Overlay, Button } from "react-bootstrap";
import { DOWNLOAD_IMAGE_URL, SERVER_URL } from "../../../config/config";
import { HandlersForm } from "../../../features/handlers/Handler";
import { Image } from "../Image";

interface InputGroupProps extends CarouselProps {
    images?: string[], 
    imagesPreview: string[],
    imagesInRow: number,
    handlers: HandlersForm,
}

const emptyImageSrc = `\\assets\\img\\add-image-icon.png`

export function CarouselImagesEdit({ images = [], imagesPreview, imagesInRow, handlers, ...props }: InputGroupProps) {


    const imagesComponents = images.map((image, index) => {
        return (
            <Col style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
                <Image 
                    attributes={{src: `${DOWNLOAD_IMAGE_URL}?img_path=${image}`, rounded: true}} 
                    styleAttr={{ 
                        display: 'block',
                        maxHeight: '20vh', 
                        maxWidth: '10vw', 
                        width: 'auto',
                        height: 'auto' 
                    }}
                />
                <CloseButton style={{position: 'absolute', top: 5, right: 5}} onClick={() => { if (handlers && handlers.onDelete) handlers.onDelete(index)}}/>
            </Col>
        )
    })

    const imagesPreviewComponents = imagesPreview.map((image, index) => {
        return (
            <Col style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
                <Image 
                    attributes={{src: image, rounded: true}} 
                    styleAttr={{ 
                        display: 'block',
                        maxHeight: '30vh', 
                        maxWidth: '10vw', 
                        width: 'auto',
                        height: 'auto',
                        border: 'dashed 1px purple' 
                    }}
                />
                <CloseButton style={{position: 'absolute', top: 10, right: 10}} onClick={() => { if (handlers && handlers.onDeletePreview) handlers.onDeletePreview(index)}}/>
            </Col>
        )
    })

    const filePickerRef = useRef<HTMLInputElement>(null)

    const addComponent = (
        <Col>
            <Image 
                attributes={{
                    src: `${DOWNLOAD_IMAGE_URL}?img_path=${emptyImageSrc}`, 
                    rounded: true,
                    onClick: () => filePickerRef.current?.click()
                }} 
                styleAttr={{ width: '12vw', cursor: "pointer" }}
            />
            <Form.Control 
                ref={filePickerRef} 
                name='imagesFiles' 
                type="file" 
                onChange={handlers.onChangeFile} 
                multiple 
                accept="image/png, image/jpg, image/jpeg, image/webp"  
                hidden/>
        </Col>
    )

    const imagesSliced = []
    for (let i = 0; i < Math.ceil((imagesComponents.length + imagesPreviewComponents.length + 1) / imagesInRow); i++) {
        imagesSliced[i] = (
            <Carousel.Item>
                <Container>
                    <Row>
                        {[...imagesComponents, ...imagesPreviewComponents, addComponent].slice( (i * imagesInRow), (i * imagesInRow) + imagesInRow )}
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
