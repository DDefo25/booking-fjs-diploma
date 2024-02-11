import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../features/userSlice'

export const useAuth = () => {
  const user = useSelector(userSelector)

  return useMemo(() => ({ user }), [user])
}
