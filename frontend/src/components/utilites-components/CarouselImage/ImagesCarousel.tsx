import { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { Carousel, Col, Container, Row, Image as React, CarouselProps, Form, CloseButton } from 'react-bootstrap';
import { ACCEPTED_IMAGE_MIME_TYPES, DOWNLOAD_ASSETS_ICON_URL, DOWNLOAD_IMAGE_URL } from '../../../config/config';
import { HandlersForm } from '../../../features/handlers/Handler';
import { Image } from '../Image';

interface InputGroupProps extends CarouselProps {
  images?: string[], 
  imagesPreview?: (string | undefined)[],
  imagesInRow: number,
  handlers: HandlersForm,
  // children?: ReactElement[]
}

const ImagesCarouselCloseButton = ({handlerClick}: {handlerClick: any}) => {
  return <CloseButton style={{ position: 'absolute', top: 5, right: 5 }} onClick={handlerClick}/>
}

export function ImagesCarousel({ 
    images = [], 
    imagesPreview = [], 
    imagesInRow,
    handlers: {
      onDelete,
      onDeletePreview,
      onChangeFile
    }, 
    children, 
    ...props 
  }: InputGroupProps ) {

    useEffect(() => {
      console.log('imagesPreview',imagesPreview)
    }, [imagesPreview])

  const imagesComponents = images.map((image, index) => {
    return (
            <Col style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <Image 
                    attributes={{ src: `${DOWNLOAD_IMAGE_URL}?img_path=${image}`, rounded: true }} 
                    styleAttr={{ 
                      display: 'block',
                      maxHeight: '20vh', 
                      maxWidth: '10vw', 
                      width: 'auto',
                      height: 'auto', 
                    }}
                />
                <ImagesCarouselCloseButton handlerClick={() => onDelete && onDelete(index)}/>
            </Col>
    );
  });

  const imagesPreviewComponents = imagesPreview.map((image, index) => {
    return (
            <Col style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <Image 
                    attributes={{ src: image, rounded: true }} 
                    styleAttr={{ 
                      display: 'block',
                      maxHeight: '30vh', 
                      maxWidth: '10vw', 
                      width: 'auto',
                      height: 'auto',
                      border: 'dashed 1px purple', 
                    }}
                />
                <ImagesCarouselCloseButton handlerClick={() => {onDeletePreview && onDeletePreview(index)}}/>
            </Col>
    );
  });

  const filePickerRef = useRef<HTMLInputElement>(null);

  const addComponent = (
        <Col>
          { children }
        </Col>
  );

  const imagesSliced = [];
  for (let i = 0; i < Math.ceil((imagesComponents.length + imagesPreviewComponents.length + 1) / imagesInRow); i++) {
    imagesSliced[i] = (
            <Carousel.Item className='m-3'>
                <Container>
                    <Row>
                        {[...imagesComponents, ...imagesPreviewComponents, addComponent].slice( (i * imagesInRow), (i * imagesInRow) + imagesInRow )}
                    </Row>
                </Container>
            </Carousel.Item>
    );
  }
    
  return (
        <Carousel {...props}>
            {imagesSliced}
        </Carousel>
  );
}
