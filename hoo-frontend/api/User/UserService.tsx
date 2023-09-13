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
export const GET_LEADERBOARD_QUERY_KEY = 'getLeaderboard'

export const useUser = (userName: string): userHook => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [GET_USER_QUERY_KEY, userName],
    async () => {
      return User.getUser(
        userName,
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

export const useLeaderBoard = (userName: string): userHook => {
    const { data, isLoading, isError, isSuccess } = useQuery(
      [GET_LEADERBOARD_QUERY_KEY, userName],
      async () => {
        return User.getLeaderboard(
          userName,
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










