import { Carousel, Col, Container, Row, CarouselProps } from 'react-bootstrap';
import { DOWNLOAD_IMAGE_URL } from '../../../config/config';
import { Image } from '../Image';

interface InputGroupProps extends CarouselProps {
  images: string[], 
  imagesInRow: number,
}

export function CarouselImages({ images, imagesInRow, ...props }: InputGroupProps) {

  const imagesComponents = images.map((image, index) => {
    return (
            <Col key={index} style={{
              position: 'relative', 
              display: 'flex', 
              justifyContent: 'center',
            }}>
                <Image 
                    attributes={{ src: (`${DOWNLOAD_IMAGE_URL}?img_path=${image}`), rounded: true }} 
                    styleAttr={{ 
                      display: 'block',
                      maxHeight: '20vh', 
                      maxWidth: '10vw', 
                      width: 'auto',
                      height: 'auto', 
                    }}
                />
            </Col>
    );
  });
    
  const imagesSliced = [];
  for (let i = 0; i < Math.ceil(imagesComponents.length / imagesInRow); i++) {
    imagesSliced[i] = (
            <Carousel.Item key={i}>
                <Container>
                    <Row>
                        {imagesComponents.slice( (i * imagesInRow), (i * imagesInRow) + imagesInRow )}
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
