import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { authSelector } from '../features/userSlice'

export const useAuth = () => {
  const auth = useSelector(authSelector)

  return useMemo(() => ({ auth }), [auth])
}
