import { useNavigate, useLocation } from 'react-router-dom';
import {axiosPrivate} from "../api/axiosApi";
import endpoints from "../api/endpoints";
import useDeltaStore from "../store/store";

const useRefreshToken = () => {
  const { user, setUser } = useDeltaStore();
  const navigate = useNavigate()
  const location = useLocation();
  const refresh = async () => {
    const response = await axiosPrivate.get(endpoints.REFRESH);
    setUser( response.data.data );
    if(response.data.success){
      console.log("first")
      if(location.pathname === '/auth') {
        // navigate('/chats')
      }else{
        navigate(location)
      }
     
    }else{
      navigate("/auth")
    }
    
    // return response.data.accessToken;
    
  };
  return refresh;
};

export default useRefreshToken;
