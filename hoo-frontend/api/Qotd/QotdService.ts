import { QotdClient } from "./QotdClient";
import { useQuery } from "react-query";

export interface qotdHook {
  qotd: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export const GET_QOTD_QUERY_KEY = "getQotd";

export const useQotd = (): qotdHook => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [GET_QOTD_QUERY_KEY],
    async () => {
      return QotdClient.getQotd();
    }
  );

  return {
    qotd: data,
    isLoading,
    isError,
    isSuccess,
  };
};
