import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/slices/authSlice';


export const useAuth = () => {
  const auth = useSelector(selectAuth);

  return useMemo(() => ({ auth }), [auth]);
};
