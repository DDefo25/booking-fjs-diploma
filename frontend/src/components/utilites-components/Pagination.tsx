import { PaginationProps, Pagination as PaginationReact } from 'react-bootstrap';

export const Pagination = ({
  limit, 
  offset, 
  count, 
  onPaginationClick,
  props,
}: {
  limit: number, 
  offset: number, 
  count: number, 
  onPaginationClick: (i: number) => void,
  props?: PaginationProps & React.RefAttributes<HTMLUListElement> & React.DOMAttributes<HTMLElement>
}) => {
  const numbers = Math.ceil(count / limit);

  const items = [];
  for (let i = 1; i <= numbers; i++) {
    items.push(
    <PaginationReact.Item 
                key={i} 
                onClick={() => onPaginationClick(i)}
                {...props} 
            >
                {i}
            </PaginationReact.Item>,
    );
  }


  return (
        <PaginationReact size="sm">{items}</PaginationReact>
  );
};