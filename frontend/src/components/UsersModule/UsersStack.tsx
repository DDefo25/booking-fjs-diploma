import { Stack } from 'react-bootstrap';
import { User } from '../../interfaces/User.interface';
import UserCard from './UserCard';


export function UsersStack({ users } : { users: User[] }) {
  return (
        <Stack gap={3}>
          {users && users.map( user => <UserCard user={user} key={user._id}/>)}
        </Stack>
  );
}