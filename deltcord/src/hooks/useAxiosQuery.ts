import { useQuery, QueryObserverResult } from 'react-query';
import { AxiosInstance } from 'axios';
import { axiosPrivate } from '../api/axiosApi';

interface UseAxiosQueryProps {
  url: string;
  dataType: string;
//   axiosType: string;
}

const useAxiosQuery = <T>({ url, dataType }: UseAxiosQueryProps) => {
  const axiosInstance: AxiosInstance =  axiosPrivate

  const query = useQuery<T>(dataType, async () => {
    const response = await axiosInstance.get(url);
    return response.data;
  }, {
    enabled: false, // Prevent initial data fetch
  });

  const fetchData = () => query.refetch();

  return { ...query, fetchData };
};

export default useAxiosQuery