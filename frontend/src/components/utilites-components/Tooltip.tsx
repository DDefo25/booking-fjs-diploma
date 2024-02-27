import { OverlayTrigger, Tooltip as ReactTooltip } from 'react-bootstrap';

type ChildrenProps = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
};

export const Tooltip = ( { text, hidden = false, children } : { 
  text: string, 
  hidden?: boolean,
  children: any, 
}) => {
  const renderTooltip = (props: any) => (
      <ReactTooltip id="button-tooltip" hidden={hidden} {...props}>
        { text }
      </ReactTooltip>
  );
  
  return (
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      > 
      <span>{ children }</span>
      </OverlayTrigger>
  );
};