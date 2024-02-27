import { useNavigation } from 'react-router-dom';
import { Loading } from './Loading';


export function LoadingNavigate( { children }: { children: any } ) {
  const { state } = useNavigation();

  if ( state === 'loading' ) return <Loading />;

  return children;
} 