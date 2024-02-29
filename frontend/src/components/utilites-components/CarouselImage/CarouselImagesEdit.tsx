import { useRef } from 'react';
import { Carousel, Col, Container, Row, Image as React, CarouselProps, Form, CloseButton } from 'react-bootstrap';
import { ACCEPTED_IMAGE_MIME_TYPES, DOWNLOAD_ASSETS_ICON_URL, DOWNLOAD_IMAGE_URL } from '../../../config/config';
import { HandlersForm } from '../../../features/handlers/Handler';
import { Image } from '../Image';

interface InputGroupProps extends CarouselProps {
  images?: string[], 
  imagesPreview: string[],
  imagesInRow: number,
  handlers: HandlersForm,
}

export function CarouselImagesEdit({ images = [], imagesPreview, imagesInRow, handlers, ...props }: InputGroupProps) {


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
                <CloseButton style={{ position: 'absolute', top: 5, right: 5 }} onClick={() => { if (handlers && handlers.onDelete) handlers.onDelete(index);}}/>
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
                <CloseButton style={{ position: 'absolute', top: 10, right: 10 }} onClick={() => { if (handlers && handlers.onDeletePreview) handlers.onDeletePreview(index);}}/>
            </Col>
    );
  });

  const filePickerRef = useRef<HTMLInputElement>(null);

  const addComponent = (
        <Col>
            <Image 
                attributes={{
                  src: DOWNLOAD_ASSETS_ICON_URL + 'add-image-icon.svg', 
                  rounded: true,
                  onClick: () => filePickerRef.current?.click(),
                }} 
                styleAttr={{ 
                  display: 'block',
                  minHeight: '10vh', 
                  border: 'solid 1px grey',
                  cursor: 'pointer', 
                }}
            />
            <Form.Control 
                ref={filePickerRef} 
                name='imagesFiles' 
                type="file" 
                onChange={handlers.onChangeFile} 
                multiple 
                accept={ ACCEPTED_IMAGE_MIME_TYPES }  
                hidden/>
        </Col>
  );

  const imagesSliced = [];
  for (let i = 0; i < Math.ceil((imagesComponents.length + imagesPreviewComponents.length + 1) / imagesInRow); i++) {
    imagesSliced[i] = (
            <Carousel.Item>
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
