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
export const POST_HYDRATION_QUERY_KEY = 'postHydration'
export const POST_CREATE_USER_QUERY_KEY = 'postCreateUser'
export const POST_DELETE_USER_QUERY_KEY = 'deleteUser'
export const PATCH_USER_QUERY_KEY = 'patchUser'

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

  export const useCreateUser = (
    username: string,
    age: number,
    gender: string,
    weight: number,
    region: string): userHook => {
    const { data, isLoading, isError, isSuccess } = useQuery(
      [POST_CREATE_USER_QUERY_KEY, username, age, gender, weight, region],
      async () => {
        return User.postCreateUser(
          username,
            age,
            gender,
            weight,
            region
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

  export const useHydration = (username: string): userHook => {
    const { data, isLoading, isError, isSuccess } = useQuery(
      [POST_HYDRATION_QUERY_KEY, username],
      async () => {
        return User.postHydration(
          username,
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

  export const useDeleteUser = (username: string): userHook => {
    const { data, isLoading, isError, isSuccess } = useQuery(
      [POST_DELETE_USER_QUERY_KEY, username],
      async () => {
        return User.deleteUser(
          username,
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

  export const useUpdateUser = (
    username: string,
    age: number,
    gender: string,
    weight: number,
    region: string): userHook => {
    const { data, isLoading, isError, isSuccess } = useQuery(
      [PATCH_USER_QUERY_KEY, username, age, gender, weight, region],
      async () => {
        return User.postCreateUser(
          username,
            age,
            gender,
            weight,
            region
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

