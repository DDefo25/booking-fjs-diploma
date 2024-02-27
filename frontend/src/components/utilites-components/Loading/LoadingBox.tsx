import { Spinner, SpinnerProps } from 'react-bootstrap';
import './LoadingBox.css';

export function LoadingBox(props: React.HTMLAttributes<HTMLBodyElement> & SpinnerProps & React.DOMAttributes<HTMLBodyElement>) {
  return (
      <>
      <div className="loading-box">
        <Spinner className="loading-box-spinner" animation="border" role="status" {...props}>
          <span className="visually-hidden">Loading...</span>
        </Spinner> 
      </div>
      </> 
  );
}