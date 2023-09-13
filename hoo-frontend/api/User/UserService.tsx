import { useContext } from 'react'
import {User} from './User'
import { useQuery } from 'react-query'

export interface userHook {
  user?: any
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

export const GET_USER_QUERY_KEY = 'getUser'

const useUser = (id: number): userHook => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [GET_USER_QUERY_KEY, id],
    async () => {
      return User.getUser(
        id,
      )
    },
  )

  return {
    user: data,
    isLoading,
    isError,
    isSuccess,
  }
}

export default useUser








