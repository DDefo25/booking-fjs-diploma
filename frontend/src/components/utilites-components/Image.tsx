import { useState } from 'react';
import { ImageProps, Image as ReactImage } from 'react-bootstrap';
import { Loading } from './Loading/Loading';

export const Image = ( { 
  attributes, 
  styleAttr,
} : {
  attributes?: React.ImgHTMLAttributes<HTMLImageElement> & ImageProps & React.DOMAttributes<HTMLImageElement>
  styleAttr?: React.CSSProperties
}) => {

  const [ isLoading, setState ] = useState(true);
  
  return (
        <>
          { isLoading ? <Loading /> : null }
          <ReactImage
            style={{
              display: isLoading ? 'none' : undefined, 
              ...styleAttr,
            }}
            onLoad={() => setState(false)}
            {...attributes}
          />
        </>
  );
};
