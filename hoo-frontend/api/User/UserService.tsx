import { UserClient } from "./UserClient";
import { useMutation, useQuery } from "react-query";
import User from "../../models/User";
import Leaderboard from "../../models/Leaderboard";

export interface userHook {
  user?: User;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export interface usersHook {
  users?: User[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export interface leaderboardHook {
  leaderboard?: Leaderboard;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export interface usersHydrationHook {
  updateHydration: () => void;
}

interface bioHook {
  bio?: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export const GET_USER_QUERY_KEY = "getUser";
export const GET_LEADERBOARD_QUERY_KEY = "getLeaderboard";
export const POST_HYDRATION_QUERY_KEY = "postHydration";
export const POST_CREATE_USER_QUERY_KEY = "postCreateUser";
export const POST_DELETE_USER_QUERY_KEY = "deleteUser";
export const PATCH_USER_QUERY_KEY = "patchUser";
export const GET_BIO_QUERY_KEY = "getBio";

export const useUser = (userName: string): userHook => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [GET_USER_QUERY_KEY, userName],
    async () => {
      return UserClient.getUser(userName);
    }
  );

  return {
    user: data,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useLeaderBoard = (userName: string): leaderboardHook => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [GET_LEADERBOARD_QUERY_KEY, userName],
    async () => {
      return UserClient.getLeaderboard(userName);
    }
  );

  return {
    leaderboard: data,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useCreateUser = (
  username: string,
  age: number,
  gender: string,
  weight: number,
  region: string
): userHook => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [POST_CREATE_USER_QUERY_KEY, username, age, gender, weight, region],
    async () => {
      return UserClient.postCreateUser(username, age, gender, weight, region);
    }
  );

  return {
    user: data,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useHydration = (
  username: string,
  hydrationPercentage: number
): usersHydrationHook => {
  const { mutate } = useMutation(
    [POST_HYDRATION_QUERY_KEY, username],
    async () => {
      return UserClient.postHydration(username, hydrationPercentage);
    }
  );

  return {
    updateHydration: mutate,
  };
};

export const useDeleteUser = (username: string): userHook => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [POST_DELETE_USER_QUERY_KEY, username],
    async () => {
      return UserClient.deleteUser(username);
    }
  );

  return {
    user: data,
    isLoading,
    isError,
    isSuccess,
  };
};

interface updateUserHook {
  updateUser: () => void;
}

export const useUpdateUser = (
  username: string,
  age: number,
  gender: string,
  weight: number,
  region: string
): updateUserHook => {
  const { mutate, error } = useMutation(
    [PATCH_USER_QUERY_KEY, username, age, gender, weight, region],
    async () => {
      return UserClient.patchUser(username, age, gender, weight, region);
    }
  );

  return {
    updateUser: mutate,
  };
};

export const useBio = (username: string): bioHook => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [GET_BIO_QUERY_KEY, username],
    async () => {
      return UserClient.getBio(username);
    }
  );

  return {
    bio: data?.bio,
    isLoading,
    isError,
    isSuccess,
  };
};
