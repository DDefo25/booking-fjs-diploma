import { ComponentPropsWithoutRef, useRef } from "react";
import { Carousel, Col, Container, Row, Image as ReactImage, CarouselProps, Form, CloseButton, Overlay } from "react-bootstrap";
import { DOWNLOAD_IMAGE_URL, SERVER_URL } from "../../config/config";
import { Image } from "./Image";

interface InputGroupProps extends CarouselProps {
    images: string[], 
    imagesInRow: number,
}

export function CarouselImages({ images, imagesInRow, ...props }: InputGroupProps) {


    const imagesComponents = images.map((image, index) => {
        return (
            <Col style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
                <Image 
                    attributes={{src: `${DOWNLOAD_IMAGE_URL}?img_path=${image}`, rounded: true}} 
                    styleAttr={{ width: '12vw' }}
                />
            </Col>
        )
    })
    
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
