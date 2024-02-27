import { Image, ListGroup } from 'react-bootstrap';
import { Role } from '../../config/roles.enum';
import { Link } from 'react-router-dom';
import { useCheckRoles } from '../../hooks/useCheckRoles';

export interface ISideBarLink {
  path: string,
  title: string,
  img?: string,
  allowedRoles?: Role[]
} 

export const SideBarLink = ({ params :{
  path,
  title,
  img = 'https://picsum.photos/30/30',
  allowedRoles,
} }: { params: ISideBarLink } ) => {
  const isAllow = useCheckRoles();

  return (
        <ListGroup.Item hidden={ allowedRoles && !isAllow(allowedRoles) }>
            <Link to={path}>
                <Image
                    alt=""
                    src={img}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    rounded
                    />{' '}
                {title}
            </Link>
        </ListGroup.Item>
  );
};