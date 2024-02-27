import { Spinner, SpinnerProps } from 'react-bootstrap';
import './Loading.css';

export function Loading(props: React.HTMLAttributes<HTMLBodyElement> & SpinnerProps & React.DOMAttributes<HTMLBodyElement>) {
  return (
      <>
        <Spinner className="loading-spinner" animation="border" role="status" {...props}>
          <span className="visually-hidden">Loading...</span>
        </Spinner> 
      </> 
  );
}